import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchPageComponent} from './features/search-page/search-page.component';
import {ResultPageComponent} from './features/result-page/result-page.component';
import {FavoritePageComponent} from './features/favorite-page/favorite-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: SearchPageComponent},
  {path: 'cards/:cardName', component: ResultPageComponent},
  {path: 'favorite', component: FavoritePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
