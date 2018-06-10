import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Project } from '../../../models/project';
import { EthService } from '../../../services/ethereum/eth.service';
import { ToastsManager } from 'ng2-toastr';
import { FbdbService } from '../../../services/firebase/database/fbdb.service';
import { Token } from '../../../models/token';
import { Crowsale } from '../../../models/crowsale';

@Component({
  selector: 'app-item-project',
  templateUrl: './item-project.component.html',
  styleUrls: ['./item-project.component.css']
})
export class ItemProjectComponent implements OnInit {
  @Input() project: Project;
  estado: boolean;
  constructor(private _db: FbdbService, private _eth: EthService,
    public toastr: ToastsManager, public vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.comprobarEstado();
  }

  comprobarEstado() {
    if (this.project.estado === 'CREATED') {
      this.estado = true;
    } else {
      this.estado = false;
    }
  }

  /**
   * Inicia el proceso de despliegue de contratos.
   */
  initDeploy() {
    if (this.comprobarDespliegue()) {
      this._db.getTokenByKey(this.project.idToken).subscribe(token => {
        this._deployToken(token);
      });
    }
  }

  _deployToken(token: Token) {
    this._eth.deployToken(token)
      .then((res) => {
        this.toastr.success('Contract Token mined! address: '
          + res.address
          , 'Success!');
        this.initDeployCrowsale(res.address);
      });
  }

  /**
   * Inicia el proceso de despliegue de un crowsale.
   * @param tokenAddres
   */
  initDeployCrowsale(tokenAddres: string) {
    this._db.getCrowsaleByKey(this.project.idCrowsale).subscribe(crowsale => {
      this._deployCrowsale(crowsale, tokenAddres);
    });
  }

  /**
   * Despliega un Crowsale
   * @param crowsale
   * @param tokenAddres
   */
  _deployCrowsale(crowsale: Crowsale, tokenAddres: string) {
    this._eth.desployCrowsale(crowsale, tokenAddres)
      .then((res) => {
        this.toastr.success('Contract Crowsale mined! address: '
          + res.address
          , 'Success!');
        this.saveAllData(tokenAddres, res.address);
      });
  }

  /**
   * Almacena los datos del despliegue en firebase
   * @param tokenAddress
   * @param crowsaleAddress
   */
  saveAllData(tokenAddress, crowsaleAddress) {
    this._db.saveDeployToken(this.project.idToken, tokenAddress);
    this._db.saveDeployCrowsale(this.project.idCrowsale, crowsaleAddress);
    this._db.updateEstadoProject(this.project.key);
  }
  /**
   * Borra un proyecto
   */
  remove() {
    this._db.removeProject(this.project);
  }

  /**
   * Comprueba que esta conectado a la red ethereum y se lo
   * notifica al usuario
   */
  comprobarDespliegue() {
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
}
