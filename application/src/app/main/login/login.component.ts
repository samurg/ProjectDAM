import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
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

  email: string;
  email1: string;
  password: string;
  username: string;
  password1: string;
  password2: string;

  constructor(public authService: AuthService, config: NgbTabsetConfig,
    private router: Router, private _db: FbdbService,
    public toastr: ToastsManager, public vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }

  /**
   * Registro por mail y password
   */
  signup() {
    if (this.password1 === this.password2) {
      this.authService.signup(this.email1, this.password1);
      this.username = this.email1 = this.password1 = this.password2 = '';
      this.toastr.success('you are registered', 'Success!');
    } else {
      this.toastr.error('Passwords do not match', 'Error!');
    }
  }

  /**
   * Login por mail y password
   */
  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  /**
   * Login con google
   */
  loginGoogle() {
    this.authService.loginGoogle();
  }
}
