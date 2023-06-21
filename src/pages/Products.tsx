import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

function Products() {
    PageTitle("Products | Webler");
    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <h1>Products</h1>
                <hr />
                <p>These are our published apps and games available exclusively for you. Our games will bring you joy. Our apps will solve the world's biggest problems.</p>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Products;