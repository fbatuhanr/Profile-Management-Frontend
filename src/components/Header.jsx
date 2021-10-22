import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";

const Header = () => {

    const userInfo = useSelector(state => state.user_info);
    const dispatch = useDispatch();

    return (
        <header className="text-white text-center fs-6 p-1">
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand fs-4">Profile Management</Link>
                    <div className="w-50 justify-content-center">
                    <span className="text-info">Welcome!</span> &nbsp;<i className="bi bi-person-fill"></i>
                    {
                        userInfo.isLoggedIn 
                        ? <span>{userInfo.loginEmail}</span>
                        : <>Please <span className="text-warning">Login</span> or <span className="text-warning">Sign up</span> to continue...</>
                    }   
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
                        {
                            userInfo.isLoggedIn
                            ? 
                            <>
                                <li className="nav-item"><Link to="/users" className="nav-link">Users</Link></li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Settings</a>
                                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdownMenuLink">
                                        <li><Link to="/profile" className="dropdown-item">Profile</Link></li>
                                        <li><Link to="/other" className="dropdown-item">Other</Link></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-danger" 
                                    onClick={() => dispatch({type: "LOG_OUT"})}>Logout!</button>
                                </li>
                            </>
                            : null
                        }
                    </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
export default Header;