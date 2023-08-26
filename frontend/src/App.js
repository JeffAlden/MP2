import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import StaffManagement from './components/StaffManagement';
import SignUpAdmin from './components/SignUpAdmin';
import ContactUsAdmin from './components/ContactUsAdmin';
import Administrator from './components/Administrator';
import 'react-toastify/dist/ReactToastify.css';
import CafeWebpage from './components/CafeWebpage';
import { CartProvider } from './components/CartContext';
import CartSidebar from './components/CartSidebar';
import './App.css';

const isAuthenticated = () => {
    return localStorage.getItem('isAdminAuthenticated') === 'true';
};

function ProtectedStaffManagement() {
    return isAuthenticated() ? <StaffManagement /> : <Navigate to="/administrator" replace />;
}

function App() {
    const [showCartSidebar, setShowCartSidebar] = useState(false);
    const cartSidebarRef = useRef(null);

    // 1. Add state to track the authentication status
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(isAuthenticated());

    // 2. Provide a function that updates the authentication status
    const toggleAuthentication = () => {
        setIsAdminAuthenticated(isAuthenticated());
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (cartSidebarRef.current && !cartSidebarRef.current.contains(event.target)) {
                setShowCartSidebar(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Router>
            <CartProvider>
                {/* 3. Pass the authentication status and the toggle function to the Navbar */}
                <Navbar onCartClick={() => setShowCartSidebar(true)} isAuthenticated={isAdminAuthenticated} onAuthChange={toggleAuthentication} />
                <div className="app-content">
                    <main>
                        <Routes>
                            <Route path="/" element={<CafeWebpage />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/administrator" element={<Administrator />} />
                            <Route path="/staff-management" element={<ProtectedStaffManagement />} />
                            <Route path="/signup-admin" element={<SignUpAdmin />} />
                            <Route path="/contact-us-admin" element={<ContactUsAdmin />} />
                        </Routes>
                    </main>
                </div>
                {showCartSidebar && <CartSidebar ref={cartSidebarRef} onClose={() => setShowCartSidebar(false)} />}
                <ToastContainer />
                <Footer />
            </CartProvider>
        </Router>
    );
}

export default App;