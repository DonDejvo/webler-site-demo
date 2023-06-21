import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

function Member() {
    PageTitle("username | Webler")
    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <h1>Member</h1>
                <hr />
                <p>Name of member: ____</p>
                <p>Age: ____</p>
                <p>Nationality: ____</p>
                <p>Occupation: ____</p>
                <p>Gender: ____</p>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Member;