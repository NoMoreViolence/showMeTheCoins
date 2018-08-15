import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CoinUnit, UrlData, ScrollData } from 'src/interfaces';
import { concat, makeArray } from 'src/functions';

@Injectable()
class Store {
  // All coin data
  public allCoinData: CoinUnit[] = [];
  // Sorted coin data
  public sortedCoinData: CoinUnit[] = [];
  // Search input
  public searchInput = '';
  // User Sort Choice
  public userChoice = 'market_cap';

  // request coin number
  public loaded = 1;
  // Request pending value
  public pending = false;
  // Request button, if user get all coin value, Become button that can not be clicked
  public showMoreButton = true;

  // URL + SCROLL Value
  public urlScroll: UrlData[] = [];
  // Url number
  public urlNumber = 0;

  // Scroll value
  public tempScroll: [number, number] | null = null;
  // Current Url
  public url = [];

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

  // Go to prev page
  goToPrevPage() {
    if (!this.url[this.urlNumber - 1]) {
      return this.giveMessage('There is no prev page !', 'info');
    }

    this.urlNumber -= 1;
    // Get current scroll value
    this.getCurrentScroll();
    // First, Change Url, Second, set scroll before url moved, Third, change url array info
    this.router.navigateByUrl(this.url[this.urlNumber || 0]).then(() => {
      // set scroll
      this.setScroll();
    });
  }

  // Change URL method
  goToSomeWhere(location?: string) {
    // Bring current url value
    this.url[this.urlNumber || 0] = this.router.url;

    // To Location
    const nextLocation = location ? location : '/coins';

    if (nextLocation !== this.url[this.urlNumber]) {
      // Get current scroll value
      this.getCurrentScroll();
      // First, Change Url, Second, set scroll before url moved, Third, change url array info
      this.router.navigateByUrl(`${nextLocation}`).then(() => {
        // set scroll
        this.setScroll();
        // set current url
        this.urlNumber += 1;
        this.url[this.urlNumber || 0] = this.router.url;
        // reset next url infomation
        this.url.length = this.urlNumber + 1;
      });
    }
  }

  // Go to next page
  goToNextPage() {
    if (!this.url[this.urlNumber + 1]) {
      return this.giveMessage('There is no next page !', 'info');
    }

    this.urlNumber += 1;
    // Get current scroll value
    this.getCurrentScroll();
    // First, Change Url, Second, set scroll before url moved, Third, change url array info
    this.router.navigateByUrl(this.url[this.urlNumber || 0]).then(() => {
      // set scroll
      this.setScroll();
    });
  }

  // Get current scroll value
  getCurrentScroll(): void {
    this.tempScroll = this.viewportScroller.getScrollPosition();
  }

  // Setting scroll value
  setScroll(data: [number, number]): void {
    this.viewportScroller.scrollToPosition(data);
  }

  // Change search bar input
  changeInput(event: any): void {
    // Input change
    this.searchInput = event.target.value;
    // Sort data
    this.sortCoinDataByKey();
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
        this.allCoinData = concat([this.allCoinData, makeArray(data.data)]); // Add coin data
        this.sortCoinDataByKey(); // Sort Coin Data
        this.sortCoinDataByUserChoice();

        this.pending = false; // Coin Loaded
        this.loaded += 100; // Up load count

        // If there is a message
        if (message) {
          this.giveMessage(message, 'success');
        }
      },
      (err: HttpErrorResponse): void => {
        this.pending = false; // Loaded

        // Error handle
        if (err.status === 404) {
          this.showMoreButton = false;
          this.giveMessage('더이상 가져올 수 있는 코인 데이터가 존재하지 않습니다 !', 'error');
        }
        if (err.status === 0) {
          this.giveMessage('인터넷 연결 문제가 발생했습니다 !', 'error');
        }
      }
    );
  }

  // Sort Coin List By User's key
  sortCoinDataByKey() {
    this.sortedCoinData = this.allCoinData.filter(
      (object: CoinUnit) => object.symbol.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1
    );
  }

  // Sort Coin List By User's choice
  sortCoinDataByUserChoice() {
    this.sortedCoinData = this.allCoinData.sort((objectOne: CoinUnit, objectTwo: CoinUnit) => {
      return objectTwo.quotes.USD[this.userChoice] - objectOne.quotes.USD[this.userChoice];
    });
  }
  // Change User Choice
  changeUserChoice(value: any) {
    console.log(value);
    // this.userChoice = value;
  }

  // Get coins
  getCoins(startNumber?: number) {
    return this.http.get(`https://api.coinmarketcap.com/v2/ticker/?convert=KRW&start=${startNumber || 1}`);
  }
}

export { Store };
