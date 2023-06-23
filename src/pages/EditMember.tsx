import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";
import { SyntheticEvent, useEffect, useState } from "react";
import { ref, onValue, update } from "firebase/database";
import { db } from "../services/firebase.config";
import User from "../views/User";
import { Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function EditMember() {

    const { changePassword } = useAuth()
    const [uid, setUid] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState("")
    const passwordRef = document.getElementById("password") as HTMLInputElement
    const passwordConfirmationRef = document.getElementById("password-confirmation") as HTMLInputElement

    useEffect(() => {
        const query = ref(db, "users");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();

            for (let entry of Object.entries(data)) {
                const user = entry[1] as User;

                if (user.username == localStorage.getItem("username")) {
                    setUid(entry[0]);
                    setUsername(user.username)
                    setBio(user.bio)
                    break;
                }
            }

        });
    }, []);

    async function saveAccountSettings() {
        try {
            setLoading(true)
            setError('')
            setMessage('')
            const query = ref(db, `users/${uid}`);
            await update(query, {
                username,
                bio
            })
            localStorage.setItem("username", username)
            setMessage('Account updated')
        }
        catch (err) {
            setError('Something went wrong')
        }
        setLoading(false)
    }

    async function handlePasswordChange() {

        if (passwordConfirmationRef.value != passwordRef.value) {
            return setError("Passwords do not match")
        }

        setLoading(true)
        setError('')
        setMessage('')
        await changePassword(passwordRef.value)
            .then(() => setMessage('Password was changed'))
            .catch((err: any) => {
            setError(err.message)
            window.location.href = "/login"
        });
        setLoading(false)
    }

    function toggleTab(e: SyntheticEvent) {
        e.preventDefault();

        setError('')
        setMessage('')

        const tabs = document.querySelectorAll(".tab");
        const tabPanels = document.querySelectorAll(".tab-pane");
        const activeTabPanelId = (e.target as HTMLElement).dataset.controls;

        for (let i = 0; i < tabs.length; ++i) {
            if (tabs[i] == e.target) {
                tabs[i].classList.add("active");
            }
            else {
                tabs[i].classList.remove("active");
            }
        }

        for (let i = 0; i < tabPanels.length; ++i) {
            if (tabPanels[i].id == activeTabPanelId) {
                tabPanels[i].classList.add("active");
                tabPanels[i].classList.add("show");
            }
            else {
                tabPanels[i].classList.remove("active");
                tabPanels[i].classList.remove("show");
            }
        }
    }

    PageTitle(`${localStorage.getItem("username")} | Webler`)

    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <h1 className="mb-4">Account Settings</h1>
                <div className="bg-white rounded-lg d-block d-sm-flex">
                    <div className="profile-tab-nav border-right">
                        <div className="p-4">
                            <div className="img-circle text-center mb-3">

                            </div>
                            <h4 className="text-center">{localStorage.getItem("username")}</h4>
                        </div>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a onClick={toggleTab} className="nav-link active tab" id="account-tab" href="#account-tabpanel" data-toggle="pill" role="tab" data-controls="account-tabpanel" aria-selected="true">
                                <i className="fa fa-home text-center mr-1"></i>
                                Account
                            </a>
                            <a onClick={toggleTab} className="nav-link tab" id="password-tab" href="#password-tabpanel" data-toggle="pill" role="tab" data-controls="password-tabpanel" aria-selected="false">
                                <i className="fa fa-key text-center mr-1"></i>
                                Password
                            </a>
                        </div>
                    </div>
                    <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="account-tabpanel" role="tabpanel" aria-labelledby="account-tab">
                            <h3 className="mb-4">Account Settings</h3>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername((e.target as HTMLInputElement).value)} />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label>Bio</label>
                                        <textarea className="form-control" value={bio} onChange={(e) => setBio((e.target as HTMLTextAreaElement).value)}></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <button disabled={loading} onClick={saveAccountSettings} className="btn btn-primary">Save</button>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="password-tabpanel" role="tabpanel" aria-labelledby="password-tab">
                            <h3 className="mb-4">Password Settings</h3>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {message && <Alert variant="success">{message}</Alert>}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>New password</label>
                                        <input type="password" className="form-control" id="password" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Confirm new password</label>
                                        <input type="password" className="form-control" id="password-confirmation" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <button onClick={handlePasswordChange} className="btn btn-primary">Change</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default EditMember;
