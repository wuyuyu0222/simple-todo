import firestore from 'firestore';

const firestoreConfig = {
  apiKey: 'AIzaSyCgp3RRtLv2-g0AtblA5OIPhWvA2PSH8ZE',
  authDomain: 'personalpage-db.firebaseapp.com',
  databaseURL: 'https://personalpage-db.firebaseio.com',
  projectId: 'personalpage-db',
  storageBucket: '',
  messagingSenderId: '335372047982'
}
firestore.initializeApp(firestoreConfig);

export default firestore;