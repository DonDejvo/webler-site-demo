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
            // Signed in 
            const user = userCredential.user;
            // ...
            console.log(user.uid);
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage);
            
        });
}

function SignUp() {
    return (
        <div className="d-flex flex-column justify-content-center" style={{ height: "100vh" }}>
            <div className="d-flex justify-content-center">
                <div className="w-100 p-4 m-2 rounded bg-white" style={{ maxWidth: '600px' }}>
                    <h3 className="text-center m-2">Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-2">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" id="email" />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="name">Name</label>
                            <input className="form-control" type="text" name="name" id="name" />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" id="password" />
                        </div>
                        <div className="pt-2">
                            <button type="submit" className="btn btn-primary w-100">Sign up</button>
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
                            <a className="ms-2" href="#">Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;