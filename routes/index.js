var express = require('express');
var router = express.Router();
const { Web3 } = require("web3");
const Auth = require('../controllers/auth');
const contract = require('../build/contracts/Auth.json');
const jwt = require('jsonwebtoken');
//const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const web3 = new Web3("HTTP://127.0.0.1:7545");
let authContract;
let defaultAccount;
require('dotenv').config()


// Configurar conexión con la blockchain
web3.eth.getAccounts()
  .then(accounts => {
    if (accounts.length === 0) {
      throw new Error("No accounts found. Make sure Ganache is running.");
    }
    defaultAccount = accounts[0];
    //A partado de Wallets, cómo cada usuario tendra UNA unica wallet, si va a registrar 2 cuentas o +
    //tendra qué obtener estás wallets por medió de wallets reales con dinero,estos son ficticias...
    const networkId = Object.keys(contract.networks)[0];
    authContract = new web3.eth.Contract(
      contract.abi,
      contract.networks[networkId].address
    );
  })
  .catch(error => {
    console.error("Error fetching accounts or contract:", error);
  });


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  let userAddress = defaultAccount;
  let hashToCheck = await Auth.AuthenticationHash(username, userAddress, password, email, web3);

  // Obtén todos los IDs de usuarios registrados bajo la misma dirección
  // Calcular los hashes de username, email y password
  let usernameHash = web3.utils.sha3(username);
  let emailHash = web3.utils.sha3(email);
  let passwordHash = web3.utils.sha3(password)

  // Obtén todos los IDs de usuarios registrados
  let allUserIds = await authContract.methods.getAllUserIds().call();
  let usernameExists = await authContract.methods.usernameExists(usernameHash).call();
  let emailExists = await authContract.methods.emailExists(emailHash).call();
  let passwordExists = await authContract.methods.passwordExists(passwordHash).call();
  for (let userId of allUserIds) {
    let registeredHash = await authContract.methods.getSignatureHash(userId).call();
    if (registeredHash === hashToCheck) {
      console.log('==========================================')
      console.log('Dirección de usuario: ', userAddress);
      console.log('Hash: ', hashToCheck);
      console.log('Registro del Hash: ', registeredHash);
      console.log('==========================================')
      return res.render('login', {
        alert: true,
        alertTitle: "Oops...",
        alertMessage: "Estos datos estan registrados en otra dirección Etherum!",
        alertIcon: 'error',
        showConfirmButton: false,
        timer: 2500,
        ruta: 'login',
      })
    }
  }

  try {
    if (usernameExists || emailExists || passwordExists) {
      return res.render('login',{
        alert: true,
        alertTitle: "Oops...",
        alertMessage: "La cédula de identidad ya está registrada!",
        alertIcon: 'error',
        showConfirmButton: false,
        timer: 2500,
        ruta: 'login',
      })
    }

    // Registro del nuevo usuario
    await authContract.methods.register(hashToCheck, usernameHash, emailHash, passwordHash).send({ from: userAddress, gas: 1000000 });
    return res.render('login', {
      alert: true,
      alertTitle: "Bien hecho!",
      alertMessage: `Usted se registro bajo la dirección: ${userAddress}`,
      alertIcon: 'success',
      showConfirmButton: false,
      timer: 2500,
      ruta: 'login',
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      response: 'Ocurrió un error al registrar el usuario',
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userAddress = req.body.userAddress || defaultAccount; 
  let emailHash = web3.utils.sha3(email);
  let passwordHash = web3.utils.sha3(password);

  try {
    let isValid = await authContract.methods.login(emailHash, passwordHash, userAddress).call();
    if (isValid) {
      const token = jwt.sign({ email, userAddress }, process.env.JWTSECRET, {
        expiresIn: '1h'
      });
      res.cookie("jwt", token);
      res.redirect('/');
    } else {
      return res.render('login',{
        alert: true,
        alertTitle: "Oops...",
        alertMessage: "La cedula de identidad o correo electrónico son incorrectos..",
        alertIcon: 'error',
        showConfirmButton: false,
        timer: 2500,
        ruta: 'login',
      })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      response: 'Ocurrió un error al intentar iniciar sesión',
    });
  }
});


router.get('/login',Auth.protectRouteLogOut, (req, res) => {
  res.render('login', {
    alert: false
  })
})


router.get('/logout',(req,res) => {
  Auth.logout(req,res);
})


router.get('/', Auth.protectRoute,(req, res, next) => {
  const { email, userAddress  } = req.user;
  const address = `${userAddress.slice(0,6)}...${userAddress.slice(36)}`
  res.render('index', {
    username: email,
    wallet: address
    });
});












module.exports = router;
