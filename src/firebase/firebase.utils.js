import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyC5L_k3xzgci0WAfjByY2IkEKsaODNPfWk",
  authDomain: "crwn-db-1a705.firebaseapp.com",
  projectId: "crwn-db-1a705",
  storageBucket: "crwn-db-1a705.appspot.com",
  messagingSenderId: "111011270587",
  appId: "1:111011270587:web:437554ee856814015c7e9e"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => (
  auth.signInWithPopup(provider)
);

export default firebase;