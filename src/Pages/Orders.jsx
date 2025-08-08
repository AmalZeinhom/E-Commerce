import React, { useEffect, useContext, useState } from "react";
import { cartContext } from "../Context/CartContext";
import axios from "axios";
import { NavLink, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruckFast,
  faCheckSquare,
  faTimesSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import BackButton from "../Components/BackButton";

export default function Orders() {
  const { userToken } = useContext(cartContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dateOnly = new Date(orders.createdAt).toLocaleDateString();

  async function getOrders() {
    const userId = localStorage.getItem("userId");
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setOrders(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div>
        <div className="d-flex align-items-center gap-3 mb-3">
          <BackButton/>
          <h3 className="fw-bold" style={{ color: "rgb(1, 133, 76)" }}>
            Track Your Orders
          </h3>
          <FontAwesomeIcon
            icon={faTruckFast}
            style={{ width: "30px", height: "30px", color: "#00cc74" }}
          />
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <p className="text-success text-center fw-medium">
            There is no Products yet.
          </p>
          <button className="btn btn-success fw-bold px-3" onClick={() => navigate('/products')}>
            Add Your First Product in the Cart
          </button>
        </div>
      ) : (
        orders.map((order, index) => (
          <div
            key={order._id}
            className="p-4 mb-4"
            style={{ border: "1px dashed #b3b3b3", borderRadius: "5px" }}
          >
            <p
              style={{
                color: "rgb(1, 133, 76)",
                fontWeight: "700",
                fontSize: "25px",
              }}
            >
              Order #{index + 1}
            </p>
            <div
              className="d-flex justify-content-between align-items-center p-4 pb-0"
              style={{ color: "rgb(1, 133, 76)", fontWeight: "500" }}
            >
              <p>
                Transaction Number:
                <span className="ms-2" style={{ color: "#00cc74" }}>
                  #{order.id}
                </span>
              </p>
              <p>
                Placed On:
                <span className="ms-2" style={{ color: "#00cc74" }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </p>
              <p>
                Payment Method:
                <span className="ms-2" style={{ color: "#00cc74" }}>
                  {order.paymentMethodType}
                </span>
              </p>
              <p
                className="btn p-1 text-white"
                style={{ backgroundColor: "#00cc74", fontSize: "14px" }}
                onClick={() => navigate("/products")}
              >
                Add New Items
              </p>
            </div>

            <hr />

            <div className="row mt-5">
              {order.cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="col-md-4 d-flex mb-3 align-items-center"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="me-3"
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <NavLink
                      className="mb-1"
                      style={{ color: "rgb(1, 133, 76)", fontWeight: "500" }}
                      onClick={() =>
                        navigate(`/productDetails/${item.product._id}`)
                      }
                    >
                      {item.product.title.split(" ").slice(0, 3).join(" ")}
                    </NavLink>
                    <p
                      className="mb-0"
                      style={{ color: "rgb(1, 133, 76)", fontWeight: "400" }}
                    >
                      Price:
                      <span style={{ color: "#00cc74" }}>{item.price} EGP</span>
                    </p>
                    <p
                      className="mb-0"
                      style={{ color: "rgb(1, 133, 76)", fontWeight: "400" }}
                    >
                      Quantity:
                      <span style={{ color: "#00cc74" }}>{item.count}</span>
                    </p>
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "14px",
                        color: "#b3b3b3ff",
                        fontWeight: "500",
                      }}
                    >
                      {item.product.category.name}
                    </p>
                    <p
                      className="mb-0"
                      style={{
                        fontSize: "14px",
                        color: "#b3b3b3ff",
                        fontWeight: "500",
                      }}
                    >
                      {item.product.brand.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="border rounded p-3 bg-light"
              style={{ color: "rgb(1, 133, 76)" }}
            >
              <strong className="d-block mb-4">Shipping Info:</strong>
              <div className="row">
                <div className="col-md-4 mb-2">
                  <strong>Total Price:</strong>{" "}
                  <span style={{ color: "#00cc74", fontWeight: "500" }}>
                    {order.totalOrderPrice} EGP
                  </span>
                </div>
                <div className="col-md-4 mb-2 d-flex align-items-center gap-2">
                  <strong>Paid:</strong>
                  <span className="text-success">
                    <FontAwesomeIcon
                      icon={faCheckSquare}
                      style={{ color: "#00cc74" }}
                    />{" "}
                    <span style={{ color: "#00cc74", fontWeight: "500" }}>
                      Yes
                    </span>
                  </span>
                </div>
                <div className="col-md-4 mb-2 d-flex align-items-center gap-2">
                  <strong>Delivered:</strong>
                  <span className="text-danger">
                    <FontAwesomeIcon icon={faTimesSquare} /> No
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <strong>City:</strong>{" "}
                  <span style={{ color: "#00cc74", fontWeight: "500" }}>
                    {order.shippingAddress.city}
                  </span>
                </div>
                <div className="col-md-4">
                  <strong>Phone:</strong>{" "}
                  <span style={{ color: "#00cc74", fontWeight: "500" }}>
                    {order.shippingAddress.phone}
                  </span>
                </div>
                <div className="col-md-4">
                  <strong>Details:</strong>{" "}
                  <span style={{ color: "#00cc74", fontWeight: "500" }}>
                    {order.shippingAddress.details}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
