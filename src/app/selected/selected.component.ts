import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit, AfterViewInit {
  constructor(private store: Store) {}

  ngOnInit() {
    if (this.store.selectedCoinSymbol !== this.store.getCurrentUrl().split('/')[2]) {
      this.store.selectOneCoin(this.store.getCurrentUrl().split('/')[2]);
      this.store.loadSelectedCoinData(this.store.selectedCoinSymbol);
    }
  }

  ngAfterViewInit() {
    if (this.store.prevOrNext === true) {
      this.store.setScroll(this.store.scroll[this.store.urlNumber || 0]);
    } else {
      this.store.setScroll([this.store.mainWidth, this.store.mainHeight]);
    }
  }
}
