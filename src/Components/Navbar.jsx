import React, { useContext, useEffect, useState } from "react";
import "../index.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faOpencart,
} from "@fortawesome/free-brands-svg-icons";
import {
  faShoppingCart,
  faHeartCirclePlus,
  faHome,
  faBox,
  faTag,
  faTags,
  faClipboard,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { motion as Motion } from "framer-motion";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { CartContext } from "../Context/CartContextSeperate.jsx";
import { AuthContext } from "../Context/AuthContextSeperate.jsx";
import { WishListContext } from "../Context/WighListContextSeperate.jsx";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  let { cart } = useContext(CartContext);
  let { wishList } = useContext(WishListContext);
  let { token, setToken } = useContext(AuthContext);
  let [counter, setCounter] = useState(cart?.numOfCartItems);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleLogOut() {
    localStorage.removeItem("token");
    setToken(null);
    setIsMobileMenuOpen(false);
    navigate("/login");
  }

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setCounter(cart?.numOfCartItems);
  }, [cart]);

  return (
    <>
      <nav className="fixed-top navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <div className="d-flex align-items-center gap-4 w-100">
            {/* Logo */}
            <NavLink
              className="navbar-brand text-nowrap me-0"
              onClick={() => {
                navigate("/");
                closeMenu();
              }}
            >
              <span className="brand-text-logo">
                <FontAwesomeIcon icon={faOpencart} className="me-2" />
                FreshCart
              </span>
            </NavLink>

            {/* Desktop Navigation Links - Left Side */}
            <ul className="navbar-nav d-none d-lg-flex gap-2 ms-4">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                  to="/"
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/products"
                  onClick={closeMenu}
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/categories"
                  onClick={closeMenu}
                >
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands" onClick={closeMenu}>
                  Brands
                </NavLink>
              </li>
              {token ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/orders"
                    onClick={closeMenu}
                  >
                    Orders
                  </NavLink>
                </li>
              ) : null}
            </ul>

            <div className="flex-grow-1"></div>

            <ul className="navbar-nav d-none d-lg-flex order-lg-2">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={"/wishlist"}
                  onClick={(e) => {
                    if (!token) {
                      e.preventDefault();
                      toast.error("Please login to view favorites");
                      navigate("/login");
                    } else {
                      closeMenu();
                    }
                  }}
                >
                  <Motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    style={{
                      display: "inline-block",
                      color: "#00cc74",
                      transformOrigin: "bottom center",
                    }}
                    animate={{
                      rotate: [0, -10, 10, -10, 0],
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
                  </Motion.div>
                </NavLink>
              </li>

              <li className="nav-item position-relative">
                <NavLink
                  className="nav-link"
                  to={"/cart"}
                  onClick={(e) => {
                    if (!token) {
                      e.preventDefault();
                      toast.error("Please login to view your cart");
                      navigate("/login");
                    } else {
                      closeMenu();
                    }
                  }}
                >
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
            </ul>

            <ul className="navbar-nav d-none d-lg-flex gap-1 order-lg-3">
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
                    <NavLink
                      className="nav-link"
                      to="/Login"
                      onClick={closeMenu}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/signUp"
                      onClick={closeMenu}
                    >
                      Sign up
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <span
                    className="nav-link"
                    role="button"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </span>
                </li>
              )}
            </ul>

            <button
              className="navbar-toggler d-lg-none ms-2"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <FontAwesomeIcon
                icon={isMobileMenuOpen ? faTimes : faBars}
                size="lg"
              />
            </button>
          </div>

          <button
            className="navbar-toggler d-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse d-lg-flex"
            id="navbarSupportedContent"
          ></div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <Motion.div
          className="mobile-menu-dropdown d-lg-none"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="mobile-nav-section">
            <h6 className="mobile-nav-title">Navigation</h6>
            <NavLink
              className={({ isActive }) =>
                isActive ? "mobile-nav-item active" : "mobile-nav-item"
              }
              to="/"
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faHome} className="me-3" />
              <span>Home</span>
            </NavLink>
            <NavLink
              className="mobile-nav-item"
              to="/products"
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faBox} className="me-3" />
              <span>Products</span>
            </NavLink>
            <NavLink
              className="mobile-nav-item"
              to="/categories"
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faTag} className="me-3" />
              <span>Categories</span>
            </NavLink>
            <NavLink
              className="mobile-nav-item"
              to="/brands"
              onClick={closeMenu}
            >
              <FontAwesomeIcon icon={faTags} className="me-3" />
              <span>Brands</span>
            </NavLink>
            {token ? (
              <NavLink
                className="mobile-nav-item"
                to="/orders"
                onClick={closeMenu}
              >
                <FontAwesomeIcon icon={faClipboard} className="me-3" />
                <span>Orders</span>
              </NavLink>
            ) : null}

            <div className="d-flex justify-content-center align-items-center">
              <NavLink
                className="mobile-nav-item"
                to={"/wishlist"}
                onClick={(e) => {
                  if (!token) {
                    e.preventDefault();
                    toast.error("Please login to view favorites");
                    navigate("/login");
                  } else {
                    closeMenu();
                  }
                }}
              >
                <FontAwesomeIcon icon={faHeart} className="me-3" color="red" />
                <span>Wishlist</span>
              </NavLink>

              <NavLink
                className="mobile-nav-item"
                to={"/cart"}
                onClick={(e) => {
                  if (!token) {
                    e.preventDefault();
                    toast.error("Please login to view your cart");
                    navigate("/login");
                  } else {
                    closeMenu();
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="me-3"
                  color="green"
                />
                <span>Cart</span>
              </NavLink>
            </div>
          </div>

          <div className="mobile-nav-section border-top">
            <h6 className="mobile-nav-title">Account</h6>
            {!token ? (
              <>
                <NavLink
                  className="mobile-nav-item"
                  to="/Login"
                  onClick={closeMenu}
                >
                  <span>Login</span>
                </NavLink>
                <NavLink
                  className="mobile-nav-item"
                  to="/signUp"
                  onClick={closeMenu}
                >
                  <span>Sign Up</span>
                </NavLink>
              </>
            ) : (
              <button
                className="mobile-nav-item w-100 text-start"
                onClick={handleLogOut}
              >
                <span>Log Out</span>
              </button>
            )}
          </div>

          <div className="mobile-nav-section border-top">
            <h6 className="mobile-nav-title">Follow Us</h6>
            <div className="mobile-social-links">
              <NavLink to="#" className="social-icon-mobile">
                <FontAwesomeIcon icon={faFacebook} color="blue" />
              </NavLink>
              <NavLink to="#" className="social-icon-mobile">
                <FontAwesomeIcon icon={faInstagram} color="red" />
              </NavLink>
              <NavLink to="#" className="social-icon-mobile">
                <FontAwesomeIcon icon={faXTwitter} color="black" />
              </NavLink>
              <NavLink to="#" className="social-icon-mobile">
                <FontAwesomeIcon icon={faLinkedin} color="blue" />
              </NavLink>
            </div>
          </div>
        </Motion.div>
      )}
    </>
  );
}
