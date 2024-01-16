import { initializeApp } from "firebase/app"
import { addDoc, arrayUnion, collection, doc, getFirestore, increment, serverTimestamp, setDoc, updateDoc } from "firebase/firestore"

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

const setDocument = async () => {
    try {
        const cityRef = doc(db, "cities", "slmn")
        const city = await setDoc(cityRef, {
            name: "Sleman",
            state: "DIY",
            country: "Indonesia"
        })

        console.log(city)
    } catch (error) {
        console.log(error)
    }
}

setDocument()

const addDocument = async () => {
    try {
        const city = await addDoc(collection(db, "cities"), {
            name: "new city",
            state: "new state",
            country: "new country"
        })

        console.log(city)
    } catch (error) {
        console.log(error)
    }
}

addDocument()

const udpateDocument = async () => {
    try {
        const cityRef = doc(db, "cities", "slmn")
        const city = await updateDoc(cityRef, {
            state: "Daerah Istimewa Yogyakarta",
            updatedAt: serverTimestamp(), // serverTimestamp() which tracks when the server receives the update

            // to update nested object use dot notation to prevent overwrite the entire map field
            "geo.latitude": "-7.7470",
            "geo.longitude": "110.3756",

            // If your document contains an array field, you can use arrayUnion() and arrayRemove() to add and remove elements
            regions: arrayUnion("Seyegan"), // add to element if not exists
            population: increment(1000)
        })

        console.log(city) // undefined
    } catch (error) {
        console.log(error)
    }
}

udpateDocument()

export default db