import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInvestmentsRoutingModule } from './my-investments-routing.module';
import { MyInvestmentsComponent } from './my-investments.component';

@NgModule({
  imports: [
    CommonModule,
    MyInvestmentsRoutingModule
  ],
  declarations: [MyInvestmentsComponent]
})
export class MyInvestmentsModule { }
