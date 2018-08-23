import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
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
  constructor(private sanitizer: Sanitizer) {}
  transform(url: string): Observable<string> {
    return Observable.create(observer => {
      const xhr = new XMLHttpRequest();
      xhr.open('get', url);
      // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.onloadend = () => {
        const theURL = 'data:image/svg+xml;utf8,' + xhr.responseText;
        this.sanitizer.sanitize(SecurityContext.URL, theURL);
        observer.next(theURL);
      };
      xhr.send();
    });
  }
}
