import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './main/projects/projects/projects.component';
import { LoginComponent } from './main/login/login.component';
import { MyProjectsModule} from './my-projects/my-projects.module';

const appRoutes =  [
  {path: '', component: ProjectsComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'myprojects', loadChildren: () => MyProjectsModule},
  {path: '**', component: ProjectsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
