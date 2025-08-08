import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../Components/Card";
import NotFound from "../Pages/NotFound";

export default function SubBrands() {
  let [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const brandId = searchParams.get("id");

  async function getProductsByBrand(brandId) {
    let { data } = await axios(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    const filtered = data.data.filter(
      (product) => product.brand?._id === brandId
    );
    setProducts(filtered);
  }

  useEffect(() => {
    if (brandId) {
      getProductsByBrand(brandId);
    }
  }, [brandId]);

  return (
    <>
      <div className="container">
        <div className="row">
          {products.length === 0 ? (
            <NotFound />
          ) : (
            products.map((product) => (
              <div className="col-md-3 mb-3">
                <Card key={product._id} product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
