import { Component, AfterViewInit } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements AfterViewInit {
  constructor(private store: Store) {}

  ngAfterViewInit() {
    this.store.setScroll(this.store.scroll[this.store.urlNumber || 0]);
  }
}
