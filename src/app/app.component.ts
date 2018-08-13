import { Component, OnInit } from '@angular/core';
import { Store } from './store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    // First loading
    this.store.loadCoinData('환영합니다 !');
  }
}
