import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

import { SyntheticEvent } from 'react';

function handleSubmit(e: SyntheticEvent) {
  e.preventDefault();
  resetPasswordAction();
}

function resetPasswordAction() {
  const email = (document.getElementById("email") as HTMLInputElement).value;

  //Do something here with reset password
  console.log(`Reset password for: ${email}`);
  //What will happen?
}

function ResetPassword() {
  PageTitle("Reset password | Webler")
  return (
      <>
      {/* Header */}
      <MenuNavBar />
      
      {/* Main */}
      <div className="d-flex flex-column justify-content-center" style={{ height: "100vh" }}>
          <div className="d-flex justify-content-center">
              <div className="w-100 p-4 m-2 rounded bg-white" style={{ maxWidth: '600px' }}>
                  <h3 className="text-center m-2">Reset your password</h3>
                  <p className="text-center">Forgotten your password? Enter the email address of the Webler account you were last using:</p>
                  <form onSubmit={handleSubmit}>
                      <div className="form-group mb-2">
                          <label htmlFor="email">Email</label>
                          <input className="form-control" type="email" name="email" id="email" placeholder="email adress" />
                      </div>
                      <div className="pt-2" >
                          <button type="submit" className="btn btn-primary w-100">Submit</button>
                      </div>
                  </form>
                  
                  <div className="mt-4">
                      <p className="text-center small">
                          <span>After clicking Submit, you'll receive instructions on resetting your password.</span>
                      </p>
                  </div>
              </div>
          </div>
      </div>
      
      {/* Footer */}
      <Footer />
      </>
  );
};

export default ResetPassword;