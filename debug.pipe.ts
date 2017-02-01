import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'debug', pure:false})
export class Debug implements PipeTransform {
  transform(data:any) {
    return JSON.stringify(data);
  }
}
