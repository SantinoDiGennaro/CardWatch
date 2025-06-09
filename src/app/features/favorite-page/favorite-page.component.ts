import {Component, DestroyRef, inject} from '@angular/core';
import {StoreService} from '../../../providers/services/store.service';
import {CardsService} from '../../../providers/services/cards.service';
import {MatDialog} from '@angular/material/dialog';
import {CardMarketplace} from '../../../models/types/card-marketplace.type';
import {Filter} from '../../../models/types/filter.type';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FilterModalComponent} from '../../shared/filter-modal/filter-modal.component';

@Component({
  selector: 'app-favorite-page',
  standalone: false,
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.css'
})
export class FavoritePageComponent {
  readonly #storeService = inject(StoreService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #cardsService = inject(CardsService);
  readonly #dialog = inject(MatDialog);

  favoriteCards: Array<string> = [];
  cards: Array<CardMarketplace> = [];
  showedCards: Array<CardMarketplace> = [];
  expansions: Array<string> = [];
  filters: Filter = {selectedPrice: 0, selectedExpansion: '', selectedCondition: ''};

  constructor() {
    this.favoriteCards = this.#storeService.favoriteCards;

    this.#cardsService.expansions
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (res) => {
          this.expansions = res;
        }
      });

    this.favoriteCards.forEach(card => {
      this.#cardsService.getCards(card)
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
          next: (cardsMarketplace: CardMarketplace[]) => {
            this.cards.push(...cardsMarketplace);
            this.showedCards.push(...cardsMarketplace);
          },
          error: (error) => {
            console.error('Errore nel caricamento delle carte:', error);
          }
        });
    })

  }

  openFilterModal(): void {
    const filterDialog = this.#dialog.open(FilterModalComponent, {
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

}
