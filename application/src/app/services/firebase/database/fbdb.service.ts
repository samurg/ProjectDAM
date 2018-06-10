import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Project } from '../../../models/project';
import { forEach } from '@firebase/util';
import * as firebase from 'firebase/app';
import { User } from '../../../models/user';
import { Token } from '../../../models/token';
import { Crowsale } from '../../../models/crowsale';

@Injectable()
export class FbdbService {
  proyectosRef: AngularFireList<any>;
  numusuarios = this.fire.database.ref('/numusuarios');
  listausuarios = this.fire.list('/usuarios');
  projects: Project[];
  filterProject = 'all';
  tokenRef = this.fire.list('/tokens');
  crowsaleRef = this.fire.list('/crowsales');
  proyectousuario = this.fire.list('proyectousuario');
  constructor(private fire: AngularFireDatabase) {
    this.proyectosRef = this.fire.list('/proyectos');
  }

  getAllProjects(): Observable<Project[]> {
    return this.proyectosRef.snapshotChanges().map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  getProjectsByEstado(estado: string): Observable<Project[]> {
    const lista = this.fire.list('/proyectos', ref => ref.orderByChild('estado').equalTo(estado));
    return lista.snapshotChanges().map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
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

  getRefUserProjects(uid: string): Observable<any[]> {
    const userRef = this.fire.list(`proyectousuario/${uid}`);
    return userRef.snapshotChanges().map(p => {
     return p.map(c => ({ key: c.payload.key }));
    });
  }

  getUserProjects(uid: string) {
    this.projects = [];
    this.getRefUserProjects(uid).forEach(ref => {
       ref.forEach(r => {
         this.getProject(r.key).subscribe(p => {
          this.projects.push(p);
         });
      });
    });
  }

  getProject(key: string): Observable<Project> {
    return this.fire.object(`proyectos/${key}`).snapshotChanges().map(p => {
      return {key: p.payload.key, ...p.payload.val()};
   });
  }

  setFilterProjects(filter: string) {
    this.filterProject = filter;
  }

  addProyecto(user: string, title: string, subtitle: string,
    description: string, image: string, video: string,
    uidToken: string, uidCrowsale, cantidadmin: number, recompensa: string): string {
    const promise =  this.proyectosRef.push({
      idUser: user, titulo: title, subtitulo: subtitle,
      description: description, imagen: image, urlvideo: video,
      idCrowsale: uidCrowsale, idToken: uidToken, estado: 'CREATED',
      cantidadmin: cantidadmin, recompensa: recompensa});
    return promise.key;
  }

  addToken(user: string, initialSupply: number, tokenName: string, tokenSymbol: string) {
    const promise = this.tokenRef.push({user: user, initialSupply: initialSupply,
      tokenName: tokenName, tokenSymbol: tokenSymbol, contractAddress: ''});
      return promise.key;
  }

  getTokenByKey(uidToken: string): Observable<Token> {
    return this.fire.object(`tokens/${uidToken}`).snapshotChanges().map(p => {
      return {key: p.payload.key, ...p.payload.val()};
    });
  }
  saveDeployToken(uidToken: string, contracAddress: string) {
    this.fire.object(`tokens/${uidToken}`).update({contractAddress: contracAddress});
  }

  getCrowsaleByKey(uidCrowsale: string): Observable<Crowsale> {
    return this.fire.object(`crowsales/${uidCrowsale}`).snapshotChanges().map(p => {
      return {key: p.payload.key, ...p.payload.val()};
    });
  }

  addCrowsale(user: string, fundingGoalInEthers: number, durationInMinutes: number,
    etherCostOfEachToken: number): string {
      const promise = this.crowsaleRef.push({user: user, fundingGoalInEthers: fundingGoalInEthers,
        durationInMinutes: durationInMinutes, etherCostOfEachToken: etherCostOfEachToken, contractAddress: ''});
        return promise.key;
  }

  saveDeployCrowsale(uidCrowsale: string, contracAddress: string) {
    this.fire.object(`crowsales/${uidCrowsale}`).update({contractAddress: contracAddress});
  }

  updateEstadoProject(key: string) {
    this.fire.object(`proyectos/${key}`).update({estado: 'DEPLOYED'});
  }

  addUserProject(uid: string, projectKey: string) {
    const userRef = this.fire.list(`proyectousuario/${uid}`);
    userRef.set(projectKey, {projectKey: true});
  }

  removeProject(project: Project) {
    this.removeProyectoUsuario(project)
    .then(_ => {
      this._removeProject(project)
      .then((res) => {
        this._removeToken(project);
        this._removeCrowsale(project);
      });
    })
    .catch(err => console.log(err, 'Remove project error'));
  }

  removeProyectoUsuario(project: Project) {
    return this.fire.object(`proyectousuario/${project.idUser}/${project.key}`).remove();
  }

  _removeProject(project: Project) {
    return this.fire.object(`proyectos/${project.key}`).remove();
  }
  _removeToken(project: Project) {
    return this.fire.object(`tokens/${project.idToken}`).remove();
  }
  _removeCrowsale(project: Project) {
    return this.fire.object(`crowsales/${project.idCrowsale}`).remove();
  }
}
