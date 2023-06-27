import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

function ContactUs() {
    PageTitle("Contact Us | Webler")
    return (
        <>
            {/* Header */}
            <MenuNavBar pageName={"ContactUs"} />

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