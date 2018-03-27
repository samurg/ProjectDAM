import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FbdbService {
  proyectosRef: AngularFireList<any>;
  constructor(private fire: AngularFireDatabase) {
    this.proyectosRef = this.fire.list('/proyectos');
  }

  getAllProjects(): Observable<any[]> {
    return this.proyectosRef.snapshotChanges().map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

}
