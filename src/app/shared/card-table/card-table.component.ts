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
  @Input() cards: Array<CardMarketplace> = [];
  @Input() showCardName: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: Array<string> = ['reseller', 'price', 'expansion', 'condition'];
  dataSource: MatTableDataSource<CardMarketplace> = new MatTableDataSource<CardMarketplace>([]);

  ngOnInit(): void {
    if (this.showCardName) {
      this.displayedColumns.unshift('cardName');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.cards);

    if (this.paginator) {
      this.paginator._changePageSize(this.paginator.pageSize);
      this.paginator.firstPage();
    }
  }

}
