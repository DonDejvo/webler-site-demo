import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function News() {
    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <h1>News</h1>
                <hr />
                <p>Check out the latest events in Webler. Stay tuned to all the latest news:</p>
            </main>

            {/* Footer*/}
            <Footer />
        </>
    );
}

export default News;