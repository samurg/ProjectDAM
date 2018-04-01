import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyProjectsComponent} from './my-projects.component';
import { ProjectsComponent } from './main/projects/projects.component';
const routes: Routes = [
  {path: '',
  component: MyProjectsComponent,
  children: [
    {path: '', component: ProjectsComponent},
    {path: 'projects', component: ProjectsComponent}
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProjectsRoutingModule { }
