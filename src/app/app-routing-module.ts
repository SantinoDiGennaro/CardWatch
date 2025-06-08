import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchPage} from './features/search-page/search-page';
import {ResultPage} from './features/result-page/result-page';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: SearchPage},
  {path: 'cards/:cardName', component: ResultPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
