import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2PaginationModule } from 'ng2-pagination/dist/ng2-pagination';


import { DatatablesComponent, OrderBy, Filter, Object} from './index';

@NgModule({
  imports: [CommonModule ],
  declarations: [DatatablesComponent, OrderBy, Filter, Object],
  exports: [DatatablesComponent]
})
export  class DatatablesModule {
    static forRoot(): ModuleWithProviders{
      return {ngModule: DatatablesModule}
    };
 }







