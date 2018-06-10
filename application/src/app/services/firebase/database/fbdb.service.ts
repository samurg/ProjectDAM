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

  projects: Project[]; /* Proyectos asociados al usuario actual */
  filterProject = 'all'; /* Filtro de busqueda por defecto */

  /**
   * Enlaces a firebase
   */
  proyectosRef = this.fire.list('/proyectos');
  listausuarios = this.fire.list('/usuarios');
  tokenRef = this.fire.list('/tokens');
  crowsaleRef = this.fire.list('/crowsales');
  proyectousuario = this.fire.list('proyectousuario');

  numusuarios = this.fire.database.ref('/numusuarios');

  constructor(private fire: AngularFireDatabase) {
  }

  /**
   * Retorna todos los proyectos
   */
  getAllProjects(): Observable<Project[]> {
    return this.proyectosRef.snapshotChanges().map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  /**
   * Retorna todos los proyectos segun su estado
   * @param estado (CREATED, DEPLOYED)
   */
  getProjectsByEstado(estado: string): Observable<Project[]> {
    const lista = this.fire.list('/proyectos', ref => ref.orderByChild('estado').equalTo(estado));
    return lista.snapshotChanges().map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  /**
   * Incrementa el numero de usuarios en una unidad
   */
  increaseUsers() {
    this.numusuarios.transaction(function (currentCount) {
      return currentCount + 1;
    }).then(_ => console.log('Incrementado numero de usuarios'))
      .catch(err => console.log(err, 'error! Incrementado numero de usuarios'));
  }

  /**
   * Registrar un usuario
   * @param user Firebase.user
   */
  registerUserFire(user: Observable<firebase.User>) {
    user.subscribe(e =>
      this.listausuarios.set(e.uid, { name: e.displayName, email: e.email, uid: e.uid })
    );
  }

  /**
   * Registra un usuario
   * @param user User
   */
  registerUser(user: User) {
    this.listausuarios.push({ name: user.name, email: user.email, uid: user.uid });
  }

  /**
   * Retorna los datos de un usuario por su uid/key
   *
   * @param uid Clave(uid/key)
   */
  getUserRegistered(uid: string): Observable<User[]> {
    const userRef = this.fire.list(`usuarios/${uid}`);
    return userRef.snapshotChanges().map(p => {
      return p.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  /**
   * Retorna las claves de los proyectos asociados a un usuario
   * @param uid (uid/key) usuario
   */
  getRefUserProjects(uid: string): Observable<any[]> {
    const userRef = this.fire.list(`proyectousuario/${uid}`);
    return userRef.snapshotChanges().map(p => {
      return p.map(c => ({ key: c.payload.key }));
    });
  }

  /**
   * Retorna un proyecto pasandole su id
   * @param key id del proyeto
   */
  getProject(key: string): Observable<Project> {
    return this.fire.object(`proyectos/${key}`).snapshotChanges().map(p => {
      return { key: p.payload.key, ...p.payload.val() };
    });
  }

  /**
   * Almacena todos los proyectos de un usuario
   * @param uid id de usuario
   */
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

  /**
   * Modifica el filtro de busqueda
   * @param filter (created/deployed/all)
   */
  setFilterProjects(filter: string) {
    this.filterProject = filter;
  }

  /**
   * Añade un proyecto y retorna su id
   * @param user
   * @param title
   * @param subtitle
   * @param description
   * @param image
   * @param video
   * @param uidToken
   * @param uidCrowsale
   * @param cantidadmin
   * @param recompensa
   */
  addProyecto(user: string, title: string, subtitle: string,
    description: string, image: string, video: string,
    uidToken: string, uidCrowsale, cantidadmin: number, recompensa: string): string {
    const promise = this.proyectosRef.push({
      idUser: user, titulo: title, subtitulo: subtitle,
      description: description, imagen: image, urlvideo: video,
      idCrowsale: uidCrowsale, idToken: uidToken, estado: 'CREATED',
      cantidadmin: cantidadmin, recompensa: recompensa
    });
    return promise.key;
  }

  /**
   * Añade un token y retorna su id
   * @param user
   * @param initialSupply
   * @param tokenName
   * @param tokenSymbol
   */
  addToken(user: string, initialSupply: number, tokenName: string, tokenSymbol: string) {
    const promise = this.tokenRef.push({
      user: user, initialSupply: initialSupply,
      tokenName: tokenName, tokenSymbol: tokenSymbol, contractAddress: ''
    });
    return promise.key;
  }

  /**
   * Retorna un token pasandole su id
   * @param uidToken id del token
   */
  getTokenByKey(uidToken: string): Observable<Token> {
    return this.fire.object(`tokens/${uidToken}`).snapshotChanges().map(p => {
      return { key: p.payload.key, ...p.payload.val() };
    });
  }

  /**
   * Actualiza la direccion del contrato
   * @param uidToken id Token
   * @param contracAddress direccion del contrato token desplegado
   */
  saveDeployToken(uidToken: string, contracAddress: string) {
    this.fire.object(`tokens/${uidToken}`).update({ contractAddress: contracAddress });
  }

  /**
   * Retorna un Crowsale pasandole su id
   * @param uidCrowsale id Crowsale
   */
  getCrowsaleByKey(uidCrowsale: string): Observable<Crowsale> {
    return this.fire.object(`crowsales/${uidCrowsale}`).snapshotChanges().map(p => {
      return { key: p.payload.key, ...p.payload.val() };
    });
  }

  /**
   * Añade un Crowsale a la base de datos y retorna su id
   *
   * @param user
   * @param fundingGoalInEthers
   * @param durationInMinutes
   * @param etherCostOfEachToken
   */
  addCrowsale(user: string, fundingGoalInEthers: number, durationInMinutes: number,
    etherCostOfEachToken: number): string {
    const promise = this.crowsaleRef.push({
      user: user, fundingGoalInEthers: fundingGoalInEthers,
      durationInMinutes: durationInMinutes, etherCostOfEachToken: etherCostOfEachToken, contractAddress: ''
    });
    return promise.key;
  }

  /**
   * Actualiza la direccion del contrato Crowsale
   * @param uidCrowsale
   * @param contracAddress
   */
  saveDeployCrowsale(uidCrowsale: string, contracAddress: string) {
    this.fire.object(`crowsales/${uidCrowsale}`).update({ contractAddress: contracAddress });
  }

  /**
   * Actualiza el estado de un proyecto a DEPLOYED
   * @param key id proyecto
   */
  updateEstadoProject(key: string) {
    this.fire.object(`proyectos/${key}`).update({ estado: 'DEPLOYED' });
  }

  /**
   * Relaciona un proyecto con su usuario
   * @param uid id usuario
   * @param projectKey id proyecto
   */
  addUserProject(uid: string, projectKey: string) {
    const userRef = this.fire.list(`proyectousuario/${uid}`);
    userRef.set(projectKey, { projectKey: true });
  }

  /**
   * Borra un proyecto junto con:
   * Proyecto, realicion con usuario,
   * token, crowsale.
   *
   * @param project Project
   */
  removeProject(project: Project) {
    this._removeProyectoUsuario(project)
      .then(_ => {
        this._removeProject(project)
          .then((res) => {
            this._removeToken(project);
            this._removeCrowsale(project);
          });
      })
      .catch(err => console.log(err, 'Remove project error'));
  }

  _removeProyectoUsuario(project: Project) {
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
