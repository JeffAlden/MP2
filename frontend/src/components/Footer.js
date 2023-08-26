/* eslint-disable */
import React from 'react';
// import './Footer.css';

// Import Font Awesome components and icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faEnvelope, faHome } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faDribbble, faTwitter, faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className="container my-5">
      <footer className="text-white text-center text-lg-start bg-dark">
        <div className="container p-4">
          <div className="row mt-4">
            <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">About company</h5>
              <p>
              CodeBrew CoffeeShop - Where coding meets caffeine. Nestled in the heart of the town, we're the ideal stop post-work. Unwind, relax, or even code a little, 
              all while sipping on our handcrafted brews. Because at CodeBrew, we believe in blending the aroma of coffee with the essence of community."
              </p>
              <div className="mt-4">
                <button className="btn btn-floating btn-light btn-lg">
                  <FontAwesomeIcon icon={faFacebookF} />
                </button>
                <button className="btn btn-floating btn-light btn-lg">
                  <FontAwesomeIcon icon={faDribbble} />
                </button>
                <button className="btn btn-floating btn-light btn-lg">
                  <FontAwesomeIcon icon={faTwitter} />
                </button>
                <button className="btn btn-floating btn-light btn-lg">
                  <FontAwesomeIcon icon={faGooglePlusG} />
                </button>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4 pb-1">Search something</h5>
              <div className="form-outline form-white mb-4">
                <input type="text" id="formControlLg" className="form-control form-control-lg" />
                <label className="form-label" htmlFor="formControlLg">Search</label>
              </div>
              <ul className="fa-ul" style={{ marginLeft: '1.65em' }}>
                <li className="mb-3">
                  <span className="fa-li"><FontAwesomeIcon icon={faHome} /></span><span className="ms-2">Carmona, Cavite</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><FontAwesomeIcon icon={faEnvelope} /></span><span className="ms-2">info@codebrewcoffeeshop.com</span>
                </li>
                <li className="mb-3">
                  <span className="fa-li"><FontAwesomeIcon icon={faPhoneVolume} /></span><span className="ms-2">+ 88 369 369 88</span>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-4">Opening hours</h5>
              <table className="table text-center text-white">
                <tbody className="fw-normal">
                  <tr>
                    <td>Mon - Thu:</td>
                    <td>8am - 9pm</td>
                  </tr>
                  <tr>
                    <td>Fri - Sat:</td>
                    <td>8am - 1am</td>
                  </tr>
                  <tr>
                    <td>Sunday:</td>
                    <td>9am - 10pm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2023 Copyright: Jeffrey Alden Palino
        </div>
      </footer>
    </div>
  )
}

export default Footer;
