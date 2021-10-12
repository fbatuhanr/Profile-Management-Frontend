import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="text-white-50 text-end fs-6 p-2">
            © 2021 <Link to="/" className="text-decoration-none text-white">Profile Management</Link> System.  All rights reserved.
        </footer>
    )
}
export default Footer;