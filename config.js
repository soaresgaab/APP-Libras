import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBHKfVFcpzIiTe9Ou-O1M9erepn1thcN5I',
  authDomain: 'signallibrastcc.firebaseapp.com',
  projectId: 'signallibrastcc',
  storageBucket: 'signallibrastcc.appspot.com',
  messagingSenderId: '605696827969',
  appId: '1:605696827969:web:373d3e1df78263d4a35cc0',
  measurementId: 'G-17HFYM82Y0',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
