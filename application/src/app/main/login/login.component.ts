import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/firebase/authentication/auth.service';
import { Router } from '@angular/router';
import { AngularFireList } from 'angularfire2/database';
import { FbdbService } from '../../services/firebase/database/fbdb.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbTabsetConfig]
})
export class LoginComponent implements OnInit {
  disable: boolean;
  email: string;
  email1: string;
  password: string;
  username: string;
  password1: string;
  password2: string;
  address: string;
  public listausuarios: AngularFireList<any>;
  constructor(public authService: AuthService, config: NgbTabsetConfig, private router: Router, private _db: FbdbService) {
    this.listausuarios = this._db.listausuarios;
    this.disable = false;
   }

  ngOnInit() {
    /*this.authService.user.subscribe( u => u.getIdToken().then(_ => this.router.navigate(['/projects']))
    .catch(err => console.log(err, 'no pasas!')));*/
    /*this.showSuccess();*/
  }

  signup() {
    if (this.password1 === this.password2) {
      this.authService.signup(this.email1, this.password);
      this.email1 = this.password1 = '';
    }
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }
}
