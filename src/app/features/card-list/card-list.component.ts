import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CardDeatilComponent } from '../../shared/card-deatil/card-deatil.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardDeatilComponent],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cards: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCards();
  }

  fetchCards(): void {
    const url = 'https://api.scryfall.com/cards/search?format=json&include_extras=false&include_multilingual=false&include_variations=false&order=name&page=2&q=c%3Awhite+mv%3D1&unique=cards';

    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.cards = response.data.map((card: any) => ({
          name_en: card.name,
          imageUrl: card.image_uris?.normal || '',
          user: { username: 'Scryfall' },
          expansion: { name_en: card.set_name },
          price: { formatted: card.prices?.eur ? `${card.prices.eur} €` : 'N/A' },
          properties_hash: { condition: 'Near Mint', mtg_foil: card.foil },
          quantity: 1,
          graded: false
        }));
      },
      error: (err) => {
        console.error('Errore durante il fetch delle carte:', err);
      }
    });
  }
}
