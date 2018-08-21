import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';

import { Store } from './store.service';
import { ChangeToColorPipe, ComaToNumberPipe } from './pipes';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavigateComponent } from './navigate/navigate.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CoinsComponent } from './coins/coins.component';
import { SelectedComponent } from './selected/selected.component';
import { CoinModelComponent } from './coin-model/coin-model.component';
import { UnderComponent } from './under/under.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MoreButtonComponent } from './more-button/more-button.component';

@NgModule({
  declarations: [
    ChangeToColorPipe,
    ComaToNumberPipe,
    AppComponent,
    MainComponent,
    SearchBarComponent,
    NavigateComponent,
    LoadingSpinnerComponent,
    CoinsComponent,
    SelectedComponent,
    CoinModelComponent,
    UnderComponent,
    NotFoundComponent,
    MoreButtonComponent
  ],
  imports: [BrowserModule, RouterModule, routing, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
