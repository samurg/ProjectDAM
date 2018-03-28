import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../../models/project';
import { forEach } from '@firebase/util';

@Injectable()
export class FbdbService {
  proyectosRef: AngularFireList<any>;
  constructor(private fire: AngularFireDatabase) {
    this.proyectosRef = this.fire.list('/proyectos');
    this.a();
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
}
