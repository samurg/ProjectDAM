import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FbdbService } from '../database/fbdb.service';

@Injectable()
export class AuthService {

  /* Usuario actual */
  user: Observable<firebase.User>;

  constructor(private _db: FbdbService, private firebaseAuth: AngularFireAuth, private router: Router) {
    firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.user = firebaseAuth.authState;
      }
    });
  }

  /**
   * Registra un usuario
   * @param email
   * @param password
   */
  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this._db.increaseUsers();
        this.user = this.firebaseAuth.authState;
        this._db.registerUserFire(this.user);
      })
      .catch(err => {
        console.log('Algo ha fallado en singup => ', err.message);
      });
  }

  /**
   * Loguea un usuario
   * @param email
   * @param password
   */
  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.user = this.firebaseAuth.authState;
        this.router.navigate(['/projects']);
      })
      .catch(err => {
        console.log('Algo ha fallado en login => ', err.message);
      });
  }

  /**
   * Realiza el signOut() del usuario actual
   */
  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.user = this.firebaseAuth.authState;
  }

  /**
   * Loguea un usuario con google
   */
  loginGoogle() {
    const user = this.firebaseAuth
      .auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(value => {
        console.log('Nice, it worked!');
        this.user = this.firebaseAuth.authState;
        this.user.subscribe(e => {
          this._db.getUserRegistered(e.uid).forEach(u => {
            if (u.length === 0) {
              this._db.registerUserFire(this.user);
            }
          });
        });
        this.router.navigate(['projects']);
      })
      .catch(err => {
        console.log('Algo ha fallado en login google=> ', err.message);
      });
  }
}
