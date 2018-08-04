import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';

import { Store } from './store.service';

import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CoinsComponent } from './coins/coins.component';
import { SelectedComponent } from './selected/selected.component';
import { CoinModelComponent } from './coin-model/coin-model.component';
import { MainComponent } from './main/main.component';
import { UnderComponent } from './under/under.component';

// Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    CoinsComponent,
    SelectedComponent,
    CoinModelComponent,
    SearchBarComponent,
    MainComponent,
    UnderComponent
  ],
  imports: [BrowserModule, RouterModule, routing, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
