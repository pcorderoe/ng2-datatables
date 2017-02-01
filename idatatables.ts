export interface IDatatables {
    columns:Array<any>;
    columnsLength?:number;
    data:Array<any>;
}
export class DatatablesModel {
    columns:Array<any>;
    columnsLength:number = 0;
    data:Array<any>;
    constructor() {}
}