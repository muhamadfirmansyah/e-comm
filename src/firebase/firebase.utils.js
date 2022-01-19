import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBhC26IThNs3luJIc1J-nk5qvPKbohFrmM",
    authDomain: "nothing-11f79.firebaseapp.com",
    projectId: "nothing-11f79",
    storageBucket: "nothing-11f79.appspot.com",
    messagingSenderId: "1031477682904",
    appId: "1:1031477682904:web:7e52ac59d7c49d9c7cadad",
    measurementId: "G-64RPGWR96E"
};

export const createUserProfileDocument= async (userAuth, additionalData) => {
    if (!userAuth) return

    const userRef = firestore.doc(`users/${userAuth.uid}`) // check if the user exist in the database

    const snapShot= await userRef.get()

    // To create we have to use documentReference not snapShot

    // console.log(snapShot)

    if (!snapShot.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()


// Setup Google Auth
const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
    'prompt': 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase