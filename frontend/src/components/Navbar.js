import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useCart } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const Navbar = ({ onCartClick }) => {
    const { cartItems, getCartQuantityTotal } = useCart();
    const [totalQuantity, setTotalQuantity] = useState(getCartQuantityTotal());
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAdminAuthenticated') === 'true');

    useEffect(() => {
        setTotalQuantity(getCartQuantityTotal());
    }, [cartItems, getCartQuantityTotal]);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(localStorage.getItem('isAdminAuthenticated') === 'true');
        };
        
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const logout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        setIsAuthenticated(false);
    };

    const scrollToTop = () => {
        scroll.scrollToTop();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container py-2">
                <Link className="navbar-brand" to="/" onClick={scrollToTop}>CodeBrew Coffee Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <ScrollLink className="nav-link text-nowrap" to="about" smooth={true} duration={500}>
                                About
                            </ScrollLink>
                        </li>
                        <li className="nav-item">
                            <ScrollLink className="nav-link text-nowrap" to="services" smooth={true} duration={500}>
                                Services
                            </ScrollLink>
                        </li>
                        <li className="nav-item">
                            <ScrollLink className="nav-link text-nowrap" to="products" smooth={true} duration={500}>
                                Products
                            </ScrollLink>
                        </li>
                        <li className="nav-item">
                            <ScrollLink className="nav-link text-nowrap" to="contact" smooth={true} duration={500}>
                                Contact Us
                            </ScrollLink>
                        </li>
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <button type="button" className="btn btn-outline-primary mx-2" onClick={logout}>Logout</button>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login">
                                        <button type="button" className="btn btn-outline-primary mx-2">Login</button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup">
                                        <button type="button" className="btn btn-primary mx-2">Sign Up</button>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className="nav-item d-flex align-items-center">
                            <span onClick={onCartClick} className="nav-link" style={{cursor: "pointer"}}>
                                <FontAwesomeIcon icon={faShoppingCart} className="mx-2" />
                                {totalQuantity > 0 && (
                                    <span className="badge bg-danger">{totalQuantity}</span>
                                )}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
