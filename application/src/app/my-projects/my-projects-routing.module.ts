import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProjectsComponent} from './my-projects.component';
import { ProjectsComponent } from './main/projects/projects.component';
import { MyprojectDetailComponent } from './main/myproject-detail/myproject-detail.component';
import { CreateNewProjectComponent } from './main/create-new-project/create-new-project.component';
const routes: Routes = [
  {path: '',
  component: MyProjectsComponent,
  children: [
    {path: 'myprojects', component: ProjectsComponent},
    {path: 'create-new-project', component: CreateNewProjectComponent},
    {path: ':key', component: MyprojectDetailComponent},
    {path: '', component: ProjectsComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProjectsRoutingModule { }
