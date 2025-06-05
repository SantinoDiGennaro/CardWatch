import {Component, DestroyRef, inject} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {MarketplaceService} from '../../../providers/services/marketplace.service';
import {CardBlueprint} from '../../../models/types/card-blueprint.type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CardMarketplace} from '../../../models/types/card-marketplace.type';

@Component({
  selector: 'app-result-page',
  standalone: false,
  templateUrl: './result-page.html',
  styleUrl: './result-page.css'
})
export class ResultPage {
  readonly #route = inject(ActivatedRoute);
  readonly #destroyRef = inject(DestroyRef);
  readonly #marketplaceService = inject(MarketplaceService);

  cards: Array<CardMarketplace> = [];

  constructor() {
    const card = this.#route.snapshot.paramMap.get('cardName');
    console.log(card);
    this.#marketplaceService.getBlueprintList(card ?? '')
      .pipe(takeUntilDestroyed())
      .subscribe({
        next:(res)=>{
          res.forEach( (card: CardBlueprint) => {
            this.#marketplaceService.getMarketCard(card.id)
              .pipe(takeUntilDestroyed(this.#destroyRef))
              .subscribe({
                next:(cardsMarketplace)=>{
                  this.cards.push(...cardsMarketplace);
                }
              })
          })
        }
      })
  }
}
