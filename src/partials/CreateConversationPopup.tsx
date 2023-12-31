import { SyntheticEvent, useRef, useState } from "react";
import { Alert } from "react-bootstrap";
import DatabaseClient from "../api/DatabaseClient";
import { useAuth } from "../context/AuthContext";
import UserMinimal from "../views/UserMinimal";
import UserConversation from "../views/UserConversation";

function CreateConversationPopup({ onCancel }: any) {

    const { getUserDetails } = useAuth()
    const title = useRef<any>()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()

        const userDetails = getUserDetails()

        setError('')
        setLoading(true)

        try {
            const conversation = await DatabaseClient.createConversation(title.current.value, userDetails.uid)
            const user = new UserMinimal(userDetails.uid, userDetails.username, userDetails.avatarUrl)
            const userConversation = new UserConversation(conversation.id, conversation.title, conversation.ownerId, conversation.isGroup)
            await DatabaseClient.addUserToConversation(userConversation, user)
            onCancel();
        }
        catch(err) {
            console.log(err);
            
            setError("Something went wrong")
        }

        setLoading(false)
    }

    return (
        <>
            <div className="rounded p-4" style={{ width: "90%", maxWidth: "360px" , backgroundColor:"var(--footerColor)"}}>
                <h3 className="text-center m-2">New Conversation</h3>
                {error && <Alert variant="danger">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-2">
                        <label>Title</label>
                        <input className="inputTag" type="text" name="title" placeholder="Enter title of your new group" ref={title}  />
                    </div>
                    <div className="pt-2 d-flex justify-content-center" style={{ gap: 8 }}>
                        <button className="btn btn-primary" disabled={loading} type="submit">Create</button>
                        <button onClick={onCancel} className="btn btn-secondary" type="button" disabled={loading}>Cancel</button>
                    </div>
                </form>
                <p style={{fontSize:"14px", marginTop:"10px"}}>You can add your friends later in this group after clicking on "Create", then you will add members using the <em>"<i className="fa fa-gear" style={{color:"var(--fontColor)"}}></i> Settings icon"</em> on the top right.</p>
            </div>
        </>
    )
}

export default CreateConversationPopup