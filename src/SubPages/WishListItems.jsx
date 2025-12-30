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

export default function WishListItems({item}) {
    const { loading } = useContext(CartContext);
    let { removeItemFromWishList } = useContext(WishListContext);
    const navigate = useNavigate()

  return (
    <div
      key={item._id}
      className="wishlistContent d-flex justify-content-between align-items-center flex-wrap border-bottom pb-4 mb-4"
    >
      <div className="pro-section px-5 d-flex justify-content-between align-items-center mb-5 flex-grow-1">
        <div className="d-flex align-items-center justify-content-center gap-5">
          <div className="text-center">
            {loading ? (
              <Skeleton width={200} borderRadius={50} className="rounded-3" />
            ) : (
              <img
                src={item?.imageCover}
                alt={item?.title}
                style={{
                  width: "200px",
                  height: "auto",
                  borderRadius: "50px",
                  objectFit: "contain",
                }}
                onClick={() => navigate(`/productDetails/${item._id}`)}
              />
            )}
          </div>

          <div
            className="data-sec"
            style={{ maxWidth: "100%", width: "300px" }}
          >
            <p
              className="title-sec fw-bold mb-2 text-success"
              onClick={() => navigate(`/productDetails/${item._id}`)}
              style={{ cursor: "pointer" }}
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
              Price: <span style={{ color: "#00cc74" }}>{item?.price} EGP</span>
            </p>

            <p className="mb-0 text-secondary">
              {item?.category?.name} | {item?.brand?.name || "Unknown"} |
              <span className="text-success fw-medium ms-1">Available</span>
            </p>
          </div>
        </div>
      </div>

      <div className="control d-flex justify-content-center align-items-center gap-3 me-5 col-md-4">
        <div className="btn rounded-5 btn-success d-flex align-items-center gap-2 px-4">
          <FontAwesomeIcon icon={faCartPlus} />
          Add To Cart
        </div>
        <div
          className="btn rounded-5 btn-danger d-flex align-items-center gap-2 px-4"
          onClick={() => {removeItemFromWishList(item._id)}}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          Remove
        </div>
      </div>

      
    </div>
    
  );
}
