import React, { useState } from 'react';
import styles from './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests
import { toast } from 'react-toastify'; // Import the toast object
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import { useHistory } from 'react-router-dom'; // Import useHistory


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3006/customer/login', { email, password });
      const { status, token, isAdmin } = response.data;

      if (status === 'Success') {
        // Store the JWT and role in local storage or state
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', isAdmin);

        // Display success Toast notification with email
        toast.success(`Login successful! Welcome, ${email}!`, { position: 'top-right' });


        // Redirect based on user role
        if (isAdmin) {
          // Redirect to admin dashboard
          setTimeout(() => {
            window.location.href = '/staff-management';
          }, 2000); // Adjust the delay as needed
        } else {
          // Redirect to customer dashboard
          setTimeout(() => {
            window.location.href = '/';
          }, 2000); // Adjust the delay as needed
        }
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      toast.error('An error occurred while trying to log in. Please try again later.', { position: 'top-right' });
    }
  };



  return (
    <div>
      <section className={`${styles['gradient-custom']} vh-100`}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className={`card bg-dark text-white ${styles['card']}`}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className={`text-white-50 mb-5 ${styles['text-white-50']}`}>Please enter your login and password!</p>
                    <div className={`form-outline form-white mb-4 ${styles['form-outline']}`}>
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                    </div>
                    <div className={`form-outline form-white mb-4 ${styles['form-outline']}`}>
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>
                    <p className={`small mb-5 pb-lg-2 ${styles['text-white-50']}`}><a className="text-white-50" href="#!">Forgot password?</a></p>
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"  // Prevent the form from submitting
                      onClick={handleLogin}
                    >
                      Login
                    </button>
                    <div className={`d-flex justify-content-center text-center mt-4 pt-1 ${styles['text-white']}`}>
                      <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                      <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                    </div>
                  </div>
                  <div>
                    <p className={`mb-0 ${styles['text-white-50']}`}>Don't have an account? <Link to="/signup" className="text-white-50 fw-bold">Sign Up</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
