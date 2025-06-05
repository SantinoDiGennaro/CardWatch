import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScryfallService {
  readonly #baseUrl = 'https://api.scryfall.com/cards/autocomplete';
  readonly #httpClient = inject(HttpClient);

  getCardsList(query: string): Observable<Array<string>> {
    return this.#httpClient
      .get<{ data: Array<string> }>(`${this.#baseUrl}?q=${query}`)
      .pipe(
        map(response => response.data)
      );
  }
}
