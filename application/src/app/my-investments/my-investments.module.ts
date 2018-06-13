import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInvestmentsRoutingModule } from './my-investments-routing.module';
import { MyInvestmentsComponent } from './my-investments.component';
import { ItemInvestmentComponent } from './item-investment/item-investment.component';

@NgModule({
  imports: [
    CommonModule,
    MyInvestmentsRoutingModule
  ],
  declarations: [
    MyInvestmentsComponent,
    ItemInvestmentComponent
  ]
})
export class MyInvestmentsModule { }
