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
        <div className="w-100 p-4 border-bottom d-flex flex-column" onClick={onClick}>
            <b>{item.title}</b>
            {
                lastMessage &&
                <span>{lastMessage.text.length < 16 ? lastMessage.text : lastMessage.text.slice(0, 16) + "…"}</span>
            }
        </div>
    )
}

export default ChatListItem