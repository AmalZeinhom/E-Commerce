import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  faStar,
  faEye,
  faShoppingCart,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cartContext } from "../Context/CartContext";
import { wishListContext } from "../Context/WishListContext";

export default function Card({ product }) {
  let { addProductsToCart } = useContext(cartContext);
  let { addProductToWishList } = useContext(wishListContext);

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
        <header className="position-relative">
          <img
            src={product.imageCover}
            className="card-img-top"
            alt={product.title}
            style={{ height: "250px", objectFit: "cover" }}
          />

          <div className="layer position-absolute d-flex justify-content-center align-items-center  gap-4">
            <NavLink
              className="icon"
              onClick={() => {
                addProductToWishList(product);
              }}
            >
              <FontAwesomeIcon icon={faHeart} style={{ color: "white" }} />
            </NavLink>
            <NavLink
              className="icon"
              onClick={() => {
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
