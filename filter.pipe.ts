import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name:'filter', pure:false})
export class Filter implements PipeTransform {
    transform(data:Array<any>, fields:any[]) {
        if(!Array.isArray(data)) return data;
        if(fields.length===0) return data;
        return data.filter((e)=> {
            var exit:any = e;
            var empty = true;
            fields.forEach((el) => {
                if(el.query!=='') {
                    empty = false;
                    if(isNaN(Number(el.query))) {
                        exit = exit && e[el.field]!==null && e[el.field].toLowerCase().indexOf(el.query.toLowerCase()) !== -1;
                    }else {
                        if(typeof el.type!=='undefined' && el.type!==null && el.type==='date') {
                            console.log("date")
                            exit = exit && e[el.field]!==null && e[el.field].toLowerCase().indexOf(el.query.toLowerCase()) !== -1;
                        }else {
                            console.log("numero")
                            exit = exit && e[el.field]!==null && e[el.field] === Number(el.query);
                        }
                    }
                }
            });
            if(empty) return e;
            return exit;
        });
    }
}
