import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import main1 from "../assets/main1.jpg";
import main2 from "../assets/main2.jpeg";
import main3 from "../assets/main3.jpg";
import productImg from "../assets/productImg.jpg";
import cartImg from "../assets/cartImg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOpencart } from "@fortawesome/free-brands-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import Products from "./Products";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Loader from "../Components/Loader";
import toast from "react-hot-toast";

export default function Home() {
  const swiperWrappedRef = useRef(null);
  let [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(false);
 


  async function shopByCategory() {
    setLoading(true);
    let { data } = await axios(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    console.log(data.data);

    setLoading(false);
    // toast.success(`Welcome Back ${response.data.name}`);
  }

  useEffect(() => {
    shopByCategory();

     const userName = localStorage.getItem("userName");
    const isFirstLogin = localStorage.getItem("isFirstLogin");
    
    if (userName && isFirstLogin === "true") {
    toast.success(`Welcome, ${userName}! 👋`, {
      duration: 4000,
    });
    localStorage.removeItem("isFirstLogin"); 
  }
  }, []);


  const slideData = [{ imgSrc: main1 }, { imgSrc: main2 }, { imgSrc: main3 }];

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="container">
        <div className="row py-5">
          <div
            className="col-md-8 d-flex justify-content-center align-items-center position-relative"
            style={{ overflow: "hidden" }}
          >
            <div
              className="position-relative"
              style={{ width: "100%", height: "500px" }}
            >
              <div className="container swiper-container">
                <h1
                  className="logo-brand d-flex justify-content-center align-items-center position-absolute bg-white"
                  style={{ top: "10px", left: "10px", zIndex: 2 }}
                >
                  <FontAwesomeIcon icon={faOpencart} className="me-2" />
                  <span>FreshCart</span>
                </h1>
                <h3
                  className="position-absolute bg-opacity-25 text-white bg-light quote"
                  style={{
                    top: "80px",
                    left: "10px",
                    width: "80%",
                    padding: "10px",
                    zIndex: 2,
                  }}
                >
                  Whether you’re looking for the freshest produce, pantry
                  staples, or specialty items, FreshCart brings the supermarket
                  to you, redefining the way you shop for groceries.
                </h3>
                <a href="#products-section">
                  <button
                    className="position-absolute fw-bold text-white border-0 started-btn"
                    style={{ top: "400px", left: "10px", zIndex: 2 }}
                  >
                    Get Started
                  </button>
                </a>
                <div
                  className="position-relative"
                  style={{ width: "100%", height: "500px", overflow: "hidden" }}
                >
                  {" "}
                  <Swiper
                    className="mySwiper"
                    modules={[Pagination]}
                    initialSlide={1}
                    slidesPerView={1}
                    centeredSlides={false}
                    speed={800}
                    loop={true}
                    pagination={{ clickable: true }}
                    onSwiper={(swiper) => {
                      swiperWrappedRef.current = swiper.wrapperEl;
                    }}
                  >
                    {slideData.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={slide.imgSrc}
                          alt={`Slide ${index + 1}`}
                          style={{
                            width: "100%",
                            height: "500px",
                            objectFit: "cover",
                          }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 d-flex justify-content-between flex-column"
            style={{ overflow: "hidden" }}
          >
            <img
              src={productImg}
              alt="product"
              className="img mb-3"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <img
              src={cartImg}
              alt="cart"
              className="img"
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        <div className="shop-by-category">
          <h2 className="cat-title"> Shop Now By Popular Categories </h2>
          <Swiper
            modules={[Navigation]}
            slidesPerView={6}
            spaceBetween={5}
            navigation
            loop
            breakpoints={{
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
            }}
          >
            {categories.map((cat, index) => (
              <SwiperSlide key={index}>
                <NavLink to={`products?id=${cat._id}`}>
                  <img
                    src={cat.image}
                    alt={cat.title}
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </NavLink>
                <h5 className="text-center mb-5 cat-name">{cat.name}</h5>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="shop-by-product" id="products-section">
          <h3 className="text-center fw-bolder shop-title">
            Shop Now By Popular Products
          </h3>
          <Products hideExtras={true} />
        </div>
      </div>
    </>
  );
}
