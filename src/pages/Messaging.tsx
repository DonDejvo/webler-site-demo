import { useState, useEffect, SetStateAction } from "react"
import Chat from "../partials/Chat"
import DatabaseClient from "../api/DatabaseClient"
import { useAuth } from "../context/AuthContext"
import ChatListItem from "../partials/ChatListItem"
import UserConversation from "../views/UserConversation"
import CreateConversationPopup from "../partials/CreateConversationPopup"
import ConversationInvite from "../views/ConversationInvite"
import UserMinimal from "../views/UserMinimal"


function Messaging() {

    const { getUserDetails, updateUserDetails } = useAuth()
    const [conversationList, setConversationList] = useState<UserConversation[]>([])
    const [conversationInvites, setConversationInvites] = useState<any[]>([])
    const [activeConversation, setActiveConversation] = useState<UserConversation>()
    const [createConversationPopupOpened, setCreateConversationPopupOpened] = useState(false)
    const [isFirst, setIsFirst] = useState(true)

    useEffect(() => {

        const unsubscribe1 = DatabaseClient.onUserConversationsChange(getUserDetails().uid, (snapshot) => {
            if (snapshot.exists()) {
                const data = (Object.values(snapshot.val()) as UserConversation[]).filter(item => item.id != null)
                setConversationList(data)
            }
            else {
                setConversationList([])
            }
        })

        const unsubscribe2 = DatabaseClient.onConversationInvitesChange(getUserDetails().uid, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                let arr: SetStateAction<any[]> = []
                let promises = []
                for (let conversationId in data) {
                    for(let item of Object.values(data[conversationId]) as any[]) {
                        arr.push(item)
                        promises.push(DatabaseClient.getUser(item.inviterId).then(snapshot => {
                            item.inviter = snapshot.val()
                        }))
                    }
                    
                }
                Promise.all(promises)
                    .then(() => setConversationInvites(arr))
            }
            else {
                setConversationInvites([])
            }
        })
        return () => {
            unsubscribe1()
            unsubscribe2()
        }
    }, [])

    useEffect(() => {
        if(isFirst && conversationList.length > 0) {
            setIsFirst(false)
            const userDetails = getUserDetails()
            if(userDetails.activeConversationId) {
                const item = conversationList.find(e => e.id == userDetails.activeConversationId)
                if(item) {
                    setActiveConversation(item)
                }
            }
        }
    }, [conversationList])

    async function handleAcceptInvite(conversationInvite: ConversationInvite) {
        try {
            const userDetails = getUserDetails()
            const user = new UserMinimal(userDetails.uid, userDetails.username, userDetails.avatarUrl)
            await DatabaseClient.addUserToConversation(conversationInvite.conversation, user)
            await DatabaseClient.deleteAllConversationInvites(user.uid, conversationInvite.conversation.id)
            await DatabaseClient.createMessage(conversationInvite.conversation.id, null, `${user.username} entered the conversation`)
        }
        catch (err) {
            console.log(err);
        }
    }

    async function handleDeclineInvite(conversationInvite: ConversationInvite) {
        try {
            const userDetails = getUserDetails()
            const user = new UserMinimal(userDetails.uid, userDetails.username, userDetails.avatarUrl)
            await DatabaseClient.deleteConversationInvite(user.uid, conversationInvite.conversation.id, conversationInvite.id)
        }
        catch (err) {
            console.log(err);
        }
    }

    function closeSidebar() {
        document.getElementById("sidebar")?.classList.add("chat-sidebar-closed")
    }

    function openSidebar() {
        document.getElementById("sidebar")?.classList.remove("chat-sidebar-closed")
    }

    return (
        <>

            <div className="rounded-lg d-block d-flex flex-column" style={{ overflow: "hidden", position: "fixed", width: "100%", height: "100%", minHeight: "300px" }}>
                {
                    createConversationPopupOpened &&
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ position: "absolute", zIndex: "999", background: "rgba(128,128,128,0.5)" }}>
                        <CreateConversationPopup onCancel={() => setCreateConversationPopupOpened(false)} />
                    </div>
                }

                <div className="w-100" style={{ color: "var(--fontColor)", backgroundColor: "var(--navBarBgColor)", height: "60px", zIndex: 2, position: "relative" }} >
                    <div className="d-flex justify-content-between align-items-center p-2 w-100">
                        <div>
                            <button onClick={openSidebar} className="btn" style={{ color: "var(--fontColor)", backgroundColor: "var(--navBarBgColor)" }}>
                                <i className="fa fa-bars"></i>
                            </button>
                        </div>
                        <div className="d-flex">
                            <button onClick={() => history.back()} className="btn" style={{ color: "var(--fontColor)", backgroundColor: "var(--navBarBgColor)" }}>
                                <i className="fa fa-arrow-left"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div id="sidebar" className="chat-sidebar chat-sidebar-closed d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-end p-2" style={{ height: "60px" }}>
                        <button className="btn" onClick={closeSidebar}>Close &times;</button>
                    </div>

                    <div className="p-2">
                        <h3 className="m-0">Conversations</h3>
                        <button onClick={() => setCreateConversationPopupOpened(true)} className="btn btn-primary">Create</button>
                    </div>

                    <div style={{ width: "240px", overflowY: "scroll", flexGrow: 1 }}>
                        {
                            conversationInvites.length > 0 &&
                            <>
                                <p className="text-divider">
                                    <span style={{ backgroundColor: "var(--authFormBGcolor)" }}>Invites</span>
                                </p>
                                {
                                    conversationInvites.map((item, key) => {

                                        return (
                                            <div key={key} className="border-bottom p-2 text-center">
                                                {
                                                    item.inviter &&
                                                    <>
                                                        <p><a href={"/member/" + item.inviter.username}>{item.inviter.username}</a> invited you into {item.conversation.isGroup ? `${item.conversation.title} group` : "conversation"}</p>
                                                        <div className="d-flex justify-content-around" style={{ gap: 8 }}>
                                                            <button onClick={() => handleAcceptInvite(item)} className="btn btn-success">Accept</button>
                                                            <button onClick={() => handleDeclineInvite(item)} className="btn btn-danger">Decline</button>
                                                        </div>
                                                    </>
                                                }
                                            </div>

                                        )
                                    })
                                }
                            </>
                        }

                        {
                            conversationList.length > 0 &&
                            <>
                                <p className="text-divider">
                                    <span style={{ backgroundColor: "var(--authFormBGcolor)" }}>Conversations</span>
                                </p>
                                {
                                    conversationList.map((item, key) => {
                                        const handleOnClick = () => {
                                            closeSidebar();

                                            setActiveConversation(item)

                                            DatabaseClient.updateUser(getUserDetails().uid, {
                                                activeConversationId: item.id
                                            }).then(() => {
                                                updateUserDetails({
                                                    activeConversationId: item.id
                                                })
                                            })
                                           
                                        }
                                        return (
                                            <ChatListItem onClick={handleOnClick} key={key} item={item} />
                                        )
                                    })
                                }
                            </>

                        }
                    </div>
                </div>
                <div style={{ position: "relative", height: "calc(100% - 60px)" }}>
                    {
                        activeConversation &&
                        <Chat conversation={activeConversation} />
                    }
                </div>
            </div>

        </>
    )
}

export default Messaging