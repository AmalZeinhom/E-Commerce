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
  }, [count]);

  return (
    <div>
      <div className="pro-section px-5 d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex align-items-center justify-content-center gap-5">
          <div className="text-center">
            {loading ? (
              <Skeleton
                height="auto"
                width={200}
                borderRadius={50}
                className="rounded-3"
              />
            ) : (
              <img
                src={item?.product.imageCover}
                alt=""
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "50px",
                  objectFit: "contain",
                }}
              />
            )}
          </div>

          <div
            className="data-sec"
            style={{ maxWidth: "100%", width: "300px" }}
          >
            <h5 className="title-sec fw-bold mb-2 text-success">
              {item?.product.title}
            </h5>

            <p className="mb-0 text-success fw-bold text-success">
              Rate:
              <span style={{ color: "#00cc74" }}>
                <FontAwesomeIcon icon={faStar} className="text-warning mx-2" />
                {item?.product.ratingsAverage}
              </span>
            </p>

            <p className="fw-bold text-success">
              Price: <span style={{ color: "#00cc74" }}>{item?.price}</span>
            </p>

            <p className="mb-0 text-secondary">
              {item?.product.category.name} | {item?.product.brand.name} |{" "}
              <span className="text-success fw-medium">Available</span>
            </p>
          </div>

          {/* Quantity Control */}
          <div className="d-flex align-items-center gap-3">
            <div className="border rounded-4 px-3 py-2 d-flex align-items-center me-5">
              <FontAwesomeIcon
                icon={faMinus}
                className="me-3 text-success quantity"
                onClick={() => count > 1 && setCount(count - 1)}
              />
              <span className="mx-2 fw-bold text-success">
                {count}
                
              </span>
              <FontAwesomeIcon
                icon={faPlus}
                className="ms-3 text-success quantity"
                onClick={() => setCount(count + 1)}
              />
            </div>

            <span className="me-5">
              <p className="mb-0 text-success small fw-bold">Total Price</p>
              <p className="small fw-medium" style={{ color: "#00cc74" }}>
                EGP {totalPrice}
              </p>
            </span>

            <motion.div
              whileHover={{
                rotate: 90,
                backgroundColor: "#f8d7da", // خلفية خفيفة حوالين الدايرة
              }}
              transition={{ duration: 0.3 }}
              className="rounded-circle d-flex justify-content-center align-items-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#f0f0f0",
                cursor: "pointer",
              }}
            >
              <MotionIcon
                icon={faRemove}
                onClick={() => {
                  removeProductFromCart(item.product._id);
                }}
                style={{ color: "#6c757d", fontSize: "16px" }}
                whileHover={{ color: "#dc3545" }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <hr
        className="mx-auto"
        style={{ borderColor: "rgb(107, 114, 128)", width: "900px" }}
      />
    </div>
  );
}
