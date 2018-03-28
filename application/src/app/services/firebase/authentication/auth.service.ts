import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FbdbService } from '../database/fbdb.service';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  constructor(private _db: FbdbService, private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = firebaseAuth.authState;
   }

   signup(email: string, password: string) {
     this.firebaseAuth
     .auth
     .createUserWithEmailAndPassword(email, password)
     .then(value => {
       console.log('Usuario creado!! => ', value);
       console.log('Su id es: ' + value.uid);
       this._db.increaseUsers();
     })
     .catch(err => {
        console.log('Algo ha fallado en singup => ', err.message);
     });
   }

   login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log();
        console.log('Nice, it worked!');
        console.log('ID:' + value.uid);
        this.router.navigate(['/projects']);
      })
      .catch(err => {
        console.log('Algo ha fallado en login => ', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  loginGoogle() {
    const user = this.firebaseAuth
    .auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(value => {
      console.log('Nice, it worked!');
      this.router.navigate(['/projects']);
    })
    .catch(err => {
      console.log('Algo ha fallado en login google=> ', err.message);
    });
  }
}
