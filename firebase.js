import { initializeApp } from "firebase/app"
import { collection, getDocs, getFirestore, limit, orderBy, query, startAfter } from "firebase/firestore"

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

const paginate = async (cursor) => {
    const citiesRef = collection(db, "cities")
    let q = query(citiesRef, orderBy("population"), limit(2))
    if (typeof cursor !== "undefined") {
        console.log("page changed")
        q = query(citiesRef, orderBy("population"), startAfter(cursor), limit(2))
    }

    const cities = await getDocs(q)
    cities.forEach(city => {
        console.log(city.data())
    });

    // DocumentSnapshot can be query cursor
    const nextCursor = cities.docs[cities.docs.length - 1]
    console.log(nextCursor)
    return nextCursor
}

const runPagination = async () => {
    try {
        const cursor = await paginate()
        paginate(cursor)
    } catch (error) {
        console.log(error)
    }
}

runPagination()

export default db