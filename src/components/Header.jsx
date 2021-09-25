import React from 'react'

const Header = () => {
    return (
        <header className="text-white text-center fs-6 p-3">
            <span className="text-info">Welcome!</span> 
            &nbsp;&nbsp;
            <i className="bi bi-person-fill"></i>Please <span className="text-warning">Login</span> or <span className="text-warning">Sign up</span> to continue...
        </header>
    )
}
export default Header;