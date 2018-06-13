import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FbdbService } from '../../../services/firebase/database/fbdb.service';
import { Project } from '../../../models/project';
import { DomSanitizer } from '@angular/platform-browser';
import { Token } from '../../../models/token';
import { Crowsale } from '../../../models/crowsale';
import { EthService } from '../../../services/ethereum/eth.service';
import { AuthService } from '../../../services/firebase/authentication/auth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  video: any;
  token: Token;
  crowsale: Crowsale;
  loading: boolean;
  value: number;
  constructor(private sanitizer: DomSanitizer, private _route: ActivatedRoute, private _db: FbdbService,
    private _eth: EthService, private _auth: AuthService, private _router: Router, public toastr: ToastsManager,
    public vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    /**
     * Soliciata un proyecto que le llega por la ruta
     */
    this.loading = true;
    this._db.getProject(this._route.snapshot.paramMap.get('key')).subscribe(project => {
      this.project = project;
      this.video = this.transform(project.urlvideo);
      this.getToken(project.idToken);
      this.getCrowsale(project.idCrowsale);
      this.loading = false;
    });
  }

  /**
   * Transforma la url para que permita reproducirlo
   * @param url url del video
   */
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Solicita el token del proyecto
   * @param idToken id Token
   */
  getToken(idToken: string) {
    this.loading = true;
    this._db.getTokenByKey(idToken).subscribe(token => this.token = token);
    this.loading = false;
  }

  /**
   * Solicita el crowsale del proyecto
   * @param idCrowsale id Crowsale
   */
  getCrowsale(idCrowsale: string) {
    this.loading = true;
    this._db.getCrowsaleByKey(idCrowsale).subscribe(crowsale => this.crowsale = crowsale);
    this.loading = false;
  }

  /**
   * Invertir en un contrato de crowsale
   * @param address Crowsale.contractAddess
   */
  invest(address: string, value: number) {
    console.log('crow', address);
    console.log('value', value);
    if (address !== undefined && value >= this.project.cantidadmin) {
      if (this._comprobarAutentificacion() && this._comprobarNetwork()) {
        this._eth.invest(address, value)
        .then((res) => {
          if (res) {
            console.log('respuesta invest', res);
            this.toastr.success('SUCCSESSFUL INVEST', 'Success!');
            this._almacenarDatosInversion(value, res.toString());
          }
        })
        .catch((err) => {
          console.log('err invest', err);
          this.toastr.error('INVEST ERROR', 'ERROR!');
        });
      }
    } else {
      this.toastr.warning('Enter a larger amount', 'WARNIG!');
    }
  }

  /**
   * Comprueba que el usuario este logeado
   */
  _comprobarAutentificacion(): boolean {
    if (this._auth.user === undefined) {
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }

  /**
   * Comprueba que esta conectado a la red ethereum y se lo
   * notifica al usuario
   */
  _comprobarNetwork(): boolean {
    this._eth.startEthService();
    const res = this._eth.result;
    switch (res) {
      case '1':
        this.toastr.success('This is mainnet', 'Success!');
        return true;
      case '2':
        this.toastr.success('This is the deprecated Morden test network.', 'Success!');
        return true;
      case '3':
        this.toastr.success('This is the ropsten test network.', 'Success!');
        return true;
      case '4':
        this.toastr.success('This is the Rinkeby test network.', 'Success!');
        return true;
      case '42':
        this.toastr.success('This is the Kovan test network.', 'Success!');
        return true;
      case 'error':
        this.toastr.error('Please use a dapp browser like mist or MetaMask plugin for chrome', 'Error!');
        return false;
      default:
        this.toastr.warning('This is an unknown network.', 'Warning!');
        return false;
    }
  }

  /**
   * Almacenar en firebase los datos de la inversion
   * @param value canidad
   * @param res transaction hash
   */
  _almacenarDatosInversion(value: number, res: string) {
    this._auth.user.subscribe((user) => {
      this._db.addInvest(user.uid, this.project.key, value, res)
      .then((response) => {
        console.log('respuesta almacenar datos inversion', response);
      });
    });
  }
}
