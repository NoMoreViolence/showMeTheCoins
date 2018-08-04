import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CoinUnit } from 'src/interfaces';
import { concat, makeArray } from 'src/functions';

@Injectable()
class Store {
  // All coin data
  allCoinData: CoinUnit[] = [];
  // Sorted coin data
  sortedCoinData: CoinUnit[] = [];
  // request coin number
  public loaded = 1;
  // Request pending value
  pending = false;
  // Request button, if user get all coin value, Become button that can not be clicked
  showMoreButton = true;
  // Search input
  searchInput = '';
  // Scroll value
  scroll: [number, number] | null = null;

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  // Toast Message
  giveMessage(message: string, type: string): void {
    this.toast[type](message);
  }

  // Change URL method
  goToSomeWhere(location?: string) {
    this.getCurrentScroll();
    // Location
    const Location = location ? `/${location}` : '';
    // First, Change Url, Second, set scroll before click the link or enter
    this.router.navigateByUrl(`coins${Location}`).then(() => this.setScroll(this.scroll));
  }

  // Get current scroll value
  getCurrentScroll(): void {
    this.scroll = this.viewportScroller.getScrollPosition();
  }

  // Setting scroll value
  setScroll(value: [number, number]): void {
    this.viewportScroller.scrollToPosition(value);
  }

  // Change search bar input
  changeInput(event: any): void {
    // Input change
    this.searchInput = event.target.value;
    // Sort data
    this.sortCoinData();
    // If user click enter key, go to coins component
    if (event.keyCode === 13 && this.searchInput !== '') {
      this.goToSomeWhere();
    }
  }

  // Load coin data
  loadCoinData(message?: string) {
    if (this.pending === true) {
      return this.giveMessage('코인 데이터 요청 중 입니다 ! 잠시만 기다려주세요', 'info');
    }
    // Pending
    this.pending = true;

    // API Call
    this.getCoins(this.loaded).subscribe(
      (data: { data }): void => {
        // Add coin data
        this.allCoinData = concat([this.allCoinData, makeArray(data.data)]);

        this.sortCoinData();
        // Loaded
        this.pending = false;
        // Up load count
        this.loaded += 100;
        // If there is a message
        if (message) {
          this.giveMessage(message, 'success');
        }
      },
      (err: HttpErrorResponse): void => {
        // Loaded
        this.pending = false;

        // Error handle
        if (err.status === 404) {
          this.showMoreButton = false;
          this.giveMessage('더이상 가져올 수 있는 코인 데이터가 존재하지 않습니다 !', 'error');
        }
        if (err.status === 0) {
          this.giveMessage('인터넷 연결 문제가 발생했습니다 !', 'error');
        }

        console.log(err.message);
      }
    );
  }

  sortCoinData() {
    this.sortedCoinData = this.allCoinData.filter(
      (object: CoinUnit) => object.symbol.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1
    );
  }

  // Get coins
  getCoins(startNumber?: number) {
    return this.http.get(`https://api.coinmarketcap.com/v2/ticker/?convert=KRW&start=${startNumber || 1}`);
  }
}

export { Store };
