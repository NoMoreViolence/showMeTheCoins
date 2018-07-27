import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoinsComponent } from './coins/coins.component';
import { SelectedComponent } from './selected/selected.component';
import { CoinModelComponent } from './coin-model/coin-model.component';

@NgModule({
  declarations: [
    AppComponent,
    CoinsComponent,
    SelectedComponent,
    CoinModelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
