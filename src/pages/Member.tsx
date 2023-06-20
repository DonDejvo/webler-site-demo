import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function Member() {
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