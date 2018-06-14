import { Injectable } from '@angular/core';
import * as Web3 from 'web3';
import { Token } from '../../models/token';
import { Crowsale } from '../../models/crowsale';

/**  Navegador */
declare var window: any;
// tslint:disable-next-line:max-line-length
const abiCrowsale = [{ 'constant': false, 'inputs': [], 'name': 'checkGoalReached', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'deadline', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'beneficiary', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'tokenReward', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': '', 'type': 'address' }], 'name': 'balanceOf', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'fundingGoal', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'amountRaised', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'price', 'outputs': [{ 'name': '', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': false, 'inputs': [], 'name': 'safeWithdrawal', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'inputs': [{ 'name': 'ifSuccessfulSendTo', 'type': 'address' }, { 'name': 'fundingGoalInEthers', 'type': 'uint256' }, { 'name': 'durationInMinutes', 'type': 'uint256' }, { 'name': 'etherCostOfEachToken', 'type': 'uint256' }, { 'name': 'addressOfTokenUsedAsReward', 'type': 'address' }], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'payable': true, 'stateMutability': 'payable', 'type': 'fallback' }, { 'anonymous': false, 'inputs': [{ 'indexed': false, 'name': 'recipient', 'type': 'address' }, { 'indexed': false, 'name': 'totalAmountRaised', 'type': 'uint256' }], 'name': 'GoalReached', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': false, 'name': 'backer', 'type': 'address' }, { 'indexed': false, 'name': 'amount', 'type': 'uint256' }, { 'indexed': false, 'name': 'isContribution', 'type': 'bool' }], 'name': 'FundTransfer', 'type': 'event' }];

@Injectable()
export class EthService {
  public _web3: Web3;
  public result: string; /** Network */

  constructor() {
  }

  public startEthService() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);
      this._web3.version.getNetwork((err, netId) => {
        this.result = netId;
      });
    } else {
      this.result = 'error';
    }
  }

  /*private getBalance() {
    const coinbase = this._web3.eth.coinbase;
    const balance = this._web3.eth.getBalance(coinbase, function (err, res) {
      if (!err) {
        console.log(JSON.stringify(res));
        this.result = JSON.stringify(res);
      } else {
        console.log(err);
      }
    });
  }*/

  /**
   * Despliega un token en la network actual y retorna una Promise con el contrato
   * @param token Token
   */
  public deployToken(token: Token): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      const initialSupply = token.initialSupply;
      const tokenName = token.tokenName;
      const tokenSymbol = token.tokenSymbol;
      // tslint:disable-next-line:whitespace max-line-length
      const tokenerc20Contract = this._web3.eth.contract([{'constant':true,'inputs':[],'name':'name','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'totalSupply','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_from','type':'address'},{'name':'_to','type':'address'},{'name':'_value','type':'uint256'}],'name':'transferFrom','outputs':[{'name':'success','type':'bool'}],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'decimals','outputs':[{'name':'','type':'uint8'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'balanceOf','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'symbol','outputs':[{'name':'','type':'string'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[{'name':'_to','type':'address'},{'name':'_value','type':'uint256'}],'name':'transfer','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'inputs':[{'name':'initialSupply','type':'uint256'},{'name':'tokenName','type':'string'},{'name':'tokenSymbol','type':'string'}],'payable':false,'stateMutability':'nonpayable','type':'constructor'},{'anonymous':false,'inputs':[{'indexed':true,'name':'from','type':'address'},{'indexed':true,'name':'to','type':'address'},{'indexed':false,'name':'value','type':'uint256'}],'name':'Transfer','type':'event'}]);
      const tokenerc20 = tokenerc20Contract.new(
         initialSupply,
         tokenName,
         tokenSymbol,
         {
           from: this._web3.eth.accounts[0],
           // tslint:disable-next-line:max-line-length
           data: '0x60806040526012600260006101000a81548160ff021916908360ff16021790555034801561002c57600080fd5b506040516109d13803806109d1833981018060405281019080805190602001909291908051820192919060200180518201929190505050600260009054906101000a900460ff1660ff16600a0a8302600381905550600354600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600090805190602001906100dd9291906100fd565b5080600190805190602001906100f49291906100fd565b505050506101a2565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061013e57805160ff191683800117855561016c565b8280016001018555821561016c579182015b8281111561016b578251825591602001919060010190610150565b5b509050610179919061017d565b5090565b61019f91905b8082111561019b576000816000905550600101610183565b5090565b90565b610820806101b16000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde031461008857806318160ddd1461011857806323b872dd14610143578063313ce567146101c857806370a08231146101f957806395d89b4114610250578063a9059cbb146102e0575b600080fd5b34801561009457600080fd5b5061009d61032d565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156100dd5780820151818401526020810190506100c2565b50505050905090810190601f16801561010a5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34801561012457600080fd5b5061012d6103cb565b6040518082815260200191505060405180910390f35b34801561014f57600080fd5b506101ae600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506103d1565b604051808215151515815260200191505060405180910390f35b3480156101d457600080fd5b506101dd610405565b604051808260ff1660ff16815260200191505060405180910390f35b34801561020557600080fd5b5061023a600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610418565b6040518082815260200191505060405180910390f35b34801561025c57600080fd5b50610265610430565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102a557808201518184015260208101905061028a565b50505050905090810190601f1680156102d25780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156102ec57600080fd5b5061032b600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190803590602001909291905050506104ce565b005b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c35780601f10610398576101008083540402835291602001916103c3565b820191906000526020600020905b8154815290600101906020018083116103a657829003601f168201915b505050505081565b60035481565b600080600260009054906101000a900460ff1660ff16600a0a830290506103f98585836104dd565b60019150509392505050565b600260009054906101000a900460ff1681565b60046020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104c65780601f1061049b576101008083540402835291602001916104c6565b820191906000526020600020905b8154815290600101906020018083116104a957829003601f168201915b505050505081565b6104d93383836104dd565b5050565b6000808373ffffffffffffffffffffffffffffffffffffffff161415151561050457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561055257600080fd5b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401101515156105e157600080fd5b600460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205401905081600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a380600460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054600460008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054011415156107ee57fe5b505050505600a165627a7a7230582003831a0a8a8efda674122fab95da26a475d772fb52789ec55e95505c440a795e0029',
           gas: '4700000'
        }, function (e, contract) {
          if (typeof contract.address !== 'undefined') {
            resolve(contract);
          }
        });
    });
    return promise;
  }

  /**
   * Despliega un Crowsale y retorna una promise con el contrato
   * @param crowsale Crowsale
   * @param tokenAddres direccion del Token
   */
  public desployCrowsale(crowsale: Crowsale, tokenAddres: string): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    const promise = new Promise((resolve, reject) => {
      const ifSuccessfulSendTo = this._web3.eth.accounts[0];
      const fundingGoalInEthers = crowsale.fundingGoalInEthers ;
      const durationInMinutes = crowsale.fundingGoalInEthers;
      const etherCostOfEachToken = crowsale.etherCostOfEachToken;
      const addressOfTokenUsedAsReward = tokenAddres;
      // tslint:disable-next-line:whitespace max-line-length
      const crowdsaleContract = this._web3.eth.contract([{'constant':false,'inputs':[],'name':'checkGoalReached','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'constant':true,'inputs':[],'name':'deadline','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'beneficiary','outputs':[{'name':'','type':'address'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'tokenReward','outputs':[{'name':'','type':'address'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[{'name':'','type':'address'}],'name':'balanceOf','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'fundingGoal','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'amountRaised','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':true,'inputs':[],'name':'price','outputs':[{'name':'','type':'uint256'}],'payable':false,'stateMutability':'view','type':'function'},{'constant':false,'inputs':[],'name':'safeWithdrawal','outputs':[],'payable':false,'stateMutability':'nonpayable','type':'function'},{'inputs':[{'name':'ifSuccessfulSendTo','type':'address'},{'name':'fundingGoalInEthers','type':'uint256'},{'name':'durationInMinutes','type':'uint256'},{'name':'etherCostOfEachToken','type':'uint256'},{'name':'addressOfTokenUsedAsReward','type':'address'}],'payable':false,'stateMutability':'nonpayable','type':'constructor'},{'payable':true,'stateMutability':'payable','type':'fallback'},{'anonymous':false,'inputs':[{'indexed':false,'name':'recipient','type':'address'},{'indexed':false,'name':'totalAmountRaised','type':'uint256'}],'name':'GoalReached','type':'event'},{'anonymous':false,'inputs':[{'indexed':false,'name':'backer','type':'address'},{'indexed':false,'name':'amount','type':'uint256'},{'indexed':false,'name':'isContribution','type':'bool'}],'name':'FundTransfer','type':'event'}]);
      const crowdsale = crowdsaleContract.new(
         ifSuccessfulSendTo,
         fundingGoalInEthers,
         durationInMinutes,
         etherCostOfEachToken,
         addressOfTokenUsedAsReward,
         {
           from: this._web3.eth.accounts[0],
           // tslint:disable-next-line:max-line-length
           data: '0x60806040526000600760006101000a81548160ff0219169083151502179055506000600760016101000a81548160ff02191690831515021790555034801561004657600080fd5b5060405160a080610ac78339810180604052810190808051906020019092919080519060200190929190805190602001909291908051906020019092919080519060200190929190505050846000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550670de0b6b3a76400008402600181905550603c83024201600381905550670de0b6b3a7640000820260048190555080600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050505050610973806101546000396000f300608060405260043610610099576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806301cb3b20146102d157806329dcb0cf146102e857806338af3eed146103135780636e66f6e91461036a57806370a08231146103c15780637a3a0e84146104185780637b3e5e7b14610443578063a035b1fe1461046e578063fd6b7ef814610499575b6000600760019054906101000a900460ff161515156100b757600080fd5b34905080600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555080600260008282540192505081905550600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16336004548581151561018557fe5b046040518463ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019350505050600060405180830381600087803b15801561023e57600080fd5b505af1158015610252573d6000803e3d6000fd5b505050507fe842aea7a5f1b01049d752008c53c52890b1a6daf660cf39e8eec506112bbdf633826001604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182151515158152602001935050505060405180910390a150005b3480156102dd57600080fd5b506102e66104b0565b005b3480156102f457600080fd5b506102fd610590565b6040518082815260200191505060405180910390f35b34801561031f57600080fd5b50610328610596565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561037657600080fd5b5061037f6105bb565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156103cd57600080fd5b50610402600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506105e1565b6040518082815260200191505060405180910390f35b34801561042457600080fd5b5061042d6105f9565b6040518082815260200191505060405180910390f35b34801561044f57600080fd5b506104586105ff565b6040518082815260200191505060405180910390f35b34801561047a57600080fd5b50610483610605565b6040518082815260200191505060405180910390f35b3480156104a557600080fd5b506104ae61060b565b005b6003544210151561058e57600154600254101515610572576001600760006101000a81548160ff0219169083151502179055507fec3f991caf7857d61663fd1bba1739e04abd4781238508cde554bb849d790c856000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600254604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a15b6001600760016101000a81548160ff0219169083151502179055505b565b60035481565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60066020528060005260406000206000915090505481565b60015481565b60025481565b60045481565b60006003544210151561094457600760009054906101000a900460ff1615156107bc57600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060008111156107bb573373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015610775577fe842aea7a5f1b01049d752008c53c52890b1a6daf660cf39e8eec506112bbdf633826000604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182151515158152602001935050505060405180910390a16107ba565b80600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b5b5b600760009054906101000a900460ff16801561082457503373ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16145b15610943576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6002549081150290604051600060405180830381858888f1935050505015610926577fe842aea7a5f1b01049d752008c53c52890b1a6daf660cf39e8eec506112bbdf66000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff166002546000604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200183815260200182151515158152602001935050505060405180910390a1610942565b6000600760006101000a81548160ff0219169083151502179055505b5b5b505600a165627a7a723058200a6e1fcb60935617d76b912bf0530c50a3a8287640067e85ca8a97fdf39680c20029',
           gas: '4700000'
        }, function (e, contract) {
          if (typeof contract.address !== 'undefined') {
              resolve(contract);
            }
        });
    });
    return promise;
  }

  /**
   * Enlaza con un contrato crowsale para depositar fondos.
   *
   * @param address direccion del contrato a llamar
   */
  invest(address: string, value: number) {
    const promise = new Promise((resolve, reject) => {
      const cantidad = this._web3.toWei(value, 'ether');
      console.log('cantidad', cantidad);
      console.log('en promesa');
      const MyContract = this._web3.eth.contract(abiCrowsale);
      console.log('MyContract', MyContract);
      const myContractInstance = MyContract.at(address);
      console.log('instance', myContractInstance);

      this._web3.eth.sendTransaction({
        from: this._web3.eth.accounts[0],
        to: address,
        value: cantidad
    },
      function(err, res) {
        if (res) {
          resolve(res);
        }
        if (err) {
          reject();
        }
      });
    });
    return promise;
  }
}
