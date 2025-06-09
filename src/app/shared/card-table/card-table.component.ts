import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {CardMarketplace} from '../../../models/types/card-marketplace.type';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-card-table',
  standalone: false,
  templateUrl: './card-table.component.html',
  styleUrl: './card-table.component.css'
})
export class CardTableComponent implements OnInit, OnChanges, AfterViewInit {
  displayedColumns: Array<string> = ['reseller', 'price', 'expansion', 'condition'];
  @Input() cards: Array<CardMarketplace> = [];
  dataSource: MatTableDataSource<CardMarketplace> | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<CardMarketplace>(this.cards);
  }

  ngAfterViewInit(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnChanges(): void {
    if (this.dataSource) {
      this.dataSource.data = this.cards;
    } else {
      this.dataSource = new MatTableDataSource<CardMarketplace>(this.cards);
    }


    if (this.paginator && this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }

  }
}
