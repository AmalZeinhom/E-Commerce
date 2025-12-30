import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
import Loader from "../Components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import { WishListContext } from "../Context/WighListContextSeperate.jsx";
import BackButton from "../Components/BackButton";
import { CartContext } from "../Context/CartContextSeperate.jsx";

export default function ProductDetails() {
  //id is the dynamic variable in the productDetails route on App.jsx
  let { id } = useParams();
  let [product, setProducts] = useState(null);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [ setLoading] = useState(false);
  let { wishList } = useContext(WishListContext);
  let { addProductToWishList } = useContext(WishListContext);
  let { addProductsToCart } = useContext(CartContext);

  async function getProductDetails() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProducts(data.data);
      console.log(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  });

  useEffect(() => {
    if (!product || !product.images) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [product]);

  // if (!product) return <div className="text-center py-5">Loading...</div>;

  if (!product) {
    return <Loader />;
  }
  return (
    <div className="container py-5 register-card">
      <div className="row">
        {/* ====================Main image slideshow======================= */}
        <div className="slidShow col-md-4 d-flex justify-content-center align-items-center flex-column">
          {product && product.images && (
            <div>
              <img
                src={product.images[currentIndex]}
                alt="product"
                className="mb-3"
                style={{
                  width: "250px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          )}

          {/* =======================Thumbnails========================== */}
          <div>
            <Swiper
              direction="horizontal"
              spaceBetween={10}
              slidesPerView={3}
              loop={true}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              style={{ height: "150px", width: "300px", border: "20px" }}
            >
              {product?.images.map((image, index) => (
                <SwiperSlide key={`thumb-${index}`}>
                  <img
                    src={image}
                    alt={`product-thumb-${index}`}
                    style={{
                      width: "90px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      border:
                        currentIndex === index
                          ? "5px solid rgb(1, 133, 76)"
                          : "none",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="details col-md-8 position-relative">
          <span
            className="position-absolute"
            style={{ top: "0", right: "10%" }}
          >
            <BackButton />
          </span>
          <span>
            <p className="specific-title">
              {product.title.split(" ", 5).join(" ")}
            </p>
            <p className="specific-text mb-0">{product.category.name}</p>
          </span>

          <span className="specific-brand">
            {product.brand.name} |
            {product.quantity > 0 ? (
              <span style={{ color: "#00cc74" }}>Available</span>
            ) : (
              <span className="text-danger">Sold Out</span>
            )}
          </span>

          <span className="d-flex gap-2 specific-rate mb-3">
            <i>
              <FontAwesomeIcon
                icon={faStar}
                style={{ color: "rgb(249, 115, 22)" }}
              />
            </i>
            {product.ratingsAverage}
          </span>

          <p style={{ color: "rgb(107, 114, 128)" }}>{product.description}</p>

          <span className="d-flex gap-3 align-items-center mt-2">
            {product.priceAfterDiscount &&
            product.priceAfterDiscount !== product.price ? (
              <>
                <p
                  className="specific-price text-decoration-line-through"
                  style={{ color: "rgb(107, 114, 128)" }}
                >
                  EGP {product.price}
                </p>
                <p className="specific-discount fw-bold">
                  EGP {product.priceAfterDiscount}
                </p>
              </>
            ) : (
              <p className="specific-discount fw-bold">EGP {product.price}</p>
            )}
          </span>

          <div className="div d-flex gap-2 list">
            <NavLink
              className="btn btn-fav"
              to={"/wishlist"}
              onClick={() => {
                addProductToWishList(product);
              }}
            >
              <FontAwesomeIcon
                icon={!wishList?.data?.length ? faHeart : faHeartCirclePlus}
                style={{ color: "white" }}
              />
            </NavLink>
            <button
              onClick={() => {
                addProductsToCart(product);
              }}
              className="btn btn-add text-white fw-bold w-100"
            >
              <span>
                <FontAwesomeIcon icon={faCartPlus} />
              </span>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
