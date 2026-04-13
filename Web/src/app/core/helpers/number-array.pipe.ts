
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberArray',
  standalone: true
})
export class NumberArrayPipe implements PipeTransform {
  transform(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i + 1);
  }
}
