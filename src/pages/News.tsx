import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

function News() {
    PageTitle("News | Webler")
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