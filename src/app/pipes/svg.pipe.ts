// import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';
// import { Observable } from 'rxjs';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// /*
//  * Raise the value exponentially
//  * Takes an exponent argument that defaults to 1.
//  * Usage:
//  *   value | exponentialStrength:exponent
//  * Example:
//  *   {{ 2 | exponentialStrength:10 }}
//  *   formats to: 1024
// */
// // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
// // Observable<HttpResponse<string>>
// @Pipe({ name: 'svgPipe' })
// export class SvgPipe implements PipeTransform {
//   constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}
//   transform(url: string): SafeUrl {
//     return Observable.create(observer => {
//       const xhr = new XMLHttpRequest();
//       xhr.open('get', url, true);
//       xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
//       xhr.onloadend = () => {
//         const theURL = this.sanitizer.bypassSecurityTrustUrl('data:image/svg+xml;utf8,' + xhr.responseText);
//         observer.next(theURL);
//       };
//       xhr.send();
//     });
//   }
// }

import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/

@Pipe({ name: 'svg' })
export class SvgPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}
  transform(url: string): SafeUrl {
    return Observable.create(observer => {
      this.http.get(url).subscribe(
        (data: string) => {},
        (err: HttpErrorResponse) => {
          observer.next(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/svg+xml;utf8,' + err.error.text));
        }
      );
    });
  }
}
