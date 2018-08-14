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
    if (value[0] % 1 === 0) {
      return value[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Int Number: numberValue[0], Float Number: numberValue[1]
    const numberValue = value[0].toString().split('.');

    // Coma Int Value
    const comaIntValue = numberValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // If there is float number expression
    if (value[1] !== 0) {
      return comaIntValue + '.' + numberValue[1].slice(0, value[1]);
    }

    // There is no float number expression
    return comaIntValue;
  }
}
