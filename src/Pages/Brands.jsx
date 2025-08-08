import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";
import BackButton from "../Components/BackButton";

export default function Brands() {
  let [brands, setBrands] = useState([]);
  let [searchParams] = useSearchParams();
  let [loading, setLoading] = useState(false);

  async function getAllBarnds() {
    setLoading(true)
    let { data } = await axios("https://ecommerce.routemisr.com/api/v1/brands");
    setBrands(data.data);
    setLoading(false)
  }

  useEffect(() => {
    getAllBarnds();
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
          <Outlet/>
        ) : (
          <div>
            <BackButton/>
            <div className="row">
          {brands.map((brand) => (
            <div className="col-md-2 col-sm-4 mb-3">
              <div
                key={brand._id}
                className="circle-card d-flex justify-content-center align-items-center bg-light shadow"
              >
                <NavLink to={`subBrands?id=${brand._id}`}>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    style={{ width: "80px", height: "80px" }}
                  />
                </NavLink>
              </div>
            </div>
          ))}
        </div>
          </div>
        )}
      </div>
    </>
  );
}
