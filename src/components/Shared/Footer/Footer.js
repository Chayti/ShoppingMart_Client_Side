import React from "react";
import './Footer.css';
import logo from '../../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div>
            <div className="d-flex flex-column align-items-center py-3" style={{ backgroundColor: "#334940" }}>
                <div><img src={logo} style={{ height: "80px" }} alt="" /></div>
                <h4 className="pt-3 fw-bold" style={{ color: "yellowgreen" }}>Contact Us</h4>
                <div className="d-flex justify-content-center">
                    <h5 style={{ color: "#00b9d1" }}>+8801721888888,&nbsp;</h5>
                    <h5 style={{ color: "#00b9d1" }}>+8801533333377</h5>
                </div>
                <small style={{ color: "white" }}>Always beside you</small>
                <p style={{ color: "white" }}><FontAwesomeIcon icon={faEnvelope} size="1x" /> <span style={{ cursor: "pointer" }}>info@shoppingmart.com</span></p>
            </div>

            <div className="text-center" style={{ color: "#494949", backgroundColor: "#202020" }}>
                <small> 2010-2021 © All right reserved. ShoppingMart.com is part of XYZ Online Platform, the leading online shopping platforms in Middle East and Asia</small>
            </div>

        </div>
    );
}

export default Footer;