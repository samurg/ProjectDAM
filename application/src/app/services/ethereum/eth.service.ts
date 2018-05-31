import { Injectable, ViewContainerRef } from '@angular/core';
import * as Web3 from 'web3';
import { Observable } from 'rxjs/observable';
import { ToastsManager } from 'ng2-toastr';
import { Project } from '../../models/project';
import { reject } from 'q';
declare var window: any;

@Injectable()
export class EthService {
  public _web3: Web3;
  private _account: string = null;
  public result: string;
  public tokenContractAddress: any;
  public tokenContractTransactionHash: any;
  constructor() {
   }

   public startEthService() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);
      this._web3.version.getNetwork((err, netId) => {
        switch (netId) {
          case '1':
            this.result =   '1';
            break;
          case '2':
            this.result = '2';
            break;
          case '3':
            this.result = '3';
            break;
          case '4':
            this.result = '4';
            break;
          case '42':
            this.result = '42';
            break;
        }
      });
    } else {
      this.result = 'error';
    }
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

   public desplegar(project: Project): Promise<any> {
     // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      const initialSupply = 1000 ;
      const tokenName = 'NombreCOin' ;
      const tokenSymbol = 'C' ;
      const tokenerc20Contract = this._web3.eth.contract(
        [
          {
            'constant': true,
            'inputs': [],
            'name': 'name',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'payable': false,
            'stateMutability': 'view',
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_spender',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'approve',
            'outputs': [
              {
                'name': 'success',
                'type': 'bool'
              }
            ],
            'payable': false,
            'stateMutability': 'nonpayable',
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'totalSupply',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'stateMutability': 'view',
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_from',
                'type': 'address'
              },
              {
                'name': '_to',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'transferFrom',
            'outputs': [
              {
                'name': 'success',
                'type': 'bool'
              }
            ],
            'payable': false,
            'stateMutability': 'nonpayable',
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'decimals',
            'outputs': [
              {
                'name': '',
                'type': 'uint8'
              }
            ],
            'payable': false,
            'stateMutability': 'view',
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'burn',
            'outputs': [
              {
                'name': 'success',
                'type': 'bool'
              }
            ],
            'payable': false,
            'stateMutability': 'nonpayable',
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [
              {
                'name': '',
                'type': 'address'
              }
            ],
            'name': 'balanceOf',
            'outputs': [
              {
                'name': '',
                'type': 'uint256'
              }
            ],
            'payable': false,
            'stateMutability': 'view',
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_from',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'burnFrom',
            'outputs': [
              {
                'name': 'success',
                'type': 'bool'
              }
            ],
            'payable': false,
            'stateMutability': 'nonpayable',
            'type': 'function'
          },
          {
            'constant': true,
            'inputs': [],
            'name': 'symbol',
            'outputs': [
              {
                'name': '',
                'type': 'string'
              }
            ],
            'payable': false,
            'stateMutability': 'view',
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_to',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
              }
            ],
            'name': 'transfer',
            'outputs': [],
            'payable': false,
            'stateMutability': 'nonpayable',
            'type': 'function'
          },
          {
            'constant': false,
            'inputs': [
              {
                'name': '_spender',
                'type': 'address'
              },
              {
                'name': '_value',
                'type': 'uint256'
                },
                {
                  'name': '_extraData',
                  'type': 'bytes'
                }
              ],
              'name': 'approveAndCall',
              'outputs': [
                {
                  'name': 'success',
                  'type': 'bool'
                }
              ],
              'payable': false,
              'stateMutability': 'nonpayable',
              'type': 'function'
            },
            {
              'constant': true,
              'inputs': [
                {
                  'name': '',
                  'type': 'address'
                },
                {
                  'name': '',
                  'type': 'address'
                }
              ],
              'name': 'allowance',
              'outputs': [
                {
                  'name': '',
                  'type': 'uint256'
                }
              ],
              'payable': false,
              'stateMutability': 'view',
              'type': 'function'
            },
            {
              'inputs': [
                {
                  'name': 'initialSupply',
                  'type': 'uint256'
                },
                {
                  'name': 'tokenName',
                  'type': 'string'
                },
                {
                  'name': 'tokenSymbol',
                  'type': 'string'
                }
              ],
              'payable': false,
              'stateMutability': 'nonpayable',
              'type': 'constructor'
            },
            {
              'anonymous': false,
              'inputs': [
                {
                  'indexed': true,
                  'name': 'from',
                  'type': 'address'
                },
                {
                  'indexed': true,
                  'name': 'to',
                  'type': 'address'
                },
                {
                  'indexed': false,
                  'name': 'value',
                  'type': 'uint256'
                }
              ],
              'name': 'Transfer',
              'type': 'event'},
              {
                'anonymous': false,
                'inputs': [
                  {
                    'indexed': true,
                    'name': 'from',
                    'type': 'address'
                  },
                  {
                    'indexed': false,
                    'name': 'value',
                    'type': 'uint256'
                  }
                ],
                'name': 'Burn',
                'type': 'event'
              }
            ]
          );
      const tokenerc20 = tokenerc20Contract.new(
        initialSupply,
        tokenName,
        tokenSymbol,
        {
          from: this._web3.eth.accounts[0],
          data: '0x60806040526012600260006101000a81548160ff021916908360ff1602179055503480156200002d57600080fd5b5060405162'
          + '001298380380620012988339810180604052810190808051906020019092919080518201929190602001805182019291905050506002'
          + '60009054906101000a900460ff1660ff16600a0a8302600381905550600354600460003373ffffffffffffffffffffffffffffffffff'
          + 'ffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600090805190602001'
          + '90620000e292919062000105565b508060019080519060200190620000fb92919062000105565b50505050620001b4565b8280546001'
          + '81600116156101000203166002900490600052602060002090601f016020900481019282601f106200014857805160ff191683800117'
          + '855562000179565b8280016001018555821562000179579182015b82811115620001785782518255916020019190600101906200015b'
          + '565b5b5090506200018891906200018c565b5090565b620001b191905b80821115620001ad5760008160009055506001016200019356'
          + '5b5090565b90565b6110d480620001c46000396000f3006080604052600436106100ba576000357c0100000000000000000000000000'
          + '000000000000000000000000000000900463ffffffff16806306fdde03146100bf578063095ea7b31461014f57806318160ddd146101'
          + 'b457806323b872dd146101df578063313ce5671461026457806342966c681461029557806370a08231146102da57806379cc67901461'
          + '033157806395d89b4114610396578063a9059cbb14610426578063cae9ca5114610473578063dd62ed3e1461051e575b600080fd5b34'
          + '80156100cb57600080fd5b506100d4610595565b60405180806020018281038252838181518152602001915080519060200190808383'
          + '60005b838110156101145780820151818401526020810190506100f9565b50505050905090810190601f168015610141578082038051'
          + '6001836020036101000a031916815260200191505b509250505060405180910390f35b34801561015b57600080fd5b5061019a600480'
          + '360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610633'
          + '565b604051808215151515815260200191505060405180910390f35b3480156101c057600080fd5b506101c96106c0565b6040518082'
          + '815260200191505060405180910390f35b3480156101eb57600080fd5b5061024a600480360381019080803573ffffffffffffffffff'
          + 'ffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff1690602001909291908035'
          + '90602001909291905050506106c6565b604051808215151515815260200191505060405180910390f35b34801561027057600080fd5b'
          + '506102796107f3565b604051808260ff1660ff16815260200191505060405180910390f35b3480156102a157600080fd5b506102c060'
          + '048036038101908080359060200190929190505050610806565b604051808215151515815260200191505060405180910390f35b3480'
          + '156102e657600080fd5b5061031b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291'
          + '9050505061090a565b6040518082815260200191505060405180910390f35b34801561033d57600080fd5b5061037c60048036038101'
          + '9080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190505050610922565b6040'
          + '51808215151515815260200191505060405180910390f35b3480156103a257600080fd5b506103ab610b3c565b604051808060200182'
          + '8103825283818151815260200191508051906020019080838360005b838110156103eb5780820151818401526020810190506103d056'
          + '5b50505050905090810190601f1680156104185780820380516001836020036101000a031916815260200191505b5092505050604051'
          + '80910390f35b34801561043257600080fd5b50610471600480360381019080803573ffffffffffffffffffffffffffffffffffffffff'
          + '16906020019092919080359060200190929190505050610bda565b005b34801561047f57600080fd5b50610504600480360381019080'
          + '803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001908201803590'
          + '602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091'
          + '92919290505050610be9565b604051808215151515815260200191505060405180910390f35b34801561052a57600080fd5b5061057f'
          + '600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffff'
          + 'ffffffffffffffffffff169060200190929190505050610d6c565b6040518082815260200191505060405180910390f35b60008054600'
          + '181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160'
          + '01161561010002031660029004801561062b5780601f106106005761010080835404028352916020019161062b565b820191906000526'
          + '020600020905b81548152906001019060200180831161060e57829003601f168201915b505050505081565b600081600560003373ffff'
          + 'ffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002'
          + '060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081'
          + '52602001600020819055506001905092915050565b60035481565b6000600560008573fffffffffffffffffffffffffffffffffffffff'
          + 'f1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffff'
          + 'ffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020548211151515610753576'
          + '00080fd5b81600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16'
          + '815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673fffffffffffffffffffffffffffff'
          + 'fffffffffff168152602001908152602001600020600082825403925050819055506107e8848484610d91565b60019050939250505056'
          + '5b600260009054906101000a900460ff1681565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673fffffff'
          + 'fffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561085657600080fd5b81600460003373ffffffff'
          + 'ffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392'
          + '505081905550816003600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736'
          + 'cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a260019050919050565b600460205280600052604060002060009'
          + '15090505481565b600081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602'
          // tslint:disable-next-line:max-line-length
          + '001908152602001600020541015151561097257600080fd5b600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482111515156109fd57600080fd5b81600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816003600082825403925050819055508273ffffffffffffffffffffffffffffffffffffffff167fcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5836040518082815260200191505060405180910390a26001905092915050565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bd25780601f10610ba757610100808354040283529160200191610bd2565b820191906000526020600020905b815481529060010190602001808311610bb557829003601f168201915b505050505081565b610be5338383610d91565b5050565b600080849050610bf98585610633565b15610d63578073ffffffffffffffffffffffffffffffffffffffff16638f4ffcb1338630876040518563ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200180602001828103825283818151815260200191508051906020019080838360005b83811015610cf3578082015181840152602081019050610cd8565b50505050905090810190601f168015610d205780820380516001836020036101000a031916815260200191505b5095505050505050600060405180830381600087803b158015610d4257600080fd5b505af1158015610d56573d6000803e3d6000fd5b5050505060019150610d64565b5b509392505050565b6005602052816000526040600020602052806000526040600020600091509150505481565b6000808373ffffffffffffffffffffffffffffffffffffffff1614151515610db857600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610e0657600080fd5b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020540110151515610e9557600080fd5b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401905081600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a380600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054011415156110a257fe5b505050505600a165627a7a72305820de8dfe482c83c274d718104575137811f00c469445bf666b496da752f14fbf850029',
          gas: '4700000'
        }, function (e, contract) {
          console.log(e, contract);
          if (typeof contract.address !== 'undefined') {
              console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
              resolve(contract);
            }
      });
     });
     return promise;
   }
}
