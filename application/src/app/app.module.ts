import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FbdbService } from '../app/services/firebase/database/fbdb.service';
import { AuthService } from '../app/services/firebase/authentication/auth.service';
import { AppRoutingModule } from './/app-routing.module';
import { NavbarComponent } from './header/navbar/navbar.component';
import { ProjectsComponent } from './main/projects/projects/projects.component';
import { CardProjectComponent } from './main/projects/card-project/card-project.component';
import { LoginComponent } from './main/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProjectsComponent,
    CardProjectComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
    ],
  providers: [FbdbService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
