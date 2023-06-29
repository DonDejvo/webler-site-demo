import { useState, useEffect } from "react"
import Chat from "../partials/Chat"
import DatabaseClient from "../api/DatabaseClient"
import { useAuth } from "../context/AuthContext"
import ChatListItem from "../partials/ChatListItem"
import UserConversation from "../views/UserConversation"
import CreateConversationPopup from "../partials/CreateConversationPopup"
import ConversationInvite from "../views/ConversationInvite"
import UserMinimal from "../views/UserMinimal"
import { NavDropdown } from "react-bootstrap"
import Form from 'react-bootstrap/Form';

function Messaging() {

    const { getUserDetails, signout } = useAuth()
    const [conversationList, setConversationList] = useState<UserConversation[]>([])
    const [conversationInvites, setConversationInvites] = useState<any[]>([])
    const [activeConversation, setActiveConversation] = useState<UserConversation>()
    const [createConversationPopupOpened, setCreateConversationPopupOpened] = useState(false)
    const userDetails = getUserDetails()

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
                const arr = Object.values(data) as any[]
                
                let promises = []
                for (let item of arr) {
                    promises.push(DatabaseClient.getUser(item.inviterId).then(snapshot => {
                        item.inviter = snapshot.val()
                    }))
                }
                Promise.all(promises)
                    .then(() => setConversationInvites(arr))
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

    async function handleLogout() {
        try {
            await signout()
            window.location.href = "/login"
        } catch {
            console.log("Failed to log out")
        }
    }

    function openProfile() {
        if (userDetails.username)
            window.location.href = "/member/" + userDetails.username;
    }

    // Dark theme handler
  const [switchState, setSwitchState] = useState(false)
  const [moodtheme, setMoodTheme] = useState("light2")
  const handleChange=(e: { target: { checked: any; }; })=>{
    const isDark = e.target.checked ? true: false;
    const body = document.getElementsByTagName("body")[0];
    if (isDark===false) { 
      body.className = "";
      setMoodTheme("light2");
      localStorage.setItem("data-theme", "light");
    }
    else if (isDark === true){
      body.className += " dark";
      setMoodTheme("dark");
      localStorage.setItem("data-theme", "dark");
    }   
    setSwitchState(!switchState)
  }

  const switchIt =()=>{
    let body = document.getElementsByTagName("body")[0];
    if(localStorage.getItem("data-theme")==="dark"){
      body.className += " dark";
      return true;
    }   
    else if (localStorage.getItem("data-theme")==="light"){
      body.className = "";
      return false;
    }
  }
  //Dark theme handler

    return (
        <>

            <div className="rounded-lg d-block d-flex flex-column" style={{ overflow: "hidden", position: "relative", width: "100%", height: "100vh", minHeight: "300px" }}>
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
                        <div>
                            <NavDropdown data-bs-theme={moodtheme} align="end" title={userDetails ? <><img width={34} height={34} className="rounded-circle" src={userDetails.avatarUrl ? userDetails.avatarUrl : "resources/images/logo.png"} /> {(userDetails.username)} </> : <>{(userDetails.username)}</>} id="navbarScrollingDropdownUser">
                                <NavDropdown.Item onClick={openProfile}>Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/edit-member">Edit Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/chat">Chat</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </div>
                    </div>
                </div>

                <div id="sidebar" className="chat-sidebar chat-sidebar-closed d-flex flex-column" style={{backgroundColor: "var(--authFormBGcolor)"}}>
                    <div className="d-flex align-items-center justify-content-end p-2" style={{ height: "60px"}}>
                        <Form className="d-flex align-items-center justify-content-end p-2" style={{ height: "60px" , fontSize:"14px", position:"absolute",left:"0px",top:"3px"}}>
                        <Form.Check
                            type="switch"
                            id="dark-theme-switch"
                            label="Dark Theme"
                            onChange={handleChange}   
                            checked = {switchIt()}
                        />
                        </Form>
                        <button className="btn" style={{color:"var(--fontColor)"}} onClick={closeSidebar}>Close &times;</button>
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

        </>
    )
}

export default Messaging