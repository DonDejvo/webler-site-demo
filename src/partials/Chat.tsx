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

    const scrollToBottom = () => {
        const messageBox = document.getElementById("message-box") as HTMLElement
        if (messageBox) {
            messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight;
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    useEffect(() => {
        let text = message.trim()
        setSendButtonDisabled(text.length == 0 || text.length > 240)
    }, [message])


    useEffect(() => {

        setMessage('')
        setGifSearchBarHidden(true)
        closeSettingBar()

        let unsubscribe1 = DatabaseClient.onNewMessageAdded(conversation.id, 50, (snapshot) => {
            if (snapshot.exists()) {
                const data = Object.values(snapshot.val()) as Message[]
                data.sort((a, b) => a.timestamp - b.timestamp)
                setMessages(data);
            }
            else {
                setMessages([])
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
                    footer += `<img src="${word}" />`
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
                        <div id="message-box" className="d-flex flex-column message-box p-2" style={{ flexGrow: 1, overflowY: "scroll" , backgroundColor: "var(--bGcolor)" }}>
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
                            <form onSubmit={handleSendMessage} className="w-100 h-100 d-flex p-2 rounded mt-2" style={{ gap: 6 , backgroundColor: "var(--footerColor)"}}>
                                <button onClick={toggleGifSearchBar} className="btn btn-primary" type="button">
                                    GIF
                                </button>
                                <textarea className="bg-light p-2 rounded" value={message} onChange={onMessageInputChange} style={{ border: "none", outline: "none", flexGrow: 1, resize: "none" }} placeholder="Enter message here"></textarea>
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