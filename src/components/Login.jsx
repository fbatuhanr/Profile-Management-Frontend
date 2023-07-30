import React, {useState} from 'react';
import {useDispatch} from 'react-redux';

import axios from 'axios';

import Swal from 'sweetalert2';

const Login = () => {

    const dispatch = useDispatch();

    const [loginForm, setLoginForm] = useState({
        loginEmail: "",
        loginPassword: "",
        rememberMe: false
    })

    const inputChange = e => {
        //console.log(e.target.name + ' ve ' + e.target.value);
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.type == "checkbox" ? e.target.checked : e.target.value
        })
    }

    const userLoginSuccess = (message, storageValues) => {

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
    const userLoginFailure = message => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: message,
            footer: '<a href="">Why do I have this issue?</a>'
        })
    }

    const loginFormSubmit = e => {
        e.preventDefault();

        const {loginEmail, loginPassword, rememberMe} = loginForm;

        const body = { "email": loginEmail, "password": loginPassword};
        const headers = { 'Content-Type': 'application/json' };
        axios.post('http://localhost:3001/login', body, { headers })
        .then(response => {
            console.log(response);
            if(response.data.isLoginSuccess)
                userLoginSuccess(response.data.successMessage, {isLoggedIn: true, loginEmail: loginEmail, rememberMe: rememberMe});
            else
                userLoginFailure(response.data.errorMessage);
        })
        .catch(error => {
            console.log("err:",error);
    
        });
    }

    // const MySwal = withReactContent(Swal)
    // await MySwal.fire({
    //   title: <strong>Good job!</strong>,
    //   html: <i>You clicked the button!</i>,
    //   icon: 'success'
    // });

    return (
        <form id="loginForm" onSubmit={loginFormSubmit} method="POST">
            <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="loginEmail" 
                    name="loginEmail"
                    value={loginForm.loginEmail}
                    onChange={inputChange}
                required/>
            </div>
            <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label">Password</label>
                <input type="password" className="form-control" id="loginPassword" 
                    name="loginPassword" 
                    value={loginForm.loginPassword}
                    onChange={inputChange}
                required/>
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" 
                    name="rememberMe"
                    defaultChecked={loginForm.rememberMe}
                    onChange={inputChange}
                />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="submit" className="btn btn-primary">Login!</button>
        </form>
    )
}
export default Login;