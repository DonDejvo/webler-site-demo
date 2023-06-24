import { equalTo, get, orderByChild, ref, set, update, query } from "firebase/database"
import User from "../views/User"
import { db } from "../services/firebase.config"

const DatabaseClient = (function() {

    async function createUser(uid: string, user: User) {
        return await set(ref(db, `users/${uid}`), user)
    }

    async function updateUser(uid: string, data: any) {
        return await update(ref(db, `users/${uid}`), data)
    }

    async function getUser(uid: string) {
        return await get(ref(db, `users/${uid}`))
    }

    async function getUserByUsername(username: string) {
        const userRef = query(ref(db, `users`), orderByChild('username'), equalTo(username));
        return await get(userRef)
    }

    return {
        createUser,
        updateUser,
        getUser,
        getUserByUsername
    }

})()

export default DatabaseClient