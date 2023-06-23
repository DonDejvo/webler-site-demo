import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase.config";
import User from "../views/User";
import Loader from "../partials/Loader";
import { useAuth } from "../context/AuthContext";

function Member() {

    let { username } = useParams();
    const [user, setUser] = useState<User>();
    const { signout } = useAuth()

    useEffect(() => {
        const query = ref(db, "users");
        return onValue(query, (snapshot) => {
            const data = snapshot.val();

            if (snapshot.exists()) {
                for (let user of Object.values(data)) {
                    if ((user as User).username == username) {
                        setUser(user as User);
                        break;
                    }
                }
            }
        });
    }, []);

    async function handleLogout() {

        try {
          await signout()
          window.location.href = "/login"
        } catch {
          console.log("Failed to log out")
        }
      }

    PageTitle(`${localStorage.getItem("username")} | Webler`)

    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                {
                    user ?
                        <>
                            <div className="bg-white" style={{ maxWidth: "900px", marginLeft: "auto", marginRight: "auto" }}>
                                <div className="d-block d-sm-flex p-4" style={{ gap: 12 }}>
                                    <div className="img-circle text-center mb-2">
                                        <img width={128} height={128} className="rounded-circle" src="https://picsum.photos/200" />
                                    </div>
                                    <div className="d-flex flex-column align-items-center align-items-sm-start">
                                        <h3>{user.username}</h3>
                                        <div className="d-flex" style={{ gap: 8 }}>
                                            <b>0 Following</b>
                                            <b>0 Followers</b>
                                        </div>
                                        <p>{user.bio}</p>
                                        <div className="d-flex" style={{ gap: 8 }}>
                                            <a href="#" onClick={handleLogout} className="btn btn-secondary">Logout</a>
                                            <a href="/edit-member" className="btn btn-primary">Edit Profile</a>
                                        </div>
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
