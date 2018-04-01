import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyProjectsRoutingModule } from './my-projects-routing.module';
import { MyProjectsComponent } from './my-projects.component';
import { NavComponent } from './header/nav/nav.component';
import { ProjectsComponent } from './main/projects/projects.component';
import { ItemProjectComponent } from './main/item-project/item-project.component';

@NgModule({
  imports: [
    CommonModule,
    MyProjectsRoutingModule,
    NgbModule.forRoot()
  ],
  declarations: [MyProjectsComponent, NavComponent, ProjectsComponent, ItemProjectComponent]
})
export class MyProjectsModule { }
