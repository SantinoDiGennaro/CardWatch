import {Component, DestroyRef, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MarketplaceService} from '../../../providers/services/marketplace.service';
import {CardBlueprint} from '../../../models/types/card-blueprint.type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CardMarketplace} from '../../../models/types/card-marketplace.type';
import {ScryfallService} from '../../../providers/services/scryfall.service';
import {MatDialog} from '@angular/material/dialog';
import {FilterModal} from '../../shared/filter-modal/filter-modal';
import {Filter} from '../../../models/types/filter.type';

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
  readonly #dialog = inject(MatDialog);

  cards: Array<CardMarketplace> = [];
  showedCards: Array<CardMarketplace> = [];
  cardsPerPage = 10;
  currentPage = 1;
  expansions: Array<string> = [];
  filters: Filter = {selectedPrice: 0, selectedExpansion: '', selectedCondition: ''};

  constructor() {
    const card = this.#route.snapshot.paramMap.get('cardName');
    this.#marketplaceService.getBlueprintList(card ?? '')
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (res) => {
          res.forEach((card: CardBlueprint) => {
            this.#marketplaceService.getMarketCard(card.id)
              .pipe(takeUntilDestroyed(this.#destroyRef))
              .subscribe({
                next: (cardsMarketplace) => {
                  cardsMarketplace.forEach((card: CardMarketplace) => {
                    this.#scryfallService.getCardsImage(card.name_en, card.expansion.code)
                      .pipe(takeUntilDestroyed(this.#destroyRef))
                      .subscribe({
                        next: (imageUrl) => {
                          card.imageUrl = imageUrl;
                        }
                      });

                    if (!this.expansions.includes(card.expansion.name_en))
                      this.expansions.push(card.expansion.name_en);
                  })

                  this.cards.push(...cardsMarketplace);
                  this.showedCards = [...this.cards];

                }
              })
          })
        }
      })
  }

  openFilterModal(): void {
    const filterDialog = this.#dialog.open(FilterModal, {
      data: {
        expansions: this.expansions,
        filters: this.filters
      }
    });

    filterDialog.afterClosed().pipe(takeUntilDestroyed(this.#destroyRef)).subscribe({
      next: (res: Filter) => {
        if (res) {
          this.filters = res;
          this.showedCards = [];

          this.showedCards = this.cards.filter(el =>
            (!res.selectedExpansion || el.expansion.name_en === res.selectedExpansion) &&
            (!res.selectedCondition || el.properties_hash.condition === res.selectedCondition) &&
            (!res.selectedPrice || (el.price_cents / 100) <= res.selectedPrice)
          );
        }
      }
    })
  }

  get paginatedCards(): Array<CardMarketplace> {
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    return this.showedCards.slice(startIndex, startIndex + this.cardsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.showedCards.length / this.cardsPerPage);
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
