import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";

function ResetPassword() {
  return (
    <>
      {/* Header */}
      <MenuNavBar />

      {/* Main */}
      <main>
        <h1>Reset Password</h1>
        <hr />
        <p>Please enter the email address of the Webler account you're trying to log in to: </p>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ResetPassword;