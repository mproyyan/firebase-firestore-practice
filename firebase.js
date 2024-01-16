import { initializeApp } from "firebase/app"
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FB_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const getDocumentReference = async () => {
    try {
        const alovelaceRef = doc(db, "users/alovelace")
        const alovelace = await getDoc(alovelaceRef)

        console.log(alovelaceRef)
        console.log(alovelace.data())
    } catch (error) {
        console.log(error)
    }
}

getDocumentReference()

const getCollectionReference = async () => {
    try {
        const usersCollectionRef = collection(db, "users")
        const querySnapshot = await getDocs(usersCollectionRef)

        const userReviewSubcollection = collection(db, "users/alovelace/reviews")
        const reviews = await getDocs(user)

        console.log(usersCollectionRef)
        querySnapshot.forEach(user => {
            console.log(user.data())
        });
    } catch (error) {
        console.log(error)
    }
}

getCollectionReference()

export default db