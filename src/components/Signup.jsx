import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import axios from 'axios';

import Swal from 'sweetalert2';

const Signup = () => {

    const dispatch = useDispatch();

    const [signupForm, setSignupForm] = useState({
        signupEmailStart: "",
        signupEmailEnd: "",
        signupPassword: "",
        signupPasswordAgain: ""
    })

    const userSignupSuccess = (message, storageValues) => {

        let timerInterval
        Swal.fire({
            icon: 'success',
            title: message,
            html: 'You are being redirected in <b></b> milliseconds.',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer)
                dispatch({type: "LOG_IN", payload: storageValues});
        })
    }
    const userSignupFailure = message => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            footer: '<a href="">Why do I have this issue?</a>'
        })
    }


    const inputChange = (e) => {
        //console.log(e.target.name + ' ve ' + e.target.value);
        setSignupForm({
            ...signupForm,
            [e.target.name]: e.target.value
        })
    }
    const signupFormSubmit = (e) => {
        e.preventDefault();

        // console.log(signupForm.signupEmailStart);
        // console.log(signupForm.signupEmailEnd);
        // console.log(signupForm.signupPassword);
        // console.log(signupForm.signupPasswordAgain);

        if(signupForm.signupPassword != signupForm.signupPasswordAgain) {
            userSignupFailure("Passwords do not match!");
            return null;
        }
        
        const signupEmail = signupForm.signupEmailStart+'@'+signupForm.signupEmailEnd;
        const signupPassword = signupForm.signupPassword;

        const body = { "signupEmail": signupEmail, "signupPassword": signupPassword };
        const headers = { 'Content-Type': 'application/json'
        };
        axios.post('http://localhost:3001/sign-up', body, { headers })
        .then(response => {
            if(response.data.isLoginSuccess) {
                userSignupSuccess(response.data.successMessage, {isLoggedIn: true, loginEmail: signupEmail, rememberMe: false});
            }
            else {
                userSignupFailure(response.data.errorMessage);
            }
        })
        .catch(error => {
            console.log("Axios Post Error: ",error);
        });
    }

    return (
        <form id="signupForm" onSubmit={signupFormSubmit} method="POST">
            <div className="mb-3">
                <label htmlFor="signupEmailStart" className="form-label">Email address</label>
                <div className="input-group">
                    <input type="text" className="form-control" id="signupEmailStart" aria-describedby="emailHelp" 
                        name="signupEmailStart" 
                        value={signupForm.signupEmailStart} 
                        onChange={inputChange} 
                    required/>
                    <span className="input-group-text">@</span>
                    <input type="text" className="form-control" id="signupEmailEnd"
                        name="signupEmailEnd"
                        value={signupForm.signupEmailEnd} 
                        onChange={inputChange} 
                    required/>
                </div>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="signupPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="signupPassword" 
                    name="signupPassword"
                    value={signupForm.signupPassword} 
                    onChange={inputChange} 
                required/>
            </div>
            <div className="mb-3">
                <label htmlFor="signupPasswordAgain" className="form-label">Password again</label>
                <input type="password" className="form-control" id="signupPasswordAgain" 
                    name="signupPasswordAgain"
                    value={signupForm.signupPasswordAgain} 
                    onChange={inputChange} 
                required/>
            </div>
            <button type="submit" className="btn btn-primary">Sign up!</button>
        </form>
    )
}
export default Signup;