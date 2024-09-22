import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDVZ3xX-29pPzg6UPHEnu9saa4HaACZR2c',
  authDomain: 'videossignallibras.firebaseapp.com',
  projectId: 'videossignallibras',
  storageBucket: 'videossignallibras.appspot.com',
  messagingSenderId: '663943610223',
  appId: '1:663943610223:android:cd2c7dab7f7e6533fb329a',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };