import React from 'react';
import { Helmet } from 'react-helmet';
import CubeOutlineIcon from 'mdi-react/CubeOutlineIcon';
import { Link } from 'react-router-dom';

const home = () => (
    <>
        <Helmet><title>Quizzee-Home</title></Helmet>
        <div id="home">
            <section>
                <div style={{textAlign: "center"}}>
                    <CubeOutlineIcon className="cube" size="8rem"/>
                </div>
                <h1>Quizzee</h1>
                <div className="play-button-container">
                    <ul>
                        <li><Link className="play-button" to="/play/instructions">Play</Link></li>
                    </ul>
                </div>
                <div className="auth-container">
                    <Link className="auth-buttons" id="login-button" to="/login">Login</Link>
                    <Link className="auth-buttons" id="signup-button" to="/register">Sign Up</Link>
                </div>
            </section>
        </div>
    </>
);

 
export default home;