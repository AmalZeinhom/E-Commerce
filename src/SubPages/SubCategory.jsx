import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "../Components/Card";
import BackButton from "../Components/BackButton";

export default function SubCategory() {
  let [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");

  async function getProductsByCategory(categoryId) {
    let { data } = await axios(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`
    );
    setProducts(data.data);
  }

  useEffect(() => {
    if (categoryId) {
      getProductsByCategory(categoryId);
    }
  }, [categoryId]);

  return (
    
    <div className="container">    
        <BackButton/> 
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-3 mb-3 mt-3">
            {/* props to display data */}
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
