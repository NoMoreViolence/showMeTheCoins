import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements OnInit, AfterViewInit {
  constructor(private store: Store) {}

  selected = (value: [string, string | undefined, string | undefined]) =>
    value.map((obj: string, i: number) => obj === this.store.userChoice[i]).find((obj: boolean) => obj === false) === undefined
      ? 'selected'
      : '';

  ngOnInit() {
    if (this.store.loaded) {
      this.store.loadAllCoinData('환영합니다');
    }
  }

  ngAfterViewInit() {
    if (this.store.urlNumber !== 0) {
      this.store.setScroll([this.store.mainWidth, this.store.mainHeight]);
    } else {
      this.store.setScroll(this.store.scroll[this.store.urlNumber || 0]);
    }
  }
}
