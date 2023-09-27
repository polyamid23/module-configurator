import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { CartModule } from './cart/cart.module';

import { AppComponent } from './app.component';

import { ModulesComponent } from './modules/modules.component';
import { ModulesItemComponent } from './modules-item/modules-item.component';

import { HomeComponent } from './home/home.component';
import { ModuleDetailComponent } from './module-detail/module-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ModulesComponent,
    HomeComponent,
    ModuleDetailComponent,
    ModulesItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
