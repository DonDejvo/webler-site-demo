import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";
import { useState, useEffect } from "react";
import DatabaseClient from "../api/DatabaseClient";
import User from "../views/User";

function MembersList() {

    const [memberList, setMemberlist] = useState<User[]>([])

    useEffect(() => {
        DatabaseClient.getAllUsers()
            .then(snapshot => {
                const data = snapshot.val();
                setMemberlist(Object.values(data))
            })
    }, [])

    PageTitle("Members of Webler")
    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <h1>Members List</h1>
                <hr />
                <p>These are the current members of Webler Group: </p>
                <ul>

                    {
                        memberList.map((item: User, key) => {
                            return (
                                <li key={key}>
                                    <a href={"/member/" + item.username}>
                                    {item.username}
                                    </a>
                                </li>
                            )
                        })
                    }

                </ul>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default MembersList;
