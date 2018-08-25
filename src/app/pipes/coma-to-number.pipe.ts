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
    const number = Number.parseFloat(value[0].toString()).toFixed(value[1]); // Create Number

    const numberValue = number.split('.'); // Int Number: numberValue[0], Float Number: numberValue[1]

    const comaIntValue = numberValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Coma Int Value

    // If there is float number expression
    if (value[1] !== 0) {
      return comaIntValue + '.' + numberValue[1].slice(0, value[1]);
    }

    // There is no float number expression
    return comaIntValue;
  }
}
