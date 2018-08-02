import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { CoinUnit } from 'src/interfaces';
import { concat, makeArray } from 'src/functions';

@Injectable()
class Store {
  // 모든 코인 데이터 담는 공간
  allCoinData: CoinUnit[] = [];
  // 코인 데이터 불러오는 시작값
  loaded = 1;
  // 코인 데이터 요청 시 pending 값
  pending = false;
  // 코인 데이터 더 불러오기 버튼, loaded가 1000이 넘을 경우 자동 비활성화
  showMoreButton = true;
  // 검색 Input
  searchInput = '';

  constructor(private http: HttpClient, private toast: ToastrService, private router: Router) {}

  // Toast Message
  giveMessage(message: string, type: string) {
    this.toast[type](message);
  }

  // Change search bar input
  changeInput(event: any): void {
    this.searchInput = event.target.value;

    if (event.keyCode === 13 && this.searchInput !== '') {
      this.goToSomeWhere(this.searchInput);
    }
  }

  // Change URL method
  goToSomeWhere(location?: string) {
    if (!location) {
      return this.router.navigateByUrl('/coins');
    }
    return this.router.navigateByUrl(`coins/${location}`);
  }

  // Get coins
  getCoins(startNumber?: number) {
    return this.http.get(`https://api.coinmarketcap.com/v2/ticker/?convert=KRW&start=${startNumber || 1}`);
  }

  // Load coin data
  loadCoinData(message?: string) {
    // Pending
    this.pending = true;

    // API Call
    this.getCoins(this.loaded).subscribe(
      (data: { data }): void => {
        // Add coin data
        this.allCoinData = concat([this.allCoinData, makeArray(data.data)]);
        // Pending
        this.pending = false;
        // Up load count
        this.loaded += 100;
        // If there is a message
        if (message) {
          this.giveMessage(message, 'success');
        }
      },
      (err: Error): void => {
        this.giveMessage('이런.. 인터넷 연결을 확인해 주세요 !', 'error');
        console.log(err.message);
      }
    );
  }
}

export { Store };
