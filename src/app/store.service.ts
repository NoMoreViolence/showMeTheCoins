import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CoinUnit } from 'src/interfaces';
import { concat, makeArray } from 'src/functions';

@Injectable()
class Store {
  public allCoinData: CoinUnit[] = []; // All coin data
  public sortedCoinData: CoinUnit[] = []; // Sorted coin data
  public searchInput = ''; // Search input
  public userChoice: string[] = ['quotes', 'USD', 'market_cap', 'primary']; // User Sort Choice
  public prevSortWay = 'primary';

  public loaded = 1; // request coin number
  public pending = false; // Request pending value
  public showMoreButton = true; // Request button, if user get all coin value, Become button that can not be clicked

  public urlNumber = 0; // url Number
  public url = []; // Current Url
  public scroll: [number, number][] = []; // Current Scroll value
  public tempScroll: [number, number] | null = null; // Temp scroll value

  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  // Toast Message
  giveMessage(message: string, type: string) {
    return this.toast[type](message);
  }

  // Go to prev page
  goToPrevPage() {
    if (!this.url[this.urlNumber - 1]) {
      return this.giveMessage('There is no prev page !', 'info');
    }

    this.urlNumber -= 1;
    // First, Change Url, Second, set scroll before url moved, Third, change url array info
    this.router.navigateByUrl(this.url[this.urlNumber || 0]);
  }

  // Go to next page
  goToNextPage() {
    if (!this.url[this.urlNumber + 1]) {
      return this.giveMessage('There is no next page !', 'info');
    }

    this.urlNumber += 1;
    // First, Change Url, Second, set scroll before url moved, Third, change url array info
    this.router.navigateByUrl(this.url[this.urlNumber || 0]);
  }

  // Change URL method
  goToSomeWhere(location?: string) {
    // Bring current url value
    this.url[this.urlNumber || 0] = this.router.url;
    this.scroll[this.urlNumber || 0] = this.getCurrentScroll();

    // To Location
    const nextLocation = location ? location : '/coins';

    if (nextLocation !== this.url[this.urlNumber]) {
      // Get current scroll value
      // First, Change Url, Second, set scroll before url moved, Third, change url array info
      this.router.navigateByUrl(`${nextLocation}`).then(() => {
        this.setScroll(this.tempScroll); // set scroll

        this.urlNumber += 1; // set current url
        this.url[this.urlNumber || 0] = this.router.url;
        this.url.length = this.urlNumber + 1; // reset next url infomation
      });
    }
  }

  // Get current scroll value
  getCurrentScroll() {
    this.tempScroll = this.viewportScroller.getScrollPosition();
    return this.tempScroll;
  }

  // Setting scroll value
  setScroll = (value: [number, number]) => (!value ? console.log('first loading') : this.viewportScroller.scrollToPosition(value));

  // Get coins
  getCoins = (startNumber?: number) => this.http.get(`https://api.coinmarketcap.com/v2/ticker/?convert=KRW&start=${startNumber || 1}`);

  // Load coin data
  loadCoinData(message?: string) {
    this.getCurrentScroll(); // Get current scroll value

    if (this.pending === true) {
      return this.giveMessage('코인 데이터 요청 중 입니다 ! 잠시만 기다려주세요', 'info');
    }
    // Pending
    this.pending = true;

    // API Call
    this.getCoins(this.loaded).subscribe(
      (data: { data }): void => {
        this.allCoinData = concat([this.allCoinData, makeArray(data.data)]); // Add coin data
        this.sortedCoinData = this.allCoinData;
        this.sortedCoinData = this.sortCoinDataByKey(this.sortedCoinData, this.searchInput);
        this.sortedCoinData = this.sortCoinDataByUserChoice(this.userChoice); // Sort Coin Data:user choice

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

  // Sort Coin List By User's choice
  sortCoinDataByUserChoice = (value: string[]) =>
    value[value.length - 1] === 'primary'
      ? this.sortedCoinData.sort(
          (objectOne: CoinUnit, objectTwo: CoinUnit) =>
            this.userChoice.length > 3
              ? objectTwo[this.userChoice[0]][this.userChoice[1]][this.userChoice[2]] -
                objectOne[this.userChoice[0]][this.userChoice[1]][this.userChoice[2]]
              : objectTwo[this.userChoice[0]] > objectOne[this.userChoice[0]]
                ? -1
                : objectTwo[this.userChoice[0]] < objectOne[this.userChoice[0]]
                  ? 1
                  : 0
        )
      : this.sortedCoinData.sort(
          (objectOne: CoinUnit, objectTwo: CoinUnit) =>
            this.userChoice.length > 3
              ? objectOne[this.userChoice[0]][this.userChoice[1]][this.userChoice[2]] -
                objectTwo[this.userChoice[0]][this.userChoice[1]][this.userChoice[2]]
              : objectTwo[this.userChoice[0]] > objectOne[this.userChoice[0]]
                ? 1
                : objectTwo[this.userChoice[0]] < objectOne[this.userChoice[0]]
                  ? -1
                  : 0
        );
  // Change User Choice
  changeUserChoice(value: string[]) {
    // same Check
    const sameCheck = value.map((obj: string, i: number) => obj === this.userChoice[i]).find((obj: boolean) => obj === false);
    this.prevSortWay = this.userChoice[this.userChoice.length - 1]; // Prev sort way
    this.userChoice = value.length === 3 ? [value[0], value[1], value[2]] : [value[0]]; // Change current user choice

    if (sameCheck === undefined && this.prevSortWay === 'primary') {
      this.userChoice.push('reverse');
      this.sortedCoinData = this.sortCoinDataByUserChoice(this.userChoice); // Change all coin data:reverse
      return;
    }

    if (sameCheck === undefined && this.prevSortWay === 'reverse') {
      this.userChoice.push('primary');
      this.sortedCoinData = this.sortCoinDataByUserChoice(this.userChoice); // Change all coin data
    }

    this.userChoice.push('primary');
    this.sortedCoinData = this.sortCoinDataByUserChoice(this.userChoice); // Change all coin data
  }

  // Sort Coin List By User's key
  sortCoinDataByKey = (value: CoinUnit[], input: string) =>
    value.filter((object: CoinUnit) => object.symbol.toLowerCase().indexOf(this.searchInput.toLowerCase()) > -1);

  // Change search bar input
  changeInput(event: any) {
    this.searchInput = event.target.value; // Input change

    // If user click enter key, go to coins component
    if (event.keyCode === 13 && this.searchInput !== '') {
      this.goToSomeWhere();
    }

    this.sortedCoinData = this.sortCoinDataByKey(this.sortedCoinData, this.searchInput); // Sort data
  }
}

export { Store };
