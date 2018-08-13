import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'comaToNumber' })
export class ComaToNumberPipe implements PipeTransform {
  transform(value: [number, number]): string {
    const int = value[0].toString().split('.')[0];
    const float = value
      .toString()
      .split('.')[1]
      .slice(0, value[1]);

    const comaIntValue = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    if (value[1] !== 0) {
      return comaIntValue + '.' + float;
    }

    return comaIntValue;
  }
}
