import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';

import { Store } from './store.service';
import { ChangeToColorPipe, ComaToNumberPipe, SvgPipe, PercentPipe } from './pipes';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { NavigateComponent } from './navigate/navigate.component';
import { CoinsComponent } from './coins/coins.component';
import { SelectedComponent } from './selected/selected.component';
import { UnderComponent } from './under/under.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MoreButtonComponent } from './more-button/more-button.component';

// Toast
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ChangeToColorPipe,
    ComaToNumberPipe,
    SvgPipe,
    PercentPipe,
    AppComponent,
    MainComponent,
    SearchBarComponent,
    NavigateComponent,
    LoadingSpinnerComponent,
    CoinsComponent,
    SelectedComponent,
    UnderComponent,
    MoreButtonComponent
  ],
  imports: [BrowserModule, RouterModule, routing, HttpClientModule, BrowserAnimationsModule, ToastrModule.forRoot()],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
