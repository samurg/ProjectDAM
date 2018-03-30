import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProjectsRoutingModule } from './my-projects-routing.module';
import { MyProjectsComponent } from './my-projects.component';

@NgModule({
  imports: [
    CommonModule,
    MyProjectsRoutingModule
  ],
  declarations: [MyProjectsComponent]
})
export class MyProjectsModule { }
