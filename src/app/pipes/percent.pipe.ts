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
@Pipe({ name: 'percent' })
export class PercentPipe implements PipeTransform {
  transform(value: [number, number]): string {
    if (value[0] > value[1]) {
      return (100 - (value[1] / value[0]) * 100).toFixed(1);
    } else if (value[0] < value[1]) {
      return (100 - (value[0] / value[1]) * 100).toFixed(1);
    } else {
      return '0.0';
    }
  }
}
