import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { Observable } from 'rxjs/observable';

declare let window: any;

@Injectable()
export class EthService {
  private _web3: Web3;
  private _account: string = null;
  public result: string;
  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);
      this._web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case '1':
            console.log('This is mainnet');
            break;
          case '2':
            console.log('This is the deprecated Morden test network.');
            break;
          case '3':
            console.log('This is the ropsten test network.');
            break;
          case '3':
            console.log('This is the Rinkeby test network.');
            break;
          case '42':
            console.log('This is the Kovan test network.');
            break;
          default:
            console.log('This is an unknown network.');
        }
      });
    } else {
      console.warn(
        'Please use a dapp browser like mist or MetaMask plugin for chrome'
      );
    }
    this._account = this._web3.eth.accounts[0];
    console.log(this._account);
    this.getBalance();
    console.log(this._web3.fromWei(this.result, 'ether'));
    console.log(this._web3.fromWei('10000000000000000', 'ether'));
   }

   public startEthService() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);
      this._web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case '1':
            console.log('This is mainnet');
            break;
          case '2':
            console.log('This is the deprecated Morden test network.');
            break;
          case '3':
            console.log('This is the ropsten test network.');
            break;
          case '3':
            console.log('This is the Rinkeby test network.');
            break;
          case '42':
            console.log('This is the Kovan test network.');
            break;
          default:
            console.log('This is an unknown network.');
        }
      });
    } else {
      console.warn(
        'Please use a dapp browser like mist or MetaMask plugin for chrome'
      );
    }
    this._account = this._web3.eth.accounts[0];
    console.log(this._account);
    this.getBalance();
    console.log(this._web3.fromWei(this.result, 'ether'));
    console.log(this._web3.fromWei('10000000000000000', 'ether'));
   }

   private getBalance() {
    const coinbase = this._web3.eth.coinbase;
    const balance = this._web3.eth.getBalance(coinbase, function(err, res) {
      if (!err) {
        console.log(JSON.stringify(res));
        this.result = JSON.stringify(res);
      } else {
        console.log(err);
      }
    });
   }
}
