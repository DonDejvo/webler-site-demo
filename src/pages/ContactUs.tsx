import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function ContactUs() {
    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <main>
                <h1>Contact Us</h1>
                <hr />
                <p>Feel free to reach out to us. We would love to hear from you. Your voice really matters to us. </p>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default ContactUs;