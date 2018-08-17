import { Component, AfterViewInit } from '@angular/core';

import { from } from 'rxjs';
import { map, find } from 'rxjs/operators';

import { Store } from 'src/app/store.service';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.scss']
})
export class CoinsComponent implements AfterViewInit {
  constructor(private store: Store) {}

  selected = (value: [string, string | undefined, string | undefined]) => {
    let returnData = '';

    from(value)
      .pipe(
        map((obj: string, i: number) => obj === this.store.userChoice[i]),
        find((obj: boolean) => obj === false)
      )
      .subscribe(data => {
        returnData = data === undefined ? 'selected' : '';
      });

    return returnData;
  };

  ngAfterViewInit = () => this.store.setScroll(this.store.scroll[this.store.urlNumber || 0]);
}
