import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-coin-model',
  templateUrl: './coin-model.component.html',
  styleUrls: ['./coin-model.component.scss']
})
export class CoinModelComponent implements OnInit {
  @HostBinding('attr.class') class = 'container';

  constructor(private store: Store) {}

  ngOnInit() {}
}
