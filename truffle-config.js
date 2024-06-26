
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config()
console.log('Infura project: ',process.env.INFURA_PROJECT_ID);
console.log('Ganache: ',process.env.PRIVATE_KEY);
module.exports = {
  networks: {
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }/*
    mainnet: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`),
      timeout: 200000, // 60 segundos
      network_id: 1, // Mainnet ID
      gas: 4500000, // Gas limit
      gasPrice: 10000000000, // 10 Gwei
    },*/
    
  },
  compilers: {
    solc: {
      version: "0.8.6"
    }
  }
};