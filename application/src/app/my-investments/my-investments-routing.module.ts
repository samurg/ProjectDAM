import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyInvestmentsComponent } from './my-investments.component';

const routes: Routes = [
  {
    path: '', component: MyInvestmentsComponent,
    children: [
      {path: '', component: MyInvestmentsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyInvestmentsRoutingModule { }
