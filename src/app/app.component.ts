import { Component, OnInit, Input } from '@angular/core';
import { Store } from './store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  async ngOnInit() {
    // First loading
    this.store.loadCoinData('환영합니다 !');
  }
}
