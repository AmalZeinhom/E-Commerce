import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faMinus,
  faPlus,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { CartContext } from "../Context/CartContextSeperate.jsx";
import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function CartItems({ item }) {
  const MotionIcon = motion(FontAwesomeIcon);
  let { removeProductFromCart, loading } = useContext(CartContext);
  const [count, setCount] = useState(item.count);
  const [totalPrice, setTotalPrice] = useState(item.price * item.count);

  useEffect(() => {
    setTotalPrice(item.price * count);
  }, [count, item.price]);

  return (
    <div className="cart-item-wrapper">
      <div className="pro-section d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4 mb-4 px-3 px-lg-5">

        <div className="text-center flex-shrink-0">
          {loading ? (
            <Skeleton width={180} height={180} borderRadius={20} />
          ) : (
            <img
              src={item?.product?.imageCover}
              alt={item?.product?.title}
              className="cart-item-image"
            />
          )}
        </div>

        <div className="data-sec text-center text-lg-start">
          <h5 className="fw-bold text-success mb-2">{item?.product?.title}</h5>

          <p className="mb-1 fw-bold text-success">
            Rate:
            <span className="ms-2 text-warning">
              <FontAwesomeIcon icon={faStar} />
              <span className="ms-1">{item?.product?.ratingsAverage}</span>
            </span>
          </p>

          <p className="fw-bold text-success mb-1">
            Price:
            <span className="ms-2 text-success">EGP {item?.price}</span>
          </p>

          <p className="text-secondary mb-0">
            {item?.product?.category?.name} | {item?.product?.brand?.name} |
            <span className="text-success fw-medium ms-1">Available</span>
          </p>
        </div>

        <div className="d-flex flex-column flex-md-row align-items-center gap-3 gap-md-4">

          <div className="border rounded-4 px-3 py-2 d-flex align-items-center">
            <FontAwesomeIcon
              icon={faMinus}
              className="me-3 text-success quantity-btn"
              onClick={() => count > 1 && setCount(count - 1)}
            />
            <span className="fw-bold text-success">{count}</span>
            <FontAwesomeIcon
              icon={faPlus}
              className="ms-3 text-success quantity-btn"
              onClick={() => setCount(count + 1)}
            />
          </div>

          <div className="text-center text-md-start">
            <p className="mb-0 small fw-bold text-success">Total Price</p>
            <p className="mb-0 fw-medium text-success">EGP {totalPrice}</p>
          </div>

          <motion.div
            whileHover={{ rotate: 90, backgroundColor: "#f8d7da" }}
            transition={{ duration: 0.3 }}
            className="remove-btn d-flex justify-content-center align-items-center"
            onClick={() => removeProductFromCart(item.product._id)}
          >
            <MotionIcon icon={faRemove} whileHover={{ color: "#dc3545" }} />
          </motion.div>
        </div>
      </div>

      <hr className="cart-divider" />
    </div>
  );
}
