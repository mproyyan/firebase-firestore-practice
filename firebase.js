import { initializeApp } from "firebase/app"
import { getFirestore, collection, getAggregateFromServer, count, sum, average } from "firebase/firestore"

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

const aggregation = async () => {
    try {
        const coll = collection(db, 'cities');
        const snapshot = await getAggregateFromServer(coll, {
            countOfDocs: count(),
            totalPopulation: sum('population'),
            averagePopulation: average('population')
        });
        console.log('countOfDocs: ', snapshot.data().countOfDocs);
        console.log('totalPopulation: ', snapshot.data().totalPopulation);
        console.log('averagePopulation: ', snapshot.data().averagePopulation);

    } catch (error) {
        console.log(error)
    }
}

aggregation()

export default db