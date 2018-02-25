declare var web3;
const Eth = require('ethjs-query');
const EthContract = require('ethjs-contract');


export class SimpleStorageContract {
    private static contractAbi = [
      {
        'constant': false,
        'inputs': [
          {
            'name': 'x',
            'type': 'uint256'
          }
        ],
        'name': 'set',
        'outputs': [
        ],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
      },
      {
        'constant': true,
        'inputs': [
        ],
        'name': 'get',
        'outputs': [
          {
            'name': '',
            'type': 'uint256'
          }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
      }
    ];
    private static contractAddress = '0x3E41F2Df95b0617cA1a1E2c0Bb03cE2d5415675E';

    public static getContract(eth: any): any {
        const ethContract = new EthContract(eth)
        return ethContract(this.contractAbi).at(this.contractAddress);
    }

}
