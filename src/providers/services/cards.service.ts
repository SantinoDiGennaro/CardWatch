import {DestroyRef, inject, Injectable} from '@angular/core';
import {MarketplaceService} from './marketplace.service';
import {ScryfallService} from './scryfall.service';
import {CardMarketplace} from '../../models/types/card-marketplace.type';

import {switchMap, mergeMap, map, tap, catchError} from 'rxjs/operators';
import {from, Observable, of, forkJoin, BehaviorSubject} from 'rxjs';
import {CardBlueprint} from '../../models/types/card-blueprint.type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  readonly #marketplaceService = inject(MarketplaceService);
  readonly #scryfallService = inject(ScryfallService);
  readonly #destroyRef = inject(DestroyRef);

  expansions: BehaviorSubject<Array<string>> = new BehaviorSubject<Array<string>>([]);

  getCards(card: string = ''): Observable<Array<CardMarketplace>> {
    return this.#marketplaceService.getBlueprintList(card)
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        // Trasforma ogni CardBlueprint in un Observable di CardMarketplace[]
        switchMap((blueprints: Array<CardBlueprint>) =>
          from(blueprints).pipe(
            mergeMap((blueprint: CardBlueprint) =>
              this.#marketplaceService.getMarketCard(blueprint.id).pipe(
                // Aggiungi le immagini a ogni card
                // switchMap((cardsMarketplace: CardMarketplace[]) =>
                //   this.addImagesToCards(cardsMarketplace)
                // ),
                // Estrai le espansioni uniche
                tap((cardsMarketplace: CardMarketplace[]) => {
                  this.extractUniqueExpansions(cardsMarketplace);
                })
              )
            )
          )
        )
      )
  }

  private addImagesToCards(cards: CardMarketplace[]): Observable<CardMarketplace[]> {
    const imageRequests = cards.map(card =>
      this.#scryfallService.getCardsImage(card.name_en, card.expansion.code).pipe(
        map(imageUrl => ({...card, imageUrl})),
        catchError(() => of({...card, imageUrl: ''}))
      )
    );

    return forkJoin(imageRequests);
  }

  private extractUniqueExpansions(cards: Array<CardMarketplace>): void {
    const newExpansions = cards
      .map(card => card.expansion.name_en)
      .filter(expansion => !this.expansions.getValue().includes(expansion));

    newExpansions.forEach(expansion => {
      if (!this.expansions.getValue().includes(expansion))
        this.expansions.value.push(newExpansions[0]);
    })
  }
}
