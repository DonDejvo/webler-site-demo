import { SyntheticEvent, useEffect, useRef, useState } from "react"
import DatabaseClient from "../api/DatabaseClient";
import Message from "../views/Message";
import UserMinimal from "../views/UserMinimal";
import { useAuth } from "../context/AuthContext";
import DateUtils from "../utils/DateUtils";

function Chat({ conversation }: any) {

    const messageRef = useRef<any>();
    const [messages, setMessages] = useState<Message[]>([])
    const { getUserDetails } = useAuth()

    const scrollToBottom = () => {
        const messageBox = document.getElementById("message-box") as HTMLElement
        messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight;
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])


    useEffect(() => {

        DatabaseClient.onNewMessageAdded(conversation.id, 50, (snapshot) => {
            if (snapshot.exists()) {
                const data = Object.values(snapshot.val()) as Message[]
                data.sort((a, b) => a.timestamp - b.timestamp)
                setMessages(data);
            }
            else {
                setMessages([])
            }
        })

    }, [conversation])

    async function handleSendMessage(e: SyntheticEvent) {
        e.preventDefault();

        try {
            const userDetails = getUserDetails()
            const user = new UserMinimal(userDetails.uid, userDetails.username, userDetails.avatarUrl)
            await DatabaseClient.createMessage(conversation.id, user, messageRef.current.value)

            messageRef.current.value = null
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <div className="w-100 h-100 bg-light p-0 d-flex flex-column">
                <div id="message-box" className="d-flex flex-column message-box p-2" style={{ flexGrow: 1, overflowY: "scroll" }}>
                    {
                        messages.map(item => {
                            let date = DateUtils.format(new Date(item.timestamp))

                            return (
                                <div key={item.id} className="d-flex" style={{ gap: 12 }}>
                                    <div className="img-circle">
                                        <img width={34} height={34} className="rounded-circle" src={item.user.avatarUrl ? item.user.avatarUrl : "/resources/images/logo.png"} />
                                    </div>
                                    <div>
                                        <div><b>{item.user.username}</b> <small>{date}</small></div>
                                        <p style={{ whiteSpace: "pre-wrap" }}>{item.text}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <form onSubmit={handleSendMessage} className="w-100 d-flex bg-white p-2 rounded mt-4">
                    <textarea ref={messageRef} style={{ border: "none", background: "transparent", outline: "none", flexGrow: 1, marginRight: "8px", resize: "none" }} cols={2} placeholder="Enter message here"></textarea>
                    <button className="btn btn-primary" type="submit">
                        <i className="fa fa-paper-plane"></i>
                    </button>
                </form>
            </div>
        </>
    )
}

export default Chat