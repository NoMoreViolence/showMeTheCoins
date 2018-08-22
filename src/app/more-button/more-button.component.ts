import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-more-button',
  templateUrl: './more-button.component.html',
  styleUrls: ['./more-button.component.scss']
})
export class MoreButtonComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}
}
