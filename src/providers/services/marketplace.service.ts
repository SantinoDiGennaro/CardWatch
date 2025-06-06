import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CardGameId} from '../../models/enums/card-game-id.enum';
import {CardBlueprint} from '../../models/types/card-blueprint.type';
import {CardMarketplace} from '../../models/types/card-marketplace.type';
import {BASE_MARKETPLACE_API, MARKETPLACE_TOKEN} from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {


  readonly #httpClient = inject(HttpClient);

  getBlueprintList(query: string): Observable<Array<CardBlueprint>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${MARKETPLACE_TOKEN}`
    });

    return this.#httpClient
      .get<Array<CardBlueprint>>(`${BASE_MARKETPLACE_API}/blueprints?game_id=${CardGameId.MAGIC}&name=${query}`, {headers});
  }

  getMarketCard(blueprintId: number): Observable<Array<CardMarketplace>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${MARKETPLACE_TOKEN}`
    });

    return this.#httpClient
      .get<Record<string, CardMarketplace[]>>(
        `${BASE_MARKETPLACE_API}/marketplace/products?blueprint_id=${blueprintId}`,
        { headers }
      )
      .pipe(
        map(response => response[blueprintId.toString()] || [])
      );
  }

}
