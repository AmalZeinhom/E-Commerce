import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  faStar,
  faEye,
  faShoppingCart,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CartContext } from "../Context/CartContextSeperate.jsx";
import { WishListContext } from "../Context/WighListContextSeperate.jsx";
import { AuthContext } from "../Context/AuthContextSeperate.jsx";
import toast from "react-hot-toast";

export default function Card({ product }) {
  let { addProductsToCart } = useContext(CartContext);
  let { addProductToWishList } = useContext(WishListContext);
  let { token } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="card card-design h-100">
        {product.priceAfterDiscount && (
          <div className="discount-badge d-flex justify-content-center align-items-center flex-column">
            -
            {Math.round(
              ((product.price - product.priceAfterDiscount) / product.price) *
                100
            )}
            %<span>Sale</span>
          </div>
        )}

        <header className="position-relative overflow-hidden">
          <img
            src={product.imageCover}
            className="card-img-top"
            alt={product.title}
            style={{ height: "250px", objectFit: "cover" }}
          />

          <div className="layer position-absolute">
            <NavLink
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                if (!token) {
                  toast.error("Please login to add favorites");
                  navigate("/login");
                  return;
                }
                addProductToWishList(product._id);
              }}
            >
              <FontAwesomeIcon icon={faHeart} style={{ color: "white" }} />
            </NavLink>
            <NavLink
              className="icon"
              onClick={(e) => {
                e.preventDefault();
                if (!token) {
                  toast.error("Please login to add items to cart");
                  navigate("/login");
                  return;
                }
                addProductsToCart(product._id);
              }}
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
                style={{ color: "white" }}
              />
            </NavLink>
            <NavLink className="icon" to={`/productDetails/${product._id}`}>
              <FontAwesomeIcon icon={faEye} style={{ color: "white" }} />
            </NavLink>
          </div>
        </header>

        <div className="card-body d-flex justify-content-between mt-2 flex-column">
          <div>
            <p className="card-title">
              {product.title.split(" ", 4).join(" ")}
            </p>
            <p className="card-text card-category">{product.category.name}</p>
          </div>

          <div className="card-brand">
            {product.brand.name} |
            {product.quantity > 0 ? (
              <span style={{ color: "#00cc74" }}>Available</span>
            ) : (
              <span className="text-danger">Sold Out</span>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2">
            <span className="card-price">EGP {product.price}</span>
            <span className="d-flex gap-2 card-rate">
              <i>
                <FontAwesomeIcon icon={faStar} />
              </i>
              {product.ratingsAverage}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
