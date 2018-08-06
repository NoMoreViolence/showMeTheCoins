import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent implements OnInit {
  @HostBinding('attr.class') class = 'container';
  constructor(private store: Store) {}

  ngOnInit() {}
}
