import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Filter} from '../../../models/types/filter.type';

@Component({
  selector: 'app-filter-modal',
  standalone: false,
  templateUrl: './filter-modal.html',
  styleUrl: './filter-modal.css'
})
export class FilterModal {
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

  constructor(private dialogRef: MatDialogRef<FilterModal>) {
  }

  confirm(): void {
    this.dialogRef.close(this.filters);
  }

}
