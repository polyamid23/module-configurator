import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'module/:id', component: ModuleDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
