import {NgModule, provideBrowserGlobalErrorListeners} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing-module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './shared/navbar/navbar.component';
import {SearchPageComponent} from './features/search-page/search-page.component';
import {ResultPageComponent} from './features/result-page/result-page.component';
import {FooterComponent} from './shared/footer/footer.component';
import {CardTableComponent} from './shared/card-table/card-table.component';
import {BubbleNavbarComponent} from './shared/bubble-navbar/bubble-navbar.component';
import {CardListComponent} from './features/card-list/card-list.component';

import {provideHttpClient} from '@angular/common/http';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {CardDeatilComponent} from './shared/card-deatil/card-deatil.component';
import {FilterModalComponent} from './shared/filter-modal/filter-modal.component';
import {
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import {IonicModule} from '@ionic/angular';
import {StatusDefinitionPipe} from '../providers/pipes/status-definition.pipe';


@NgModule({
  declarations: [
    AppComponent,
    SearchPageComponent,
    NavbarComponent,
    ResultPageComponent,
    FilterModalComponent,
    FooterComponent,
    CardTableComponent,
    StatusDefinitionPipe,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    BubbleNavbarComponent,
    CardListComponent,
    CardDeatilComponent,

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
