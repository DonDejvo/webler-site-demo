import { useEffect, useState } from "react";
import DatabaseClient from "../api/DatabaseClient";
import Message from "../views/Message";

function ChatListItem({ item, onClick }: any) {

    const [lastMessage, setLastMessage] = useState<Message>()

    useEffect(() => {
        DatabaseClient.onNewMessageAdded(item.id, 1, (snapshot) => {
            if(snapshot.exists()) {
                const data = Object.values(snapshot.val())
                const message = data[0] as Message
                setLastMessage(message)
            }
        })
    }, [])

    return (
        <div className="w-100 p-2 border-bottom  d-flex flex-column" onClick={onClick}>
            <h4>{item.isGroup ? item.title : "___"}</h4>
            <div>
            {
                lastMessage ?
                <span><b>{lastMessage.user.username}</b>: {lastMessage.text.length < 16 ? lastMessage.text : lastMessage.text.slice(0, 16) + "…"}</span>
                :
                <span>No messages yet</span>
            }
            </div>
        </div>
    )
}

export default ChatListItem