import React, {useState} from 'react';

const Login = () => {

    const [loginForm, setLoginForm] = useState({
        loginEmail: "",
        loginPassword: "",
        rememberMe: false
    })

    const inputChange = (e) => {
        //console.log(e.target.name + ' ve ' + e.target.value);
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.type == "checkbox" ? e.target.checked : e.target.value
        })
    }

    const loginFormSubmit = (e) => {
        e.preventDefault();

        console.log(loginForm.loginEmail);
        console.log(loginForm.loginPassword);
        console.log(loginForm.rememberMe);

        // const {loginEmail, loginPassword, rememberMe} = loginForm;
        // const formValues = {
        //     loginEmail, loginPassword, rememberMe
        //     // loginEmail: loginEmail,
        //     // loginPassword: loginPassword,
        //     // rememberMe: rememberMe
        // }

        // dispatch({type: "CHECK_USER", payload: formValues});
    }

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