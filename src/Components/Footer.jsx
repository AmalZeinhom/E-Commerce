import React from "react";
import "../index.css";
import amazonPay from "../assets/amazonPay.png";
import americanExpress from "../assets/americanExpress.png";
import masterCard from "../assets/masterCard.webp";
import payPal from "../assets/payPal.png";
import appleStore from "../assets/appleStore.png";
import googlePlay from "../assets/googlePlay.png";

export default function Footer() {
  return (
    <footer className="custom-navbar py-4">
      <div className="container">
        {/* Form */}
        <div className="mb-3">
          <h3 className="main-color m-0">Get the FreshCart App</h3>
          <p className="second-color fs-6 mb-3">
            We will send you a link, open it on your phone to download the app
          </p>

          <form>
            <div className="d-flex gap-2">
              <input
                type="email"
                className="form-control custom-input w-75"
                placeholder="Email.."
                aria-label="email"
                aria-describedby="addon-wrapping"
              />
              <button
                type="reset"
                className="btn btn-bg text-white fw-bold w-25"
              >
                Share App Link
              </button>
            </div>
            
          </form>
        </div>

        <hr className="my-4 border-top border-secondary opacity-25"/>

        {/* Clients */}
        <div className="d-flex flex-md-row align-items-start justify-content-between gap-3 mt-4">
          {/* Payment Partners*/}
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <p className="navbar-brand fs-6 fw-normal m-0">Payment Partners</p>
              <img
                src={amazonPay}
                alt="Amazon Pay"
                style={{ height: "15px" }}
              />
              <img
                src={americanExpress}
                alt="American Express"
                style={{ height: "30px" }}
              />
              <img
                src={masterCard}
                alt="Master Card"
                style={{ height: "30px" }}
              />
              <img src={payPal} alt="payPal" style={{ height: "30px" }} />
            </div>

            {/* App Stores */}
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <p className="navbar-brand fs-6 fw-normal m-0">Get Delivers with FreshCart</p>
              <img src={appleStore} alt="Apple Store" style={{height: "30px"}}/>
              <img src={googlePlay} alt="Google Play" style={{height: "35px"}}/>
            </div>
        </div>

        <hr className="my-4 border-top border-secondary opacity-25"/>


        
      </div>
    </footer>
  );
}
