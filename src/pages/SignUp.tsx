import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SyntheticEvent } from 'react';
import { auth } from '../services/firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    signUpAction();
}

function signUpAction() {

    const email = (document.getElementById("email") as HTMLInputElement).value;
    //const name = (document.getElementById("name") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User successfully created in sign up procedure
            const user = userCredential.user;
            // ...
            console.log(user.uid);
            toast("Congrats. You have created your new account.", {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage);
            toast("Error. Check for required inputs", {
                position: "bottom-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
}

function SignUp() {
    PageTitle("Sign Up | Webler")
    return (
        <>
        {/* Header */}
        <MenuNavBar />
        
        {/* Main */}
        <div className="d-flex flex-column justify-content-center" style={{ height: "100vh" }}>
            <div className="d-flex justify-content-center">
                <div className="w-100 p-4 m-2 rounded bg-white" style={{ maxWidth: '600px' }}>
                    <h3 className="text-center m-2">Sign Up</h3>
                    <p className="text-center">New here? Let's create your account:</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" id="email" placeholder="email adrress"/>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" id="password" placeholder="password" />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="btn btn-primary w-100">Sign up</button>
                            <ToastContainer
                                position="bottom-center"
                                autoClose={4000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover={false}
                                theme="light"
                            />
                        </div>
                    </form>
                    <p className="text-divider">
                        <span>or</span>
                    </p>
                    <div className="row">
                        <div className="col-sm p-2">
                            <button className="btn btn-danger w-100">
                                <span className="bg-white me-2 rounded-circle">
                                    <i className="fa fa-google p-1 text-danger"></i>
                                </span>
                                <span>Google</span>
                            </button>
                        </div>
                        <div className="col-sm p-2">
                            <button className="btn btn-dark w-100">
                                <span className="bg-white me-2 rounded-circle">
                                    <i className="fa fa-github p-1 text-dark"></i>
                                </span>
                                <span>Github</span>
                            </button>
                        </div>
                        <div className="col-sm p-2">
                            <button className="btn btn-primary w-100">
                                <span className="bg-white me-2">
                                    <i className="fa fa-facebook p-1 text-primary"></i>
                                </span>
                                <span>Facebook</span>
                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-center">
                            <span>Already have an account?</span>
                            <a className="ms-2" href="/login">Log in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Footer */}
        <Footer />
        </>
    );
}

export default SignUp;