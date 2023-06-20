import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function Error404() {
    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <h1>Oops!</h1>
                <h2>The page you are looking is not found.</h2>
                <hr />
                <p>Error code: 404</p>
            </main>
            {/* Footer */}
            <Footer />
        </>
    );
}

export default Error404;