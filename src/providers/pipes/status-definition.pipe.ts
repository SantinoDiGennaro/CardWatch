import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusDefinition',
  standalone: false
})
export class StatusDefinitionPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    switch (value) {
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
