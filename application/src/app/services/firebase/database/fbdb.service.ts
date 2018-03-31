import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../../models/project';
import { forEach } from '@firebase/util';
import * as firebase from 'firebase/app';
import { User } from '../../../models/user';

@Injectable()
export class FbdbService {
  proyectosRef: AngularFireList<any>;
  numusuarios = this.fire.database.ref('/numusuarios');
  listausuarios = this.fire.list('/usuarios');
  constructor(private fire: AngularFireDatabase) {
    this.proyectosRef = this.fire.list('/proyectos');
  }

  getAllProjects(): Observable<Project[]> {
    return this.proyectosRef.snapshotChanges().map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  a() {
    this.getAllProjects().forEach(element => {
      console.log(element[0]);
    });
  }

  increaseUsers() {
    this.numusuarios.transaction(function(currentCount) {
      return currentCount + 1;
    }).then(_ => console.log('success'))
    .catch(err => console.log(err, 'error!'));
  }

  registerUserFire(user: Observable<firebase.User>) {
    user.subscribe(e =>
      this.listausuarios.set(e.uid, {name: e.displayName, email: e.email, uid: e.uid})
    );
  }

  registerUser(user: User) {
    this.listausuarios.push({name: user.name, email: user.email, uid: user.uid});
  }

  getUserRegistered(uid: string): Observable<User[]> {
    const userRef = this.fire.list(`usuarios/${uid}`);
    return userRef.snapshotChanges().map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
