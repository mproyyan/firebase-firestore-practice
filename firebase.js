import { initializeApp } from "firebase/app"
import { deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore"

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

const addDocument = async () => {
    try {
        const cityRef = doc(db, "cities", "deleted")
        const city = await setDoc(cityRef, {
            name: "new city",
            state: "new state",
            country: "new city",
            capital: false
        })

        console.log(city)
    } catch (error) {
        console.log(error)
    }
}

addDocument()

const deleteDocument = async () => {
    try {
        const cityRef = doc(db, "cities", "deleted")
        const deleted = await deleteDoc(cityRef)
        console.log(deleted)
    } catch (error) {
        console.log(error)
    }
}

deleteDocument()

export default db