import { Component } from '@angular/core';
import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  constructor(private store: Store) {}
}
