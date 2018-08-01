import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { CoinUnit } from 'src/interfaces';
import { concat, makeArray } from 'src/functions';

@Injectable()
class ApiServiceService {
  // 모든 코인 데이터 담는 공간
  allCoinData: CoinUnit[] = [];
  // 코인 데이터 불러오는 시작값
  loaded = 100;
  // 코인 데이터 요청 시 pending 값
  pending = false;
  // 코인 데이터 더 불러오기 버튼, loaded가 1000이 넘을 경우 자동 비활성화
  showMoreButton = true;
  // 검색 Input
  searchInput = '';

  constructor(private http: HttpClient, private toast: ToastrService) {}

  changeInput(inputData: string): void {
    this.searchInput = inputData;

    console.log(this.searchInput);
  }

  getAllCoins(startNumber?: number) {
    return this.http.get(
      `https://api.coinmarketcap.com/v2/ticker/?convert=KRW&start=${startNumber ||
        1}`
    );
  }

  // 첫 페이지 로딩 시 코인 100개 데이터 api 요청
  firstLoading() {
    // pending
    this.pending = true;
    // 코인 API 요청
    this.getAllCoins().subscribe(
      (data: { data }): void => {
        // 코인 데이터 추가
        this.allCoinData = makeArray(data.data);
        // 로딩 완료
        this.pending = false;

        this.toast.success('환영합니다 !');
        console.log('코인 데이터: ', this.allCoinData);
      },
      (err: Error): void => {
        this.toast.error('이런.. 인터넷 연결을 확인해 주세요 !');
        console.log('초기 데이터 로딩 에러!');
        console.log(err.message);
      }
    );
  }

  // 코인 데이터 더 불러올 때 사용 100개 단위로 불러온다
  loadMore() {
    // pending
    this.pending = true;
    // 코인 API 요청
    this.getAllCoins(this.loaded).subscribe(
      // 성공
      (data: { data }): void => {
        // 코인 데이터 추가
        this.allCoinData = concat([this.allCoinData, makeArray(data.data)]);
        // 로딩 완료
        this.pending = false;
        // 코인 로드 카운트 100 증가
        this.loaded += 100;

        console.log('코인 데이터: ', this.allCoinData);
      },
      (err: Error): void => {
        console.log('더 이상 API 요청을 할 수 없습니다');
        console.log(err.message);
        this.showMoreButton = false;
      }
    );
  }
}

export { ApiServiceService };
