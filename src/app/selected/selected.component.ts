import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from 'src/app/store.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-selected',
  templateUrl: './selected.component.html',
  styleUrls: ['./selected.component.scss']
})
export class SelectedComponent implements OnInit, AfterViewInit {
  constructor(private store: Store, private http: HttpClient) {}

  ngOnInit() {
    if (this.store.selectedCoinSymbol !== this.store.getCurrentUrl().split('/')[2]) {
      this.store.selectOneCoin(this.store.getCurrentUrl().split('/')[2]);
      this.store.loadSelectedCoinData(this.store.selectedCoinSymbol);
    }
  }

  ngAfterViewInit() {
    if (this.store.prevOrNext === true) {
      this.store.setScroll(this.store.scroll[this.store.urlNumber || 0]);
    } else {
      this.store.setScroll([this.store.mainWidth, this.store.mainHeight]);
    }

    // console.log(
    //   this.http
    //     .get('https://github.com/atomiclabs/cryptocurrency-icons/blob/master/svg/color/btc.svg?raw=true')
    //     .subscribe(data => console.log(data))
    // );
  }
}
