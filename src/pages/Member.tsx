import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import User from "../views/User";
import Loader from "../partials/Loader";
import { useAuth } from "../context/AuthContext";
import DatabaseClient from "../api/DatabaseClient";

function Member() {

    let { username } = useParams();
    const [user, setUser] = useState<User | null>();
    const { signout, getUserDetails } = useAuth()

    useEffect(() => {

        DatabaseClient.getUserByUsername(username as string)
            .then(snapshot => {
                const data = snapshot.val();
                const user = Object.values(data)[0] as User;
                setUser(user)
            })

    }, []);

    async function handleLogout() {

        try {
          await signout()
          window.location.href = "/login"
        } catch {
          console.log("Failed to log out")
        }
      }

    user ? PageTitle(`${user?.username + " | Webler"}`) : PageTitle("Webler")

    return (
        <>
            {/* Header */}
            <MenuNavBar pageName={"Member"} />

            {/* Main */}
            <main>
                {
                    user ?
                        <>
                            <div style={{ maxWidth: "900px", marginLeft: "auto", marginRight: "auto" , background:"#88bccc3b"}}>
                                <div className="d-block d-sm-flex p-4" style={{ gap: 12 }}>
                                    <div className="img-circle text-center mb-2">
                                        <img width={128} height={128} className="rounded-circle" src={user.avatarUrl ? user.avatarUrl : "resources/images/logo.png"} />
                                    </div>
                                    <div className="d-flex flex-column align-items-center align-items-sm-start">
                                        <h3>{user.username}</h3>
                                        <div className="d-flex" style={{ gap: 8 }}>
                                            <b>0 Following</b>
                                            <b>0 Followers</b>
                                        </div>
                                        <p>{user.bio}</p>
                                        {
                                            user.username == getUserDetails()?.username &&
                                            <div className="d-flex" style={{ gap: 8 }}>
                                                <a href="#" onClick={handleLogout} className="btn btn-secondary">Logout</a>
                                                <a href="/edit-member" className="btn btn-primary">Edit Profile</a>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <Loader />
                        </>
                }
            </main>



            {/* Footer */}
            <Footer />
        </>
    );
}

export default Member;
