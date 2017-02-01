import { Component, Input, Output, forwardRef, ViewChildren, AfterViewInit, EventEmitter, OnInit } from '@angular/core';

import { PaginationInstance } from 'ng2-pagination';

import { IDatatables, DatatablesModel, OrderBy, Filter, Debug, Object } from './index'; 
@Component({
    moduleId:module.id,
    selector:'datatables-iqs',
    templateUrl : './template1.html'
})
export class DatatablesComponent implements AfterViewInit, OnInit {
    @ViewChildren('dataDt') filteredData:Array<any>;
    @Input() public cfg:IDatatables;
    @Output() onClickActions = new EventEmitter<any>();
    order:any = {};
    filters:any[] = [];
    countData:any = 0;
    countCols:number = 0;

    public filter: string = '';
    public maxSize: number = 7;
    public directionLinks: boolean = true;
    public autoHide: boolean = false;
    public configPagination: PaginationInstance = {
        id: 'advanced',
        itemsPerPage: 10,
        currentPage: 1
    };
    constructor() {
        this.order = this._getOrderStorage();
    }
    ngAfterViewInit() {
        this.countData = (this.cfg!==null && typeof this.cfg.data!=='undefined') ? this.cfg.data.length : 0;
    }
    ngOnInit() {
        this.countCols = (this.cfg!==null && typeof this.cfg.columns!=='undefined') ? this.cfg.columns.length : 0;
    }
    setOrder(e:any, field:string) {
        var order = this._getOrderStorage();
        var asc = true;
        if(order.field === field) {
            asc = (order.asc)? false :true;
        }
        this.order = {field:field,asc:asc};
        localStorage.setItem('ooppDt',JSON.stringify(this.order));
    }

    onClickAction(e:any, id:any, items:any, name:string) {
        this.onClickActions.emit({e, id, items, name});
    }

    filterText(e:any, field:string, type:any = null) {
        this.countData = this.filteredData.length;
        var filters = this._hasFilter(field); // retorna la posicion en el array del filtro
        if(e.target.value!=='') {
            if(filters!==null) {
                this.filters[filters] = {field:field, query:e.target.value, type:type};
            }else {
                this.filters.push({field:field, query:e.target.value, type:type});
            }
        }else {
            this.filters[filters].query = '';
        }
    }

    private _hasFilter(field:string) {
        var result:any = null;
        this.filters.forEach((e, i) => {
            if(e.field === field) {
                result = i;
            }
        });
        return result;
    }
    private _getOrderStorage() {
        var orderDb = localStorage.getItem('ooppDt');
        if(orderDb!==null) {
            return JSON.parse(orderDb);
        }
        return {field:'creationDate', asc:false};
    }
    private onPageChange(number: number) {
        this.configPagination.currentPage = number;
    }
}
