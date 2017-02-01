import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'object', pure:false})
export class Object implements PipeTransform {
    transform(data:any, objects:any, field:any) {
        var obj:any = null;
        objects.forEach((e:any) => {

            if(e.value == data) {
                obj = e;
            }
        });
        return obj[field];
    }
}