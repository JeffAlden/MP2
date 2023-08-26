import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState(''); // Added state for repeat password

  const handleSignup = async () => {
    try {
      if (password !== repeatPassword) {
        toast.error("Passwords don't match. Please check your input.", { position: 'top-right' });
        return;
      }

      const response = await axios.post('http://localhost:3006/customer/signup', { name, email, password });
      const { status, data } = response.data;

      if (status === 'Success') {
        toast.success(`Registration successful! Welcome, ${data.name}!`, { position: 'top-right' });

        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred while trying to register. Please try again later.', { position: 'top-right' });
    }
  };

  return (
    <div>
      <section className="vh-100 bg-image" style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')" }}>
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>
                    <form>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form3Example1cg">Your Name</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="email" id="form3Example3cg" className="form-control form-control-lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example4cg" className="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label className="form-label" htmlFor="form3Example4cg">Password</label>
                      </div>
                      <div className="form-outline mb-4">
                        <input type="password" id="form3Example4cdg" className="form-control form-control-lg" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
                        <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                        <label className="form-check-label" htmlFor="form2Example3g">
                          I agree all statements in <a href="#!" className="text-body"><u>Terms of service</u></a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={handleSignup}>Register</button>
                      </div>
                      <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login" className="fw-bold text-body"><u>Login here</u></Link></p>
                    </form>
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

export default Signup;
