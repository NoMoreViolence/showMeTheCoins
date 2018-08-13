import { Component, OnInit } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {}
}
