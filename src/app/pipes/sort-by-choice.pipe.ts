import { Pipe, PipeTransform } from '@angular/core';
import { Store } from 'src/app/store.service';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({ name: 'sortByChoice' })
export class SortByChoicePipe implements PipeTransform {
  public constructor(private store: Store) {}

  public transform(_value: string): string {
    return 'selected';
  }
}
