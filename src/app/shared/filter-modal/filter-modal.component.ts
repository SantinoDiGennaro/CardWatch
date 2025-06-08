import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Filter} from '../../../models/types/filter.type';

@Component({
  selector: 'app-filter-modal',
  standalone: false,
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {
  data = inject(MAT_DIALOG_DATA);
  filters: Filter = this.data.filters;
  expansions = ['', ...this.data.expansions];
  conditions = [
    {code: '', view: 'Nessuna'},
    {code: 'Near Mint', view: 'Quasi Perfetta'},
    {code: 'Slightly Played', view: 'Leggermente Usata'},
    {code: 'Moderately Played', view: 'Moderatamente Usata'},
    {code: 'Played', view: 'Usata'},
    {code: 'Poor', view: 'In Cattive Condizioni'}
  ];

  constructor(private dialogRef: MatDialogRef<FilterModalComponent>) {
  }

  confirm(): void {
    this.dialogRef.close(this.filters);
  }

}
