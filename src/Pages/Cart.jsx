import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import { easeInOut } from "framer-motion";
import CartItems from "../SubPages/CartItems";
import { CartContext } from "../Context/CartContextSeperate.jsx";
import React, { useContext, useEffect, useRef } from "react";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import Checkout from "../SubPages/Checkout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BackButton from "../Components/BackButton";
import { motion as Motion } from "framer-motion";

export default function Cart() {
  let { cart, getLoggedUserCart, clearCart, loading } = useContext(CartContext);

  const isCartEmpty = cart?.data?.products?.length === 0;

  const totalPrice =
    cart?.data?.products.reduce((acc, item) => {
      return acc + item.price * item.count;
    }, 0) || 0;

  const checkOut = useRef(null);

  const scrollToCheckOut = () => {
    checkOut.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <div className="container py-4 py-lg-5 cart-bg my-4 my-lg-5 rounded-5">
      {/* ================= HEADER ================= */}
      <header className="cart-header d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 gap-md-0 mb-4 px-3 px-lg-5">
        <div className="d-flex align-items-center gap-3">
          <BackButton />
          <h4 className="fw-bold text-success mb-0">Shop Cart</h4>
          <FontAwesomeIcon icon={faOpencart} className="text-success" />
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-2">
          <p className="fw-bold text-success mb-0">
            Total Price: EGP {totalPrice}
          </p>

          <NavLink
            className="btn check-out"
            onClick={scrollToCheckOut}
          >
            Check Out
          </NavLink>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      {loading ? (
        <div className="px-3 px-lg-5">
          {[...Array(3)].map((_, i) => (
            <div className="mb-4 p-3 border rounded-4" key={i}>
              <Skeleton height={30} width={150} />
              <Skeleton height={20} count={2} />
            </div>
          ))}
        </div>
      ) : isCartEmpty ? (
        <div className="d-flex justify-content-center align-items-center flex-column gap-3 text-center">
          <p className="text-success fw-medium mb-0">
            There is no products yet.
          </p>
          <NavLink className="btn btn-success fw-bold px-4" to="/products">
            Add Your First Product
          </NavLink>
        </div>
      ) : (
        <>
          {cart?.data?.products?.map((item) => (
            <CartItems key={item.product._id} item={item} />
          ))}
        </>
      )}

      {/* ================= CLEAR CART ================= */}
      {!isCartEmpty && !loading && (
        <div className="d-flex justify-content-center justify-content-md-end px-3 px-lg-5">
          <button
            className="btn btn-danger fw-bold mt-4 d-flex align-items-center gap-2"
            onClick={clearCart}
          >
            <Motion.div
              whileHover={{ x: [0, -4, 4, -4, 4, 0] }}
              transition={{ duration: 0.5, ease: easeInOut }}
              className="d-flex justify-content-center align-items-center"
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Motion.div>
            Clear All Products
          </button>
        </div>
      )}

      {/* ================= CHECKOUT ================= */}
      {!isCartEmpty && (
        <div ref={checkOut} className="mt-5">
          <Checkout totalPrice={cart?.data?.totalCartPrice} />
        </div>
      )}
    </div>
  );
}
