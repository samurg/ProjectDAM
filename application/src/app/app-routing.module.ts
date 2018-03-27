import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './main/projects/projects/projects.component';

const appRoutes =  [
  {path: '', component: ProjectsComponent},
  {path: 'projects', component: ProjectsComponent},
  { path: '**', component: ProjectsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
