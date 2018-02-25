import { SimpleStorageContract } from 'contracts/simple-storage-contract';

declare var web3;
const Eth = require('ethjs-query');
const EthContract = require('ethjs-contract');


export class SimpleStorageWrapper {
    private eth: any;
    private storage: any;

    constructor() {
        this.eth = new Eth(web3.currentProvider);
        this.storage = SimpleStorageContract.getContract(this.eth);
    }

    public getValue(): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            this.storage.get().then((value) => resolve(parseInt(value['0'], 10))).catch(() => reject());
        });
    }

    public setValue(value: number): Promise<void> {
        return new Promise((resolve, reject) => {
            this.storage.set(value, {'from': web3.eth.accounts[0]}).then(txHash => {
                this.waitTransaction(txHash).then(() => resolve()).catch(() => reject());
            }).catch(() => reject()) ;
        });
    }

    private waitTransaction(txHash: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.getTransactionReceipt(txHash, resolve, (err) => reject());
        });
    }

    private getTransactionReceipt(txHash: string, success: () => void, error: (err: any) => void) {
        try {
            this.eth.getTransactionReceipt(txHash, (receiptError, receipt) => {
                if (receiptError) {
                    error(receiptError);
                } else if (receipt) {
                    success();
                } else {
                    this.getTransactionReceipt(txHash, success, error);
                }
            });
        } catch (err) {
            error(err);
        }
    }
}
