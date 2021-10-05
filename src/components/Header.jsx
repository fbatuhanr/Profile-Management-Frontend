import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

const Header = () => {

    const userInfo = useSelector(state => state.user_info);
    const dispatch = useDispatch();

    return (
        <header className="text-white text-center fs-6 p-3">
            <span className="text-info">Welcome!</span> &nbsp; <i className="bi bi-person-fill"></i>
        {
            userInfo.isLoggedIn 
            ? <>
                <span>{userInfo.loginEmail}</span>
                <button className="btn btn-danger" 
                onClick={() => dispatch({type: "LOG_OUT"})}>Logout!</button>
              </>
            : <>
                Please <span className="text-warning">Login</span> or <span className="text-warning">Sign up</span> to continue...
              </>
        }   
        </header>
    )
}
export default Header;