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
    this.store.loaded === 1 ? this.store.loadAllCoinData('환영합니다 !') : console.log('main page loaded');
  }

  ngAfterViewInit() {
    this.store.setScroll(this.store.scroll[this.store.urlNumber || 0]);
  }
}
