import { SyntheticEvent, useEffect, useState } from "react"
import DatabaseClient from "../api/DatabaseClient";
import Message from "../views/Message";
import UserMinimal from "../views/UserMinimal";
import { useAuth } from "../context/AuthContext";
import DateUtils from "../utils/DateUtils";
import EditChat from "./EditChat";
import Conversation from "../views/Conversation";
import Loader from "./Loader";
import parse from 'html-react-parser';
import TextUtils from "../utils/TextUtils";
import GifSearchBar from "./GifSearchBar";

function Chat({ conversation }: any) {

    const [conversationFull, setConversationFull] = useState<any>()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const { getUserDetails } = useAuth()
    const [sendButtonDisabled, setSendButtonDisabled] = useState(true)
    const [gifSearchBarHidden, setGifSearchBarHidden] = useState(true)
    const [firstMessageTimestamp, setFirstMessageTimestamp] = useState(0)
    const [keepingCurrent, setKeepingCurrent] = useState(true)

    const scrollToBottom = (forced = false) => {
        const messageBox = document.getElementById("message-box") as HTMLElement
        if (messageBox && (keepingCurrent || forced)) {
            messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight;
        }
    }

    useEffect(() => {
        scrollToBottom();
        DatabaseClient.updateLastReadMessage(getUserDetails().uid, conversation.id, Date.now())
            .catch(err => console.log(err));
    }, [messages])

    useEffect(() => {
        let text = message.trim()
        setSendButtonDisabled(text.length == 0 || text.length > 240)
    }, [message])


    useEffect(() => {

        setMessage('')
        setGifSearchBarHidden(true)
        closeSettingBar()

        setMessages([])

        let unsubscribe1 = DatabaseClient.onNewMessageAdded(conversation.id, 20, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val() as Message

                setMessages(messages => [...messages, data]);
            }
        })

        let unsubscribe2 = DatabaseClient.onConversationChange(conversation.id, (snapshot) => {
            const data = snapshot.val();
            const conversationFull = new Conversation(data.id, data.title, data.isGroup, data.ownerId) as any

            let promises = []
            for (let participantId in data.participants) {
                promises.push(DatabaseClient.getUser(participantId).then(snapshot => {
                    const user = snapshot.val();
                    conversationFull.participants.push(user)
                }))
            }
            Promise.all(promises)
                .then(() => setConversationFull(conversationFull))
        })

        return () => {
            unsubscribe1()
            unsubscribe2()
        }

    }, [conversation])

    useEffect(() => {
        let timestamp = Date.now()
        for (let msg of messages) {
            if (msg.timestamp < timestamp) {
                timestamp = msg.timestamp
            }
        }
        setFirstMessageTimestamp(timestamp)
    }, [messages])

    async function handleSendMessage(e: SyntheticEvent) {
        e.preventDefault();

        setSendButtonDisabled(true)

        let text = message
        text = text.trim()

        try {
            const userDetails = getUserDetails()
            const user = new UserMinimal(userDetails.uid, userDetails.username, userDetails.avatarUrl)

            await DatabaseClient.createMessage(conversation.id, user, text)

            setMessage('')
        }
        catch (err) {
            console.log(err);
        }

        setSendButtonDisabled(false)
    }

    function closeSettingBar() {
        document.getElementById("setting-bar")?.classList.add("chat-setting-bar-closed")
    }

    function toggleSettingBar() {
        document.getElementById("setting-bar")?.classList.toggle("chat-setting-bar-closed")
    }

    function onMessageInputChange(e: SyntheticEvent) {
        let value = (e.target as HTMLTextAreaElement).value
        setMessage(value)
    }

    function textToMessage(text: string) {
        const processWord = () => {
            if (TextUtils.isValidUrl(word)) {
                if (TextUtils.isImageUrl(word)) {
                    footer += `<img src="${word}" style="max-width:212px"/>`
                }
                result += `<a href="${word}">${word}</a>`
            }
            else {
                result += word
            }
            word = ""
        }
        text = text.trim()
        text = TextUtils.escapeHtml(text)
        let result = ""
        let footer = ""
        let word = ""
        for (let i = 0; i < text.length; ++i) {
            let ch = text.charAt(i)
            if (/\s/.test(ch)) {
                if (word.length) {
                    processWord()
                }
                result += ch
            }
            else {
                word += ch
            }
        }
        if (word.length) {
            processWord()
        }
        return result + "\n" + footer
    }

    function toggleGifSearchBar() {
        setGifSearchBarHidden(!gifSearchBarHidden)
    }

    function handleOnSelectGif(item: any) {

        let text = item["media"][0]["tinygif"]["url"]

        const userDetails = getUserDetails()
        const user = new UserMinimal(userDetails.uid, userDetails.username, userDetails.avatarUrl)

        DatabaseClient.createMessage(conversation.id, user, text).then(() => {
            setGifSearchBarHidden(true)
        }).catch(err => {
            console.log(err);
        })

    }

    function onMessagesScroll(e: SyntheticEvent) {
        const messageBox = e.target as HTMLDivElement;
        if (messageBox.scrollTop == 0) {
            DatabaseClient.getMessages(conversation.id, 20, firstMessageTimestamp).then(snapshot => {
                if (snapshot.exists()) {
                    const oldMessages = Object.values(snapshot.val()) as Message[]
                    oldMessages.sort((a, b) => a.timestamp - b.timestamp)
                    setMessages(messages => [...oldMessages, ...messages])
                }
            })
        }
        setKeepingCurrent(messageBox.scrollTop >= messageBox.scrollHeight - messageBox.clientHeight)
    }


    return (
        <>
            {
                conversationFull ?
                    <div className="w-100 h-100 bg-light p-0 d-flex flex-column" >
                        <div className="w-100 bg-white border-bottom" style={{ height: "60px", zIndex: 1, position: "relative", backgroundColor: "var(--bGcolor)" }} >
                            <div className="d-flex justify-content-between align-items-center p-2 w-100" style={{background: "var(--navBarBgColor)"}}>
                                <div>
                                    <h3>{conversationFull.title}</h3>
                                </div>
                                <div>
                                    <button onClick={toggleSettingBar} className="btn">
                                        <i className="fa fa-gear" style={{color:"var(--fontColor)"}}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div id="setting-bar" className="chat-setting-bar chat-setting-bar-closed" style={{backgroundColor: "var(--authFormBGcolor)"}}>
                            <EditChat conversation={conversationFull} />
                        </div>
                        <div id="message-box" onScroll={onMessagesScroll} className="d-flex flex-column message-box p-2" style={{ flexGrow: 1, overflowY: "scroll" , backgroundColor: "var(--bGcolor)" }}>
                            {
                                messages.map((item, key) => {
                                    let date = DateUtils.format(new Date(item.timestamp))

                                    return (
                                        <div key={key} className="d-flex" style={{ gap: 12 }}>
                                            <div>
                                                {item.user && <a href={"/member/" + item.user.username} ><img width={34} height={34} className="rounded-circle" src={item.user.avatarUrl ? item.user.avatarUrl : "/resources/images/logo.png"} /></a>}
                                            </div>
                                            <div>
                                                <div>{item.user && <a className="NavLink" href={"/member/" + item.user.username}>{item.user.username}</a>} <small>{date}</small></div>
                                                <p style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{parse(textToMessage(item.text))}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="p-2" style={{ height: "75px" , backgroundColor: "var(--footerColor)"}}>
                            <div hidden={gifSearchBarHidden} style={{ position: "absolute", left: "0", transform: "translate(0, -100%)", width: "100%", maxWidth: "600px", height: "400px" }}>
                                <GifSearchBar onSelect={handleOnSelectGif} />
                            </div>
                            <div hidden={keepingCurrent} style={{ position: "absolute", right: "0", transform: "translate(0, -100%)" }}>
                                <button onClick={() => scrollToBottom(true)} className="quick-scroll-button-chat" style={{ display: "block" }}>
                                    <i className="fa fa-arrow-down"></i>
                                    Jump to present
                                </button>
                            </div>
                            <form onSubmit={handleSendMessage} id="messageForm" className="w-100 h-100 d-flex p-2 rounded mt-2" style={{ gap: 6 , backgroundColor: "var(--footerColor)"}}>
                                <button onClick={toggleGifSearchBar} className="btn btn-primary" type="button">
                                    GIF
                                </button>
                                <textarea className="p-2 rounded" value={message} onChange={onMessageInputChange} style={{ border: "none", outline: "none", flexGrow: 1, resize: "none", backgroundColor:"var(--bGcolor)", color:"var(--fontColor)"}} placeholder="Enter message here"></textarea>
                                <button hidden={sendButtonDisabled} className="btn btn-primary" type="submit">
                                    <i className="fa fa-paper-plane"></i>
                                </button>
                            </form>
                        </div>
                    </div>
                    :
                    <Loader />
            }
        </>
    )
}

export default Chat