import { initializeApp } from "firebase/app"
import { getFirestore, collection, doc, getDoc, getDocs } from "firebase/firestore"

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

const getDocument = async () => {
    try {
        const docRef = doc(db, "cities", "SF");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    } catch (error) {
        console.log(error)
    }
}

getDocument()

const getDocuments = async () => {
    try {
        const cities = await getDocs(collection(db, "cities")) // QuerySnapshot
        cities.forEach(city => {
            console.log(city.data())
        });
    } catch (error) {
        console.log(error)
    }
}

getDocuments()

const getUserReviews = async () => {
    try {
        // reviews are a subcollection of users
        const userReviews = await getDocs(collection(db, "users/alovelace/reviews")) // setup the correct path
        userReviews.forEach(review => {
            console.log(review.data())
        });
    } catch (error) {
        console.log(error)
    }
}

getUserReviews()

export default db