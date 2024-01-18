import { initializeApp } from "firebase/app"
import { getFirestore, query, where, orderBy, limit, collection, getDocs } from "firebase/firestore"

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

const orderByPopulation = async () => {
    const citiesRef = collection(db, "cities")
    const q = query(citiesRef, where("population", ">", 100000), orderBy("population", "desc"), limit(2));
    const cities = await getDocs(q)
    cities.forEach(city => {
        console.log(city.data())
    });
}

orderByPopulation()

export default db