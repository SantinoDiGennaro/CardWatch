import {Component, DestroyRef, inject} from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import {MarketplaceService} from '../../../providers/services/marketplace.service';
import {CardBlueprint} from '../../../models/types/card-blueprint.type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CardMarketplace} from '../../../models/types/card-marketplace.type';
import {ScryfallService} from '../../../providers/services/scryfall.service';

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
  readonly #scryfallService = inject(ScryfallService);

  cards: Array<CardMarketplace> = [];
  cardsPerPage = 10;
  currentPage = 1;

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
                  cardsMarketplace.forEach((card: CardMarketplace) => {
                   this.#scryfallService.getCardsImage(card.name_en, card.expansion.code)
                     .pipe(takeUntilDestroyed(this.#destroyRef))
                     .subscribe({
                       next:(imageUrl)=>{
                         card.imageUrl = imageUrl;
                       }
                     });
                  })
                  this.cards.push(...cardsMarketplace);
                }
              })
          })
        }
      })
  }

  get paginatedCards(): Array<CardMarketplace> {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    return this.cards.slice(startIndex, startIndex + this.cardsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.cards.length / this.cardsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

}
