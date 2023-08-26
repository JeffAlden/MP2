import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Administrator = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({ ...prevState, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Send login request
            const response = await fetch('http://localhost:3006/customer/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            if (response.status !== 200) {
                handleLoginError(response.status);
                return;
            }

            const data = await response.json();

            if (data.status === 'Success' && data.isAdmin) {
                // If the user is authenticated as an admin, set a flag in localStorage
                localStorage.setItem('isAdminAuthenticated', 'true');
                toast.success('Logged in successfully!', getToastOptions());
                navigate('/staff-management', { replace: true });
            } else {
                // Any other scenario is treated as a failure
                toast.error('Login failed. User is not an admin.', getToastOptions());
            }

        } catch (error) {
            toast.error('An error occurred during login!', getToastOptions());
        }
    };

    const handleLoginError = (statusCode) => {
        if (statusCode === 401) {
            toast.error('Unauthorized: Incorrect username or password.', getToastOptions());
        } else {
            toast.error('Server error, please try again later.', getToastOptions());
        }
    };

    const getToastOptions = () => ({
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });

    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-5 mt-md-4 pb-5">
                                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="email"
                                                id="typeEmailX"
                                                className="form-control form-control-lg"
                                                name="username"
                                                value={credentials.username}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-label" htmlFor="typeEmailX">Username</label>
                                        </div>

                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                className="form-control form-control-lg"
                                                name="password"
                                                value={credentials.password}
                                                onChange={handleInputChange}
                                            />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>

                                        <p className="small mb-5 pb-lg-2">
                                            <a className="text-white-50" href="#!">Forgot password?</a>
                                        </p>

                                        <button
                                            className="btn btn-outline-light btn-lg px-5"
                                            type="button"
                                            onClick={handleLogin}
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
}

export default Administrator;
