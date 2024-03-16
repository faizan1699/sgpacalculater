import React, { useState, useEffect } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

function Topbar() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const handleSignOut = () => {
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                alert("Sign out Successfully");
                window.location.reload();
                navigate('/login');
                setUser(true);
            })
            .catch((error) => {
                alert("Please try again / signing out error");
            });

    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                setUser(true);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();

    }, []);
    return (
        <div>
            <nav className="navbar navbar-expand-md topbar">
                <div className="container-fluid">

                    <NavLink className='navbar-brand fw-bold text-light' to='/'>Sgpa Calculater</NavLink>

                    <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex w-100 justify-content-md-end">


                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/bysgpa">By SGPA</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/bymarks">By Marks</NavLink>
                            </li>

                            <div className="mx-md-2">
                                {user ?
                                    (<li className="nav-item bg-danger my-auto p-2 rounded text-light" onClick={handleSignOut}>Sign Out</li>)
                                    :
                                    (<li className="nav-item bg-danger rounded px-3">
                                        <NavLink className="nav-link text-light " to="/login">Login</NavLink>
                                    </li>)
                                }
                            </div>

                        </ul>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Topbar