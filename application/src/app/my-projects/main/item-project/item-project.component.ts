import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { Project } from '../../../models/project';
import { EthService } from '../../../services/ethereum/eth.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
  selector: 'app-item-project',
  templateUrl: './item-project.component.html',
  styleUrls: ['./item-project.component.css']
})
export class ItemProjectComponent implements OnInit {
  @Input() project: Project;
  estado: boolean;
  constructor(private _eth: EthService, public toastr: ToastsManager, public vcr: ViewContainerRef) {
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
  edit() {
  }

  deploy() {
   if (this.comprobarDespliegue()) {
    this.toastr.warning('Wait one minute, please, token is deploying', 'Warning!');
    this._eth.desplegar(this.project)
    .then((res) => {
      console.log(res);
      this.toastr.success('Contract mined! address: '
      + res.address
      + ' transactionHash: '
      + res.transactionHash, 'Success!');
    });
   }
  }

  remove() {}

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
