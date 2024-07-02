var express = require('express');
var router = express.Router()
const Auth = require('../controllers/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc, query, where, getDocs, collection } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID ,
};


// Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Obtener instancias de Auth y Firestore
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);


router.post('/register', async (req, res) => {
  const { username, email, password, metaMaskAddress } = req.body;

  try {
    // Verificar si el username, email o password ya existen
    const usernameQuery = query(collection(db, 'users'), where('username', '==', username));
    const emailQuery = query(collection(db, 'users'), where('email', '==', email));
    const passwordQuery = query(collection(db, 'users'), where('password', '==', password));

    const usernameSnapshot = await getDocs(usernameQuery);
    const emailSnapshot = await getDocs(emailQuery);
    const passwordSnapshot = await getDocs(passwordQuery);

    if (!usernameSnapshot.empty || !emailSnapshot.empty || !passwordSnapshot.empty) {
      return res.status(400).json({ error: 'La cédula de identidad ya está registrada!' });
    }


    // Crear un nuevo usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar información adicional en Firestore
    await setDoc(doc(db, 'users', user.uid), {
      username: username,
      email: email,
      password: password,
      metaMaskAddress: metaMaskAddress,
    });

    res.json({ message: `Usted se registro bajo la dirección: ${metaMaskAddress}`, });
  } catch (error) {
    console.error('Error en el registro:', error);
    if (!res.headersSent) {
      if (error.code === 'auth/email-already-in-use') {
        res.status(400).json({ error: 'La cédula de identidad ya está registrada!' });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }
});
router.post('/login', async (req, res) => {
  const { email, password, metaMaskAddress } = req.body;

  try {
    // Obtener la información del usuario desde Firestore
    const userSnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', email), where('password', '==', password)));

    if (userSnapshot.empty) {
      return res.status(404).json({ error: 'Usuario no encontrado o credenciales incorrectas.' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    // Verificar que la dirección de MetaMask coincida
    if (userData.metaMaskAddress !== metaMaskAddress) {
      return res.status(401).json({ error: 'No autorizado. Dirección de MetaMask incorrecta.' });
    }

    // Generar token JWT
    const token = jwt.sign({ email: userData.email, userAddress: userData.metaMaskAddress }, 'blockchain', {
      expiresIn: '1h'
    });

    // Enviar token JWT como cookie
    res.cookie('jwt', token);
    res.json({ message: 'Inició de sesión exitoso!' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ error: 'Error del servidor. Por favor, inténtalo de nuevo más tarde.' });
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
