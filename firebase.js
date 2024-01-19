import { initializeApp } from "firebase/app"
import { getFirestore, orderBy, query, where, getDocs, collection } from "firebase/firestore"

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

const compositeIndex = async () => {
    try {
        const citiesRef = collection(db, "cities")

        const q = query(citiesRef, where("country", "==", "USA"), orderBy("population", "asc"))
        const cities = await getDocs(q)

        // const q = query(citiesRef, where("regions", "array-contains", "east_coast"), where("capital", "==", true))
        // const cities = await getDocs(q)

        cities.forEach(city => {
            console.log(city.data())
        });
    } catch (error) {
        console.log(error)
    }
}

compositeIndex()

export default db