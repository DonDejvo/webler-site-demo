import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase.config";
import User from "../views/User";

function Member() {

    let { username } = useParams();
    const [user, setUser] = useState<User>();

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

    PageTitle("username | Webler")

    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                {
                    user ?
                        <>
                            <h1>{user.username}</h1>
                            <hr />
                            {user.nationality && <p>Nationality: {user.nationality}</p>}
                            <p>{user.bio}</p>
                        </>
                        :
                        <>
                            <p>User not found</p>
                        </>
            }
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Member;