import { Pipe, PipeTransform } from '@angular/core';

declare var moment:any;

@Pipe({name:'orderBy', pure:false})
export class OrderBy implements PipeTransform {
    transform(data:Array<any>, field:string, asc:any) {
        if(typeof field!=='undefined') {
            var dir = (asc)?1:-1;
            if(!Array.isArray(data)) return data; // es un solo registro
            data.sort((a:any, b:any) => {
                if((a[field] === null || a[field] === undefined) && (b[field]!==null && b[field]!==undefined)) return -1 * dir;
                if((b[field] === null || b[field] === undefined) && (a[field]!==null && a[field]!==undefined)) return 1 * dir;
                if((b[field] === null || b[field] === undefined) && (a[field] === null || a[field] === undefined)) return 0;

                if(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/.test(a[field])) { //check format dd/mm/yyyy hh:mm:ss
                    var dateA = moment(a[field], 'DD-MM-YYYY hh:mm:ss');
                    var dateB = moment(b[field], 'DD-MM-YYYY hh:mm:ss');
                    if(dateA.isBefore(dateB)) {
                        return -1 * dir;
                    }else if(dateA.isAfter(dateB)) {
                        return 1 * dir;
                    }else {
                        return 0;
                    }
                }else {
                    if(a[field] < b[field]) {
                        return -1 * dir;
                    }else if(a[field] > b[field]) {
                        return 1 * dir;
                    }else {
                        return 0;
                    }
                }


            });
        }
        return data;
    }
}
