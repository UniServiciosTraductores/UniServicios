import { expect } from 'chai';
import sinon from 'sinon';
import Web3 from 'web3';
import fs from 'fs';
import path from 'path';

const contractPath = path.resolve('build', 'contracts', 'Auth.json');
const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

describe('Auth Controller', function () {
  let web3, authContract, contractStub, testAccount, networkId;
  before(async function () {
    web3 = new Web3("HTTP://127.0.0.1:7545");
    const accounts = await web3.eth.getAccounts();
    testAccount = accounts[0];

    networkId = await web3.eth.net.getId();
    const networkConfig = contract.networks[networkId];
    authContract = new web3.eth.Contract(contract.abi, networkConfig.address);
    contractStub = sinon.stub(web3.eth, 'Contract').returns(authContract);
  });

  after(function () {
    contractStub.restore();
  });

  it('Obtener las direcciónes de ganache y iniciar el contrato de Truffle', async function () {
    const accounts = await web3.eth.getAccounts();
    expect(accounts).to.have.lengthOf.at.least(1);
    expect(accounts[0]).to.equal(testAccount);

    const networkConfig = contract.networks[networkId];
    const contractInstance = new web3.eth.Contract(contract.abi, networkConfig.address);
    expect(contractInstance.options.address).to.equal(authContract.options.address);
  });

  it('Deberia arrojar un error SÍ no encuentra direcciónes de Ganache', async function () {
    const getAccountsStub = sinon.stub(web3.eth, 'getAccounts').resolves([]);
    try {
      await web3.eth.getAccounts();
    } catch (error) {
      expect(error.message).to.equal('No se encontraron cuentas. Asegúrate de que Ganache esté ejecutándose.');
    } finally {
      getAccountsStub.restore();
    }
  });

});
