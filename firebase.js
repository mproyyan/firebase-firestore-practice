import { initializeApp } from "firebase/app"
import { getFirestore, doc, runTransaction, updateDoc, getDoc, increment, writeBatch } from "firebase/firestore"

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

const likes = async () => {
    const postRef = doc(db, "posts", "post1")

    try {
        const newLikes = await runTransaction(db, async (transaction) => {
            const post = await transaction.get(postRef)
            if (!post.exists()) {
                throw new Error("post doesnt exists")
            }

            const likeCount = post.data().likes + 1
            if (Math.random() < 0.5) {
                console.log("external update")
                await updateDoc(postRef, { likes: likeCount })
            }

            transaction.update(postRef, { likes: likeCount })
            return likeCount
        });

        // const post = await getDoc(postRef)
        // await updateDoc(postRef, { likes: increment(1) })

        const udpatedPost = await getDoc(postRef)
        document.getElementById("likes").innerHTML = udpatedPost.data().likes
    } catch (error) {
        console.log(error)
    }
}

// likes()

const currentLikes = async () => {
    try {
        const postRef = doc(db, "posts", "post1")
        const udpatedPost = await getDoc(postRef)

        document.getElementById("likes").innerHTML = udpatedPost.data().likes
    } catch (error) {
        console.log(error)
    }
}

const batchedWrites = async () => {
    try {
        const batch = writeBatch(db)

        const postRef = doc(db, "posts/post1")
        batch.set(postRef, { title: "Cool Post Title" }, { merge: true })

        const userRef = doc(db, "users/user1")
        batch.update(userRef, { money: 5000 })

        const cityRef = doc(db, "cities/oIy8jdLavthyGj0qPpk7")
        batch.delete(cityRef)

        await batch.commit()
    } catch (error) {
        console.log(error)
    }
}

batchedWrites()

// export default db
export {
    likes,
    currentLikes
}