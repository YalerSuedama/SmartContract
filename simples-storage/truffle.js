require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3();
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');

var kovanPrivateKey = new Buffer(process.env["KOVAN_PRIVATE_KEY"], "hex");
var kovanWallet = Wallet.fromPrivateKey(kovanPrivateKey);
var kovanProvider = new WalletProvider(kovanWallet, "https://kovan.infura.io/");


module.exports = {
  networks: {
    kovan: {
      provider: kovanProvider,
      // You can get the current gasLimit by running
      // truffle deploy --network kovan
      // truffle(kovan)> web3.eth.getBlock("pending", (error, result) =>
      //   console.log(result.gasLimit))
      gas: 4600000,
      gasPrice: web3.toWei("20", "gwei"),
      network_id: "42",
    }
  }
};