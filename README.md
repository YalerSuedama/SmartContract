# SmartContract
Criação de smart contract.

O tutorial abaixo mostra passo-a-passo como criar e realizar o deploy de um smart contract simples.

# Instalação do Truffle
Para criar, compilar e realizar deploy de smart contracts, iremos utilizar o framework Truffle.
Primeiramente instale o Truffle:

```
$ npm install -g truffle
```

# Inicializando o projeto
Através do Truffle, iremos inicializar uma estrutura de projeto. 
Cire a pasta do seu projeto (ex.: simple-storage), acesse a mesma e peça ao Truffle para criar a estrutura.
```
$ mkdir simple-storage
$ cd simple-storage
$ truffle init
```
Isso criará as pastas de "contracts" e "migrations" e os arquivos de configuração do Truffle.

Incluiremos o arquivo package.json. Para isso, rode o comando abaixo. Pode-se simplesmente pressionar "enter" para cada opção, exceto para "entry point" que deve-se preencher com "truffle.js".
```
$ npm init
```
# Criando o smart contract
Crie o smart contrat e grave na pasta "contracts" com a extensão ".sol".
Nesse exemplo, crieremos o "contracts/SimpleStorage.sol", com o código abaixo:
```
pragma solidity ^0.4.17;

contract SimpleStorage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public constant returns (uint) {
        return storedData;
    }
}
```
# Compilando o projeto
Com isso já é possível compilar o seu contrato.
```
$ truffle compile
```
Será gerada a pasta build com os json's representando os contratos compilados.
Se possuir algum erro, será informado nesse momento.

# Criando migration
O próximo passo é criar o arquivo de migration que informa para o Truffle como realizar o deploy do contrato.
Crie o arquivo "migrations/2_deploy_simple_storage.js" com o código:
```
var SimpleStorage = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
};
```

# Configurando o deploy
Iremos configurar o Truffle para realizar o deploy através do Infura. Dessa forma, não será necessário possuir um nó local (essa opção é possível se não quiser depender do Infura).
O deploy é realizado a partir de uma carteira Ethereum. Para isso será necessário informar a sua chave privada.
Para a chave privada não ficar exposta no código, iremos colocála em um arquivo de configuração e carregá-la através do módulo envdot.
Iremos instalar no projeto o módulo envdot, além de outros módulos necessários para gerenciamento da carteira.
```
npm install --save-dev dotenv truffle-wallet-provider ethereumjs-wallet
```
Agora, configure o arquivo "truffle.js" como abaixo:
```
require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3();
const WalletProvider = require("truffle-wallet-provider");
const Wallet = require('ethereumjs-wallet');

var mainNetPrivateKey = new Buffer(process.env["MAINNET_PRIVATE_KEY"], "hex");
var mainNetWallet = Wallet.fromPrivateKey(mainNetPrivateKey);
var mainNetProvider = new WalletProvider(mainNetWallet, "https://mainnet.infura.io/");

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
    },
    mainnet: {
      provider: mainNetProvider,
      gas: 4600000,
      gasPrice: web3.toWei("20", "gwei"),
      network_id: "1",
    }
  }
};
```
No arquivo, pode-se configurar quais redes deseje fazer deploy (Rinkeby, Ropsten, local, etc.). No exemplo, temos Kovan e Mainnet. Poderiam ser outras ou apenas uma.

# Realizando o deploy
Para realizar o deploy, primeiramente crie o arquivo de configuração ".env" na raiz do seu projeto e insira as suas chaves privadas.
```
KOVAN_PRIVATE_KEY="123YourPrivateKeyHere"
MAINNET_PRIVATE_KEY="123YourPrivateKeyHere"
```
Vamos realizar o deploy na Kovan:
```
$ truffle deploy --network kovan
```
No console, será impresso o endereço do contrato criado.
```
  SimpleStorage: 0xXXXXXXXXXXXXXXXX
```
Com esse endereço você já podera encontrar o seu contrato na rede Kovan. Vá em https://kovan.etherscan.io e digite o endereço retornado.

# Publicando o contrato
O último passo é publicar o seu contrato. Para isso, acesse o seu contrato com Etherscan, como mencionado acima.
Vá na aba "Contract Code". La aparecerá um link para "Verify and Publish". Clique nesse link.
Você será redirecionada para uma nova página. Clique no link "new Beta Source Code Contract Verifier".
Você será redirecionado para uma nova página que permite a verificação de contratos que tiveram o deploy feito com Truffle (Verify Contract Code (version 2.0) ). Nela preencha o nome do seu contrato (SimpleStorage), a versão do compilador (0.4.19+commit.c4cbbb05), "no optimization" e cole o código do seu contrato (conteúdo do SimpleStorage.sol).
Clique em "Verify and Publish".
