import MenuNavBar from "../partials/MenuNavBar";
import Footer from "../partials/Footer";
import PageTitle from "../partials/PageTitle";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { SyntheticEvent, useState } from 'react';
import { Alert, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function LogIn() {

    const emailRef = document.getElementById("email") as HTMLInputElement
    const passwordRef = document.getElementById("password") as HTMLInputElement
    const { signin, signWithGoogle } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();

        try {
            setError("")
            setLoading(true)
            console.log(emailRef.value);

            await signin(emailRef.value, passwordRef.value)
            window.location.href = "/member/" + localStorage.getItem("username");
        } catch {
            setError("Failed to login")
        }

        setLoading(false)
    }

    async function handleGoogleLogin() {
        try {
            setError("")
            setLoading(true)
            await signWithGoogle()
            window.location.href = "/member/" + localStorage.getItem("username");
        } catch {
            setError("Failed to login")
        }
        setLoading(false)
    }

    /*
    function logInAction() {
        const email = (document.getElementById("email") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        //Do something here with login
        console.log(`Logging in: ${email} and ${password}`);
        //What will happen?
        toast("Authentication in progress", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
    */

    PageTitle("Log in | Webler")

    return (
        <>
            {/* Header */}
            <MenuNavBar />

            {/* Main */}
            <div className="d-flex flex-column justify-content-center" style={{ height: "100vh" }}>
                <div className="d-flex justify-content-center">
                    <div className="w-100 p-4 m-2 rounded bg-white" style={{ maxWidth: '600px' }}>
                        <h3 className="text-center m-2">Log in</h3>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <p className="text-center">Let's get back in to your existing account:</p>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-2">
                                <label htmlFor="email">Email</label>
                                <input className="form-control" type="email" name="email" id="email" placeholder="email adress" />
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="password">Password</label>
                                <input className="form-control" type="password" name="password" id="password" placeholder="password" />
                            </div>
                            <div className="pt-2" >
                                <Button disabled={loading} type="submit" className="w-100">Log In</Button>
                                <a href="/reset-password" className="text-center small">Forgot password?</a>
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
                                <button className="btn btn-danger w-100" onClick={handleGoogleLogin}>
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
                                <span>Don't have an account?</span>
                                <a className="ms-2" href="/signup">Sign up</a>
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

export default LogIn;