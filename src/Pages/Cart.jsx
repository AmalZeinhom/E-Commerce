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

export default function Cart() {
  let { cart, getLoggedUserCart, clearCart, loading } = useContext(CartContext);
  const isCartEmpty = cart?.data?.products?.length === 0;
  const totalPrice = cart?.data?.products.reduce((acc, item) => {
    return acc + item.price * item.count; 
  }, 0);
  const checkOut = useRef(null);

  const scrollToCheckOut = () => {
  checkOut.current?.scrollIntoView({ behavior: "smooth" });
};


  useEffect(() => {
    getLoggedUserCart();
  });

  useEffect(() => {
  console.log(cart?.data?.products);
}, [cart]);

  return (
    <div className="container py-5 cart-bg my-5 rounded-5">
      <header className="d-flex justify-content-between align-items-center px-5 mb-5">
        <span className="d-flex align-items-center gap-3">
          <BackButton/>
          <h4 className="fw-bold" style={{ color: "rgb(1, 133, 76)" }}>
            Shop Cart
          </h4>
          <FontAwesomeIcon
            icon={faOpencart}
            style={{ width: "20px", height: "20px", color: "#00cc74" }}
          />
        </span>

        <span>
          <p className="fw-bold" style={{ color: "rgb(1, 133, 76)" }}>
            Total Price: {totalPrice}
          </p>
          <NavLink
            className="btn border-1 rounded-2 check-out"
            onClick={scrollToCheckOut}
          >
            Check Out
          </NavLink>
        </span>
      </header>

      {loading ? (
        <div>
          {[...Array(3)].map((_, i) => (
            <div className="mb-4 p-3 border rounded-4" key={i}>
              <Skeleton height={30} width={150} />
              <Skeleton height={20} count={2} />
            </div>
          ))}
        </div>
      ) : isCartEmpty ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <p className="text-success text-center fw-medium">
            There is no Products yet.
          </p>
          <NavLink className="btn btn-success fw-bold px-3" to={"/products"}>
            Add Your First Product in the Cart
          </NavLink>
        </div>
      ) : (
        <>
          {cart?.data?.products?.map((item) => (
            <CartItems item={item} />
          ))}
        </>
      )}

      {!isCartEmpty && !loading && (
        <div className="d-flex justify-content-end me-5 ">
        <button
          className="btn btn-danger text-white fs-6 fw-bold mt-5 d-flex align-items-center gap-2"
          onClick={clearCart}
        >
          <motion.div
            whileHover={{
              x: [0, -4, 4, -4, 4, 0],
            }}
            transition={{
              duration: 0.5,
              ease: easeInOut,
            }}
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "20px",
              height: "20px",
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </motion.div>
          Clear All Products
        </button>
      </div>
      )}

      {!isCartEmpty && <Checkout ref = {checkOut} totalPrice = {cart?.data?.totalCartPrice}/>}
    </div>    
  );
}
