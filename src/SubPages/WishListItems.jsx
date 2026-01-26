import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Skeleton from "react-loading-skeleton";
import {
  faStar,
  faTrashCan,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../Context/CartContextSeperate.jsx";
import { WishListContext } from "../Context/WighListContextSeperate.jsx";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextSeperate.jsx";
import toast from "react-hot-toast";

export default function WishListItems({ item }) {
  const { loading, addProductsToCart } = useContext(CartContext);
  const { removeItemFromWishList } = useContext(WishListContext);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  return (
    <div className="wishlistContent container border-bottom pb-4 mb-4">
      <div className="pro-section">
        <div className="img-text">
          <div className="img-wrapper">
            {loading ? (
              <Skeleton width={150} height={150} borderRadius={25} />
            ) : (
              <img
                src={item?.imageCover}
                alt={item?.title}
                onClick={() => navigate(`/productDetails/${item._id}`)}
              />
            )}
          </div>

          <div className="data-sec">
            <p
              className="title-sec fw-bold mb-2 text-success"
              onClick={() => navigate(`/productDetails/${item._id}`)}
            >
              {item?.title}
            </p>

            <p className="mb-0 text-success fw-bold">
              Rate:
              <span style={{ color: "#00cc74" }}>
                <FontAwesomeIcon icon={faStar} className="text-warning mx-2" />
                {item?.ratingsAverage}
              </span>
            </p>

            <p className="fw-bold text-success">
              Price:
              <span style={{ color: "#00cc74" }}> {item?.price} EGP</span>
            </p>

            <p className="mb-0 text-secondary">
              {item?.category?.name} | {item?.brand?.name || "Unknown"} |
              <span className="text-success fw-medium ms-1">Available</span>
            </p>
          </div>
        </div>
      </div>

      <div className="control">
        <button
          className="btn btn-success rounded-5 d-flex justify-content-center align-items-center gap-2 px-4"
          onClick={() => {
            if (!token) {
              toast.error("Please login to add items to cart");
              navigate("/login");
              return;
            }
            addProductsToCart(item._id);
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} />
          Add To Cart
        </button>

        <button
          className="btn btn-danger rounded-5 d-flex align-items-center gap-2 px-4"
          onClick={() => removeItemFromWishList(item._id)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          Remove
        </button>
      </div>
    </div>
  );
}
