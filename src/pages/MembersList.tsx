import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

function MembersList() {
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
                    <li><a href="/member">John Doe</a></li>
                    <li>Mary Doe</li>
                    <li>David Dolejsi</li>
                    <li>Paul Caron</li>
                    <li>ChillPill</li>
                    <li>Cosmin T</li>
                    <li>Solomoni Railoa</li>
                    <li>Tejas Don</li>
                    <li>Adrit Kanra</li>
                    <li>Manav Roy</li>
                    <li>Tapabrata Banerjee</li>
                    <li>Sparkoder</li>
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