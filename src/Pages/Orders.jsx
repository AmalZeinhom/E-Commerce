import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-bootstrap";
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
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getOrders() {
    const userId = localStorage.getItem("userId");
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      );
      setOrders(data);
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
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mt-5 orders-page">
      {/* 🔴 MODIFIED: header wrapper for responsive */}
      <div className="orders-header d-flex align-items-center gap-3 mb-4">
        <BackButton />
        <h3 className="fw-bold text-success mb-0">Track Your Orders</h3>
        <FontAwesomeIcon icon={faTruckFast} className="orders-icon" />
      </div>

      {orders.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center flex-column text-center">
          <p className="text-success fw-medium">There is no Products yet.</p>
          <button
            className="btn btn-success fw-bold px-3"
            onClick={() => navigate("/products")}
          >
            Add Your First Product in the Cart
          </button>
        </div>
      ) : (
        orders.map((order, index) => (
          <div key={order._id} className="order-card p-4 mb-4">
            <p className="order-title">Order #{index + 1}</p>

            {/* 🔴 MODIFIED: order info becomes responsive grid */}
            <div className="order-info">
              <p>
                Transaction:
                <span> #{order.id}</span>
              </p>
              <p>
                Placed On:
                <span> {new Date(order.createdAt).toLocaleDateString()}</span>
              </p>
              <p>
                Payment:
                <span> {order.paymentMethodType}</span>
              </p>
              <button
                className="btn btn-success btn-sm"
                onClick={() => navigate("/products")}
              >
                Add New Items
              </button>
            </div>

            <hr />

            {/* 🔴 MODIFIED: products responsive grid */}
            <div className="row mt-4">
              {order.cartItems?.map((item) => (
                <div key={item._id} className="col-lg-4 col-md-6 col-12 mb-4">
                  <div className="order-product d-flex gap-3">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                    />
                    <div>
                      <NavLink
                        className="product-title"
                        onClick={() =>
                          navigate(`/productDetails/${item.product._id}`)
                        }
                      >
                        {item.product.title}
                      </NavLink>
                      <p>
                        Price: <span>{item.price} EGP</span>
                      </p>
                      <p>
                        Qty: <span>{item.count}</span>
                      </p>
                      <p className="muted">{item.product.category.name}</p>
                      <p className="muted">{item.product.brand.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔴 MODIFIED: shipping info responsive */}
            <div className="shipping-box mt-3">
              <strong className="d-block mb-3">Shipping Info:</strong>

              <div className="row">
                <div className="col-md-4 col-12 mb-2">
                  Total:
                  <span> {order.totalOrderPrice} EGP</span>
                </div>

                <div className="col-md-4 col-12 mb-2 d-flex gap-2 align-items-center">
                  Paid:
                  <FontAwesomeIcon
                    icon={faCheckSquare}
                    className="text-success"
                  />
                  <span>Yes</span>
                </div>

                <div className="col-md-4 col-12 mb-2 d-flex gap-2 align-items-center">
                  Delivered:
                  <FontAwesomeIcon
                    icon={faTimesSquare}
                    className="text-danger"
                  />
                  <span>No</span>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-4 col-12 mb-2">
                  City:
                  <span> {order.shippingAddress.city}</span>
                </div>
                <div className="col-md-4 col-12 mb-2">
                  Phone:
                  <span> {order.shippingAddress.phone}</span>
                </div>
                <div className="col-md-4 col-12 mb-2">
                  Details:
                  <span> {order.shippingAddress.details}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
