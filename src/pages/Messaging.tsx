import { useState, useEffect } from "react"
import Footer from "../partials/Footer"
import MenuNavBar from "../partials/MenuNavBar"
import Chat from "../partials/Chat"
import DatabaseClient from "../api/DatabaseClient"
import { useAuth } from "../context/AuthContext"
import ChatListItem from "../partials/ChatListItem"
import UserConversation from "../views/UserConversation"
import CreateConversationPopup from "../partials/CreateConversationPopup"


function Messaging() {

    const { getUserDetails } = useAuth()
    const [conversationList, setConversationList] = useState<UserConversation[]>([])
    const [activeConversation, setActiveConversation] = useState<UserConversation>()
    const [createConversationPopupOpened, setCreateConversationPopupOpened] = useState(false)

    useEffect(() => {

        const unsubscribe = DatabaseClient.onUserConversationsChange(getUserDetails().uid, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                setConversationList(Object.values(data))
            }
        })
        return unsubscribe
    }, [])

    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <div className="rounded-lg d-block d-flex" style={{ position: "absolute", width: "calc(100% - 36px)", height: "calc(100% - 48px)", maxHeight: "calc(100vh - 114px)", gap: 12 }}>
                    {
                        createConversationPopupOpened &&
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center" style={{ position: "absolute", zIndex: "999" }}>
                            <CreateConversationPopup onCancel={() => setCreateConversationPopupOpened(false)} />
                        </div>
                    }
                    <div className="border-right h-100 bg-light p-0 d-flex flex-column">
                        <div className="p-2">
                            <h3>Conversations</h3>
                            <button onClick={() => setCreateConversationPopupOpened(true)} className="btn btn-primary">New</button>
                        </div>
                        <hr />
                        <div style={{ width: "240px", overflowY: "scroll", flexGrow: 1 }}>
                            {
                                conversationList.map(item => {
                                    return (
                                        <ChatListItem onClick={() => setActiveConversation(item)} key={item.id} item={item} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="p-0" style={{ flexGrow: 1 }}>
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