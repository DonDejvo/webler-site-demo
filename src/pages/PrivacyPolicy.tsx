import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function PrivacyPolicy() {
  return (
    <>
        {/* Header */}
        <MenuNavBar />

        {/* Main */}
        <main>
            <h1>Privacy Policy</h1>
            <hr />
            <p>Here at Webler, we take Privacy super seriously. We never collect data from users, never use trackers, and we never sell your information.</p>
        </main>
            
        {/* Footer */}
        <Footer />
    </>
  );
};

export default PrivacyPolicy;