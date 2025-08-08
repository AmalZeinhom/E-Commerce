import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";
import BackButton from "../Components/BackButton";

export default function Categories() {
  let [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  let [loading, setLoading] = useState(false);

  async function getAllCategories() {
    setLoading(true);
    let { data } = await axios(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    setCategories(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  if(loading){
    return <Loader/>
  }

  return (
    <>
      <hr className="mt-4" />
      <p className="text-center title">Shop by Category</p>
      <hr />

      <div className="container">
        
        {searchParams.get("id") ? (
          
          <Outlet />
        ) : (
          <div>
            <BackButton/>
            <div className="row">
            {categories.map((category) => (
              <div className="col-lg-2 col-md-6">
                <div
                  key={category._id}
                  className="catCard border-0 d-flex align-items-center justify-content-center"
                >
                  <NavLink to={`subCategory?id=${category._id}`}>
                    <img
                      src={category.image}
                      className="cat-Img"
                      alt={category.image}
                      style={{
                        height: "140px",
                        width: "140px",
                        objectFit: "cover",
                      }}
                    />
                  </NavLink>
                </div>
                <p className="catText text-center pt-1">{category.name}</p>
              </div>
            ))}
          </div>
          </div>
        )}
      </div>
    </>
  );
}
