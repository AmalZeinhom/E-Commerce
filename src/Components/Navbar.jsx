import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faOpencart,
  faFacebook,
  faInstagram,
  faXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faShoppingCart,
  faHeartCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { cartContext } from "../Context/CartContext";
import { authContext } from "../Context/AuthContext";
import { wishListContext } from "../Context/WishListContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  let { cart } = useContext(cartContext);
  let { wishList } = useContext(wishListContext);
  let { token, setToken } = useContext(authContext);
  let [counter, setCounter] = useState(cart?.numOfCartItems);

  function handleLogOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  useEffect(() => {
    setCounter(cart?.numOfCartItems);
  }, [cart]);

  return (
    <nav className="fixed-top navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <NavLink className="navbar-brand text-nowrap" onClick={() => navigate('/')}>
          <FontAwesomeIcon icon={faOpencart} className="me-2" />
          <span>FreshCart</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Pages */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/brands">
                Brands
              </NavLink>
            </li>
            {token ? (
              <li className="nav-item">
                <NavLink className="nav-link" to="/orders">
                  Orders
                </NavLink>
              </li>
            ) : null}
          </ul>

          {/* Social Media */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            {token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/wishlist"}>
                    <motion.div
                    whileHover={{rotate: [0, -10, 10, -10, 0],}}
                      style={{
                        display: "inline-block",
                        color: "#00cc74",
                        transformOrigin: "bottom center",
                      }}
                      animate={{
                        rotate: [0, -10, 10, -10, 0], // الدوران بالدرجات
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={
                          !wishList?.data?.length ? faHeart : faHeartCirclePlus
                        }
                        className="me-2"
                        color="green"
                      />
                    </motion.div>
                  </NavLink>
                </li>

                <li className="nav-item position-relative">
                  <NavLink className="nav-link" to={"/cart"}>
                    <FontAwesomeIcon
                      icon={faShoppingCart}
                      className="me-2"
                      color="green"
                    />
                  </NavLink>
                  <div
                    className="cart-number top-0 start-0 text-white rounded-5 fw-bold d-flex justify-content-center align-items-center position-absolute"
                    style={{
                      width: "20px",
                      height: "20px",
                      fontSize: "12px",
                      backgroundColor: "#00cc74",
                      display: counter >= 0 ? "flex" : "none",
                    }}
                  >
                    {counter}
                  </div>
                </li>
              </>
            ) : null}

            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="me-2"
                  color="blue"
                />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="me-2"
                  color="red"
                />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                <FontAwesomeIcon
                  icon={faXTwitter}
                  className="me-2"
                  color="black"
                />
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="me-2"
                  color="blue"
                />
              </NavLink>
            </li>
            {!token ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signUp">
                    Sign up
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <span className="nav-link" role="button" onClick={handleLogOut}>
                  Log Out
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
