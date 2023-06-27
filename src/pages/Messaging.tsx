import { useState, useEffect } from "react"
import Footer from "../partials/Footer"
import MenuNavBar from "../partials/MenuNavBar"
import Chat from "../partials/Chat"
import DatabaseClient from "../api/DatabaseClient"
import { useAuth } from "../context/AuthContext"
import ChatListItem from "../partials/ChatListItem"
import UserConversation from "../views/UserConversation"
import CreateConversationPopup from "../partials/CreateConversationPopup"
import ConversationInvite from "../views/ConversationInvite"
import UserMinimal from "../views/UserMinimal"
import EditChat from "../partials/EditChat"


function Messaging() {

    const { getUserDetails } = useAuth()
    const [conversationList, setConversationList] = useState<UserConversation[]>([])
    const [conversationInvites, setConversationInvites] = useState<ConversationInvite[]>([])
    const [activeConversation, setActiveConversation] = useState<UserConversation>()
    const [createConversationPopupOpened, setCreateConversationPopupOpened] = useState(false)

    useEffect(() => {

        const unsubscribe = DatabaseClient.onUserConversationsChange(getUserDetails().uid, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                setConversationList(Object.values(data))
            }
            else {
                setConversationList([])
            }
        })
        return unsubscribe
    }, [])

    useEffect(() => {

        const unsubscribe = DatabaseClient.onConversationInvitesChange(getUserDetails().uid, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                setConversationInvites(Object.values(data))
            }
            else {
                setConversationInvites([])
            }
        })
        return unsubscribe
    }, [])

    async function handleAcceptInvite(conversationInvite: ConversationInvite) {
        try {
            const userDetails = getUserDetails()
            const user = new UserMinimal(userDetails.uid, userDetails.username, userDetails.avatarUrl)
            await DatabaseClient.addUserToConversation(conversationInvite.conversation, user)
            await DatabaseClient.deleteConversationInvite(user.uid, conversationInvite.id)
        }
        catch (err) {
            console.log(err);
        }
    }

    async function handleDeclineInvite(conversationInvite: ConversationInvite) {
        try {
            const userDetails = getUserDetails()
            const user = new UserMinimal(userDetails.uid, userDetails.username, userDetails.avatarUrl)
            await DatabaseClient.deleteConversationInvite(user.uid, conversationInvite.id)
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

    function toggleSettingBar() {
        document.getElementById("setting-bar")?.classList.toggle("chat-setting-bar-closed")
    }

    return (
        <>
            {/* Header */}
            <MenuNavBar pageName="Chat" />

            {/* Main */}
            <main>
                <div className="rounded-lg d-block d-flex flex-column" style={{ overflow: "hidden", position: "relative", width: "100%", height: "calc(100vh - 114px)", minHeight: "300px" }}>
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
                            {activeConversation && <h3>{activeConversation.title}</h3>}
                            <div>
                                <button hidden={activeConversation == null} onClick={toggleSettingBar} className="btn" style={{ color: "var(--fontColor)", backgroundColor: "var(--navBarBgColor)" }}>
                                    <i className="fa fa-gear"></i>
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    <div id="setting-bar" className="chat-setting-bar chat-setting-bar-closed">
                            <EditChat conversation={activeConversation} />
                        </div>
                    <div id="sidebar" className="chat-sidebar chat-sidebar-closed d-flex flex-column">
                        <div className="d-flex align-items-center justify-content-end p-2" style={{ height: "60px" }}>
                            <button className="btn" onClick={closeSidebar}>Close &times;</button>
                        </div>
                        
                        <div className="p-2">
                            <h3 className="m-0">Conversations</h3>
                            <button onClick={() => setCreateConversationPopupOpened(true)} className="btn btn-primary">New</button>
                        </div>
                        
                        <div style={{ width: "240px", overflowY: "scroll", flexGrow: 1 }}>
                            {
                                conversationInvites.length > 0 &&
                                <>
                                    <p className="text-divider">
                                        <span style={{ backgroundColor: "var(--authFormBGcolor)" }}>Invites</span>
                                    </p>
                                    {
                                        conversationInvites.map(item => {
                                            return (
                                                <div key={item.id} className="border-bottom p-2 text-center">
                                                    <p><a href={"/member/" + item.inviter.username}>{item.inviter.username}</a> invited you into {item.conversation.isGroup ? `${item.conversation.title} group` : "conversation"}</p>
                                                    <div className="d-flex justify-content-around" style={{ gap: 8 }}>
                                                        <button onClick={() => handleAcceptInvite(item)} className="btn btn-success">Accept</button>
                                                        <button onClick={() => handleDeclineInvite(item)} className="btn btn-danger">Decline</button>
                                                    </div>
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
                                        conversationList.map(item => {
                                            const handleOnClick = () => {
                                                closeSidebar();
                                                
                                                setActiveConversation(item)
                                            }
                                            return (
                                                <ChatListItem onClick={handleOnClick} key={item.id} item={item} />
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
            </main>

            {/* Footer */}
            <Footer />
        </>
    )
}

export default Messaging