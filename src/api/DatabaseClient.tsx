import { equalTo, get, orderByChild, ref, set, update, query, DataSnapshot, onValue, limitToLast, endBefore, push, remove } from "firebase/database"
import User from "../views/User"
import { db } from "../services/firebase.config"
import UserMinimal from "../views/UserMinimal"
import Message from "../views/Message"
import Conversation from "../views/Conversation"
import UserConversation from "../views/UserConversation"
import ConversationInvite from "../views/ConversationInvite"

const DatabaseClient = (function() {

    async function createUser(user: User) {
        return await set(ref(db, `users/${user.uid}`), user)
    }

    async function updateUser(uid: string, data: any) {
        return await update(ref(db, `users/${uid}`), data)
    }

    async function getUser(uid: string) {
        return await get(ref(db, `users/${uid}`))
    }

    async function getUserByUsername(username: string) {
        const userRef = query(ref(db, `users`), orderByChild('usernameLowercase'), equalTo(username.toLowerCase()));
        return await get(userRef)
    }

    async function getAllUsers() {
        return await get(ref(db, `users`))
    }

    function onUserConversationsChange(uid: string, callback: (snaphost: DataSnapshot) => unknown) {
        const conversationsRef = ref(db, `users/${uid}/conversations`)
        const unsubscribe = onValue(conversationsRef, callback)
        return unsubscribe
    }

    function onNewMessageAdded(conversationId: string, limit: number, callback: (snaphost: DataSnapshot) => unknown) {
        const messagesRef = query(ref(db, `messages/${conversationId}`), orderByChild('timestamp'), limitToLast(limit))
        const unsubscribe = onValue(messagesRef, callback)
        return unsubscribe
    }

    async function getMesages(conversationId: string, limit: number, timestampTo: number) {
        const messagesRef = query(ref(db, `messages/${conversationId}`), orderByChild('timestamp'), limitToLast(limit), endBefore(timestampTo))
        return await get(messagesRef)
    }

    async function createMessage(conversationId: string, user: UserMinimal, text: string) {
        const messagesRef = ref(db, `messages/${conversationId}`);
        const newMessageRef = push(messagesRef)
        const message = new Message(newMessageRef.key as string, user, text, Date.now())
        await set(newMessageRef, message)
        return message
    }

    async function createConversation(title: string, ownerId: string, isGroup:boolean = true) {
        const conversationRef = ref(db, `conversations`);
        const newConversationRef = push(conversationRef)
        const conversation = new Conversation(newConversationRef.key as string, title, isGroup, ownerId)
        await set(newConversationRef, conversation)
        return conversation
    }

    async function addUserToConversation(conversation: UserConversation, user: UserMinimal) {
        const participantsRef = ref(db, `conversations/${conversation.id}/participants`);
        const newParticipantRef = push(participantsRef)

        const userConversationsRef = ref(db, `users/${user.uid}/conversations`);
        const newUserConversationRef = push(userConversationsRef)

        let promises = [
            set(newParticipantRef, user),
            set(newUserConversationRef, conversation)
        ]
        return await Promise.all(promises)
    }

    function onConversationInvitesChange(uid: string, callback: (snaphost: DataSnapshot) => unknown) {
        const conversationInvitesRef = ref(db, `conversationInvites/${uid}`);
        const unsubscribe = onValue(conversationInvitesRef, callback)
        return unsubscribe
    }

    async function createConversationInvite(conversation: UserConversation, invitedId: string, inviter: UserMinimal) {
        const conversationInviteRef = ref(db, `conversationInvites/${invitedId}`);
        const newConversationInviteRef = push(conversationInviteRef)
        const conversationInvite = new ConversationInvite(newConversationInviteRef.key as string, conversation, inviter)
        await set(newConversationInviteRef, conversationInvite)
        return conversationInvite
    }

    async function deleteConversationInvite(invitedId: string, id: string) {
        const conversationInviteRef = ref(db, `conversationInvites/${invitedId}/${id}`);
        return await remove(conversationInviteRef)
    }

    return {
        createUser,
        updateUser,
        getUser,
        getUserByUsername,
        getAllUsers,
        onUserConversationsChange,
        onNewMessageAdded,
        getMesages,
        createMessage,
        createConversation,
        addUserToConversation,
        onConversationInvitesChange,
        createConversationInvite,
        deleteConversationInvite
    }

})()

export default DatabaseClient