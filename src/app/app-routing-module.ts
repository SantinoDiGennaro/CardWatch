import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchPage} from './features/search-page/search-page';

const routes: Routes = [
  {path:'', component: SearchPage}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
