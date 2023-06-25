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
                    <li><a href="/member/corangar1999">CorAngar1999</a></li>
                    <li><a href="/member/tester02">Tester02</a></li>
                    <li><a href="/member/user16876371308640">User16876371308640</a></li>
                    <li><a href="/member/tejadon">TejaDon</a></li>
                    <li><a href="/member/tester01">Tester01</a></li>
                    <li><a href="/member/beachlasagna">beachlasagna</a></li>
                </ul>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default MembersList;
