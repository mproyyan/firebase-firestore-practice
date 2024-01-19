import { initializeApp } from "firebase/app"
import { collection, doc, getDoc, getFirestore, onSnapshot, query, updateDoc, where } from "firebase/firestore"

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

const unsubSingleDocument = onSnapshot(doc(db, "users/user1"), doc => {
    const source = doc.metadata.hasPendingWrites ? "local" : "server"
    console.log(source, " data: ", doc.data())
}, error => {
    console.log(error)
})

const q = query(collection(db, "cities"), where("state", "==", "CA"))
const unsubMultipleDocument = onSnapshot(q, docs => {
    docs.docChanges().forEach((change) => {
        if (change.type === "added") {
            console.log("New city: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified city: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed city: ", change.doc.data());
        }
    });

    const cities = [];
    docs.forEach((doc) => {
        cities.push(doc.data().name);
    });

    console.log("Current cities in CA: ", cities.join(", "));
})

const updateDocument = async () => {
    try {
        const userRef = doc(db, "users/user1")
        const user = await getDoc(userRef)
        await updateDoc(userRef, { money: user.data().money + 100 })
    } catch (error) {
        console.log(error)
    }
}

const init = () => {
    const btn = document.getElementById("addMoney")
    btn.addEventListener("click", updateDocument)
}

init()

export default db