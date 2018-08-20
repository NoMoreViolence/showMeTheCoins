import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from 'src/app/store.service';
import { of } from 'rxjs';

import { CoinUnit } from 'src/interfaces';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.selectOneCoin(this.router.url.split('/')[2]);
    this.store.loadSelectedCoinData(this.store.selectedCoinSymbol);
  }
}
