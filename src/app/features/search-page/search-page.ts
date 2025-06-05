import {Component, DestroyRef, inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {debounceTime} from 'rxjs';
import {ScryfallService} from '../../../providers/services/scryfall.service';
import {StoreService} from '../../../providers/services/store.service';

@Component({
  selector: 'app-search-page',
  standalone: false,
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export class SearchPage {

  readonly #scryfallService = inject(ScryfallService);
  readonly #storeService = inject(StoreService);
  readonly #destroyRef = inject(DestroyRef);

  constructor() {
    this.form.get('search')?.valueChanges
      .pipe(
        debounceTime(500),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (search) => {
          this.#scryfallService.getCardsList(search)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe({
            next: (results) => {
              this.results = results;
            }
          });
        }
      });
  }

  form: FormGroup = new FormGroup({
    search: new FormControl<string>('')
  });

  results: Array<string> = [];

  setFavoriteCards() {
    let card = this.form.getRawValue()['search'];
    this.#storeService.addFavoriteCard(card);
  }
}
