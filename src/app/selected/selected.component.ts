import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}
}
