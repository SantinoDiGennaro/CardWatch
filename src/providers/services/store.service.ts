import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  readonly #favoriteCardsKey = 'favoriteCards';
  favoriteCards: Array<string> = [];

  constructor() {
    this.getFavoriteCards();
  }

  getFavoriteCards() {
    let favoriteCardsString = localStorage.getItem(this.#favoriteCardsKey);
    this.favoriteCards = favoriteCardsString ? JSON.parse(favoriteCardsString) : [];
  }

  setFavoriteCards() {
    localStorage.setItem(this.#favoriteCardsKey, JSON.stringify(this.favoriteCards));
  }

  addFavoriteCard(favoriteCard: string) {
    if (!!favoriteCard && !this.favoriteCards.includes(favoriteCard)) {
      this.favoriteCards.push(favoriteCard);
      this.setFavoriteCards();
    }
  }


}
