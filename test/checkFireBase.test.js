
require('dotenv').config();
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID ,
};


describe('Iniciación de Firebase', () => {
  let firebaseApp;

  beforeAll(() => {
    firebaseApp = initializeApp(firebaseConfig);
  });

  test('Debería inicializar la aplicación Firebase', () => {
    expect(firebaseApp).toBeTruthy();
  });

  test('Debería obtener la instancia de autenticación', () => {
    const auth = getAuth(firebaseApp);
    expect(auth).toBeTruthy();
  });

  test('Debería obtener la instancia de Firestore', () => {
    const db = getFirestore(firebaseApp);
    expect(db).toBeTruthy();
  });
});
