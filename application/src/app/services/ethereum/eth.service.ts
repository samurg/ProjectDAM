import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
declare let window: any;
@Injectable()
export class EthService {
  private _web3: any;
  constructor() {
    if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);

      if (this._web3.version.network !== '4') {
        alert('Please connect to the Rinkeby network');
      }
    } else {
      console.warn(
        'Please use a dapp browser like mist or MetaMask plugin for chrome'
      );
    }
   }

}
