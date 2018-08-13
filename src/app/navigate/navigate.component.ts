import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}
}
