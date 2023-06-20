import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function MembersList() {
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
                    <li><a href="/member">John Doe</a></li>
                    <li>Mary Doe</li>
                    <li>Jane Doe</li>
                    <li>David Doe</li>
                    <li>Paul Doe</li>
                    <li>Sam Doe</li>
                    <li>Matthew Doe</li>
                    <li><a href="/member">Jennifer Sweet</a></li>
                    <li>Jenice Doe</li>
                </ul>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default MembersList;