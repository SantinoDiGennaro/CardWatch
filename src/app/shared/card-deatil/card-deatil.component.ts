import {Component, Input} from '@angular/core';
import {CardMarketplace} from '../../../models/types/card-marketplace.type';
import {CardStatus} from '../../../models/types/card-status.type';

@Component({
  selector: 'app-card-deatil',
  standalone: false,
  templateUrl: './card-deatil.component.html',
  styleUrl: './card-deatil.component.css'
})
export class CardDeatilComponent {
  @Input() card: CardMarketplace | undefined;

  statusDefinition(status: CardStatus): string {
    switch (status) {
      case 'Near Mint':
        return 'Quasi Perfetta';
      case 'Slightly Played':
        return 'Leggermente Usata';
      case 'Moderately Played':
        return 'Moderatamente Usata';
      case 'Played':
        return 'Usata';
      case 'Poor':
        return 'In Cattive Condizioni';
      default:
          return '';
    }
  }
}
