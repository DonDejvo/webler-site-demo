import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import DatabaseClient from "../api/DatabaseClient";
import { useAuth } from "../context/AuthContext";
import User from "../views/User";
import Loader from "./Loader";
import UserConversation from "../views/UserConversation";

function EditChat({ conversation }: any) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState("")
    const inviteUsernameRef = useRef<any>()
    const { getUserDetails } = useAuth()
    const [groupTitle, setGroupTitle] = useState('')
    const userDetails = getUserDetails()

    useEffect(() => {
        toggleTab("members")
        setLoading(conversation == null)
        if (conversation) {
            setGroupTitle(conversation.title)
        }

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
            const userConversation = new UserConversation(conversation.id, conversation.title, conversation.ownerId, conversation.isGroup)
            await DatabaseClient.createConversationInvite(userConversation, invited.uid, userDetails.uid)

            setMessage('User invited')
        }
        catch (err) {
            console.log(err);

            setError('Something went wrong')
        }

        setLoading(false)
    }



    async function saveConversationDetails() {
        try {
            setError('')
            setMessage('')

            if(groupTitle.length < 3 || groupTitle.length > 20) {
                return setError('Title must be 3 - 20 characters long')
            }

            setLoading(true)

            await DatabaseClient.updateConversation(conversation.id, {
                title: groupTitle
            });

            setMessage('Updated successfully')
        }
        catch (err) {
            setError('Update failed')
        }
        setLoading(false)
    }

    async function removeUser(conversationId: string, user: User) {
        setLoading(true)
        try {
            await DatabaseClient.removeUserFromConversation(conversationId, user.uid)
        }
        catch (err) {
            console.log(err);
        }

        setLoading(false)
    }

    async function removeConversation(conversationId: string) {
        console.log(conversationId);
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
                                <a onClick={(e) => handleTabToggle(e, "members")} className="nav-link tab" id="members-tab" href="#members-tabpanel" data-toggle="pill" role="tab" data-controls="members-tabpanel" aria-selected="false">
                                    <i className="fa fa-group"></i>
                                    Members
                                </a>
                            </div>
                            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                <a onClick={(e) => handleTabToggle(e, "conversation")} className="nav-link tab" id="conversation-tab" href="#members-tabpanel" data-toggle="pill" role="tab" data-controls="members-tabpanel" aria-selected="false">
                                    <i className="fa fa-gear"></i>
                                    General
                                </a>
                            </div>

                        </div>
                        <div className="tab-content p-2" id="v-pills-tabContent" style={{ flexGrow: 1 }}>

                            <div className="tab-pane fade show active" id="members-tabpanel" role="tabpanel" aria-labelledby="members-tab" style={{ backgroundColor: "var(--authFormBGcolor)", padding: "20px", borderRadius: "20px" }}>
                                {conversation.ownerId == userDetails.uid &&
                                    <div>
                                        <h3 className="mb-4">Invite new people</h3>
                                        {error && <Alert variant="danger">{error}</Alert>}
                                        {message && <Alert variant="success">{message}</Alert>}

                                        <div className="form-group">
                                            <input className="form-control" type="text" placeholder="Enter username" ref={inviteUsernameRef} />
                                            <button className="btn btn-primary mt-2" onClick={handleInvite}>Invite</button>
                                        </div>
                                    </div>
                                }
                                <div className="mt-4">
                                    <h3>Members</h3>
                                    <ul className="list-group">
                                        {
                                            conversation.participants.map((participant: User) => {
                                                return (
                                                    <li className="list-group-item d-flex justify-content-between" key={participant.uid}>
                                                        <div className="d-flex align-items-center">
                                                            <a className="d-flex  align-items-center me-2" href={"/member/" + participant.username}>
                                                                <img width={34} height={34} className="rounded-circle me-2" src={participant.avatarUrl} />
                                                                <span>{participant.username}</span>
                                                            </a>
                                                            <span>
                                                                {
                                                                    (conversation.ownerId == participant.uid) ? "Owner" : "Member"
                                                                }
                                                            </span>
                                                        </div>
                                                        <div>
                                                            {
                                                                (conversation.ownerId != participant.uid && conversation.ownerId == userDetails.uid) &&
                                                                <button onClick={() => removeUser(conversation.id, participant)} className="btn btn-danger">Kick</button>
                                                            }
                                                            {
                                                                (conversation.ownerId != participant.uid && participant.uid == userDetails.uid) &&
                                                                <button onClick={() => removeUser(conversation.id, participant)} className="btn btn-danger">Leave</button>
                                                            }
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>

                            <div className="tab-pane fade show active" id="conversation-tabpanel" role="tabpanel" aria-labelledby="conversation-tab" style={{ backgroundColor: "var(--authFormBGcolor)", padding: "20px", borderRadius: "20px" }}>
                                <h3 className="mb-4">General</h3>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Group Title</label>
                                            <input disabled={userDetails.uid != conversation.ownerId} type="text" className="form-control" value={groupTitle} onChange={(e) => setGroupTitle((e.target as HTMLInputElement).value)} />
                                        </div>
                                    </div>
                                </div>
                                {
                                    userDetails.uid == conversation.ownerId &&
                                    <>
                                        <div>
                                            <button className="btn btn-primary" onClick={saveConversationDetails}>Save</button>
                                        </div>
                                        <hr />
                                        <div>
                                            <button onClick={() => removeConversation(conversation.id)} className="btn btn-danger">Delete Conversation</button>
                                        </div>
                                    </>
                                }
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditChat