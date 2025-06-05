import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CardGameId} from '../../models/enums/card-game-id.enum';
import {CardBlueprint} from '../../models/types/card-blueprint.type';
import {CardMarketplace} from '../../models/types/card-marketplace.type';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  readonly #baseUrl = 'https://api.cardtrader.com/api/v2';
  readonly #httpClient = inject(HttpClient);
  readonly #token = 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJjYXJkdHJhZGVyLXByb2R1Y3Rpb24iLCJzdWIiOiJhcHA6MTU0MzAiLCJhdWQiOiJhcHA6MTU0MzAiLCJleHAiOjQ5MDQ1NTM1NzksImp0aSI6ImE3NDJmOGQxLTYxMjctNDY3ZS04Y2Q4LTVlZjgzZDQxMTM3NiIsImlhdCI6MTc0ODg3OTk3OSwibmFtZSI6Ikx1cHBpbm9tYW51ZWwgQXBwIDIwMjUwNTI1MTgyNjAwIn0.SygjnI8kANUr7JTckfhTmsWROj-nOWg5sZbVyK8N0XJRcGRrG7iHsA_WKqb86MdSjjpplJHAhWn1KP-qLmQZaF3Kq5PyJOgMjwySplkkaJf3pl-dQem3gYfMSSHzFrPS0px3HPeb2uUHIONhaAU1FgTJ4oDzFC6puyKMRwAcoWQ2vSckjhebumQF4igZ90va5yYNAEbZFWj2F4HAjtBxBWHmSYxEXas6HsQUQm3gNZFoP4BvkqFmwm8ZVtaYmRrn6tYehXCNG4SEJrV2xgDd-7Kn1to52rcfiLAZssUqTIarVLEVJYKEj8bfZ7nlG7dz4pidB6mh8iAs2kZIWJdnUQ';

  getBlueprintList(query: string): Observable<Array<CardBlueprint>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.#token}`
    });

    return this.#httpClient
      .get<Array<CardBlueprint>>(`${this.#baseUrl}/blueprints?game_id=${CardGameId.MAGIC}&name=${query}`, {headers});
  }

  getMarketCard(blueprintId: number): Observable<Array<CardMarketplace>> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.#token}`
    });

    return this.#httpClient
      .get<Record<string, CardMarketplace[]>>(
        `${this.#baseUrl}/marketplace/products?blueprint_id=${blueprintId}`,
        { headers }
      )
      .pipe(
        map(response => response[blueprintId.toString()] || [])
      );
  }

}
