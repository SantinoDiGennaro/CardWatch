import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {BASE_SCRYFALL_API} from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class ScryfallService {
  readonly #httpClient = inject(HttpClient);

  getCardsList(query: string): Observable<Array<string>> {
    return this.#httpClient
      .get<{ data: Array<string> }>(`${BASE_SCRYFALL_API}/cards/autocomplete?q=${query}`)
      .pipe(
        map(response => response.data)
      );
  }

  getCardsImage(cardName: string, expansionCode: string): Observable<string> {
    return this.#httpClient
      .get<any>(`${BASE_SCRYFALL_API}/cards/named?exact=${cardName}&set=${expansionCode}`)
      .pipe(
        map(response => response.image_uris.art_crop)
      );
  }
}
