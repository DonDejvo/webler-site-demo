import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import DatabaseClient from "../api/DatabaseClient";
import { useAuth } from "../context/AuthContext";
import UserMinimal from "../views/UserMinimal";
import User from "../views/User";
import Loader from "./Loader";
import UserConversation from "../views/UserConversation";

function EditChat({ conversation }: any) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState("")
    const inviteUsernameRef = useRef<any>()
    const { getUserDetails } = useAuth()

    useEffect(() => {
        toggleTab("general")
    }, [conversation])

    function toggleTab(activeTabName: string) {
        setError('')
        setMessage('')

        const tabs = document.querySelectorAll(".tab");
        const tabPanels = document.querySelectorAll(".tab-pane");

        for (let i = 0; i < tabs.length; ++i) {
            if (tabs[i].id == activeTabName + "-tab") {
                tabs[i].classList.add("active");
            }
            else {
                tabs[i].classList.remove("active");
            }
        }

        for (let i = 0; i < tabPanels.length; ++i) {
            if (tabPanels[i].id == activeTabName + "-tabpanel") {
                tabPanels[i].classList.add("active");
                tabPanels[i].classList.add("show");
            }
            else {
                tabPanels[i].classList.remove("active");
                tabPanels[i].classList.remove("show");
            }
        }
    }

    function handleTabToggle(e: SyntheticEvent, tabName: string) {
        e.preventDefault();

        toggleTab(tabName);
    }

    async function handleInvite() {

        setLoading(true)
        setError('')
        setMessage('')

        try {

            const snapshot = await DatabaseClient.getUserByUsername(inviteUsernameRef.current.value)
            if (!snapshot.exists()) {
                setLoading(false)
                return setError("User with this username does not exist")
            }
            const data = snapshot.val();
            const invited = Object.values(data)[0] as User;

            const userDetails = getUserDetails();
            const user = new UserMinimal(userDetails.uid, userDetails.username, userDetails.avatarUrl)
            const userConversation = new UserConversation(conversation.id, conversation.title, conversation.ownerId, conversation.isGroup)
            await DatabaseClient.createConversationInvite(userConversation, invited.uid, user)

            setMessage('User invited')
        }
        catch (err) {
            console.log(err);

            setError('Something went wrong')
        }

        setLoading(false)
    }

    return (
        <>
            {loading && <Loader />}
            {
                conversation &&
                <div className="p-4">
                    <h1 className="mb-4">Conversation Settings</h1>
                    <div className="rounded-lg d-block d-sm-flex">
                        <div className="profile-tab-nav" style={{ padding: "10px" }} >
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a onClick={(e) => handleTabToggle(e, "general")} className="nav-link tab" id="general-tab" href="#general-tabpanel" data-toggle="pill" role="tab" data-controls="invite-tabpanel" aria-selected="false">
                                    <i className="fa fa-gear"></i>
                                    General Settings
                                </a>
                            </div>
                            {
                                conversation.isGroup &&
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a onClick={(e) => handleTabToggle(e, "invite")} className="nav-link tab" id="invite-tab" href="#invite-tabpanel" data-toggle="pill" role="tab" data-controls="invite-tabpanel" aria-selected="false">
                                        <i className="fa fa-envelope"></i>
                                        Invite Members
                                    </a>
                                </div>
                            }
                        </div>
                        <div className="tab-content p-2" id="v-pills-tabContent" style={{ flexGrow: 1 }}>
                            {
                                conversation.isGroup &&
                                <div className="tab-pane fade show active" id="invite-tabpanel" role="tabpanel" aria-labelledby="invite-tab" style={{ backgroundColor: "var(--authFormBGcolor)", padding: "20px", borderRadius: "20px" }}>
                                    <h3 className="mb-4">Invite Members</h3>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    {message && <Alert variant="success">{message}</Alert>}

                                    <div className="form-group">
                                        <input className="form-control" type="text" placeholder="Enter username" ref={inviteUsernameRef} />
                                        <button className="btn btn-primary mt-2" onClick={handleInvite}>Invite</button>
                                    </div>

                                </div>
                            }
                            <div className="tab-pane fade" id="general-tabpanel" role="tabpanel" aria-labelledby="general-tab" style={{ backgroundColor: "var(--authFormBGcolor)", padding: "20px", borderRadius: "20px" }}>
                                <h3 className="mb-4">General Settings</h3>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}



                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditChat