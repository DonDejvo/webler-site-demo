import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function Products() {
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