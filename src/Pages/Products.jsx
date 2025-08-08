// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios";
// import filterIcon from "../assets/filter.png";
// import React, { useEffect, useState } from "react";
// import {
//   faStar,
//   faArrowLeft,
//   faSearch,
// } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import NotFound from "./NotFound";
// import { useOutletContext, useSearchParams } from "react-router-dom";
// import Card from "../Components/Card";
// import Loader from "../Components/Loader";

// export default function Products({ hideExtras = false }) {
//   let [input, setInput] = useState("");
//   let [products, setProducts] = useState([]);

//   let { showFilters, setShowFilters } = useOutletContext();
//   let [price, setPrice] = useState(0);
//   let [sortOrders, setSortOrders] = useState("");

//   let navigate = useNavigate();

//   let [categories, setCategories] = useState([]);
//   let [brands, setBrands] = useState([]);

//   let [selectedCategories, setSelectedCategories] = useState([]);
//   let [selectedBrands, setSelectedBrands] = useState([]);

//   let [searchParams] = useSearchParams();
//   let categoryId = searchParams.get("id");

//   let [loading, setLoading] = useState(false);

//   let [pagenation, setPagenation] = useState(null)

//   async function getAllProducts(page=1) {

//       setLoading(true)

//       let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}`;

//       // لو فيه categoryId من الرابط، ضيفه للـ URL
//       if (categoryId) {
//         url += `&category[in]=${categoryId}`;
//       }

//       try {
//         let { data } = await axios.get(url);
//         setProducts(data.data);
//         setPagenation(data.metadata)

//         setLoading(false)
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     }

//   useEffect(() => {
//     getAllProducts();

//     // Get Categories
//     axios
//       .get("https://ecommerce.routemisr.com/api/v1/categories")
//       .then((res) => {
//         const allCategories = res.data.data;
//         const allowed = ["Women's Fashion", "Men's Fashion", "Electronics"];
//         const filtered = allCategories.filter((cat) =>
//           allowed.includes(cat.name)
//         );
//         setCategories(filtered);
//       });

//     // Get Brands
//     axios.get("https://ecommerce.routemisr.com/api/v1/brands").then((res) => {
//       const allBrands = res.data.data;
//       const allowed = ["Canon", "Dell", "DeFacto", "Puma"];
//       const filtered = allBrands.filter((brand) =>
//         allowed.includes(brand.name)
//       );
//       setBrands(filtered);
//     });
//   }, [categoryId]);

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.title
//       .toLowerCase()
//       .includes(input.toLowerCase());
//     const matchesCategory =
//       selectedCategories.length === 0 ||
//       selectedCategories.includes(product.category._id);
//     const matchesBrand =
//       selectedBrands.length === 0 || selectedBrands.includes(product.brand._id);
//     const matchesPrice = price === 0 || product.price <= price;

//     return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
//   });

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortOrders === "low") return a.price - b.price;
//     if (sortOrders === "high") return b.price - a.price;
//     return 0;
//   });

//   function handleCloseSidebar() {
//     setShowFilters(false);
//   }

//   function handleResetFilters() {
//     setPrice(0);
//     setInput("");
//     setSelectedBrands([]);
//     setSelectedCategories([]);
//     setSortOrders("low");
//   }

//   if(loading){
//     return <Loader/>
//   }

//   function handlePageChange(x) {
//     getAllProducts(x)
//   }

//   return (
//     <section className="container products-container">
//       {!hideExtras && (
//         <div>
//           {/*  ========== Search Components ========== */}
//           <div>
//             <div className="d-flex justify-content-between align-items-center searchComponent w-50">
//               <button className="btn backToHome" onClick={() => navigate("/")}>
//                 <FontAwesomeIcon icon={faArrowLeft} />
//               </button>

//               <div className="search-container position-relative">
//                 <input
//                   type="text"
//                   id="searchInput"
//                   className="form-control custom-search-input"
//                   placeholder="Search"
//                   aria-label="Search"
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                 />

//                 <FontAwesomeIcon icon={faSearch} className="search-icon" />
//               </div>

//               <button
//                 className="btn"
//                 onClick={() => setShowFilters((prev) => !prev)}
//               >
//                 <img
//                   src={filterIcon}
//                   alt="filter icon"
//                   style={{ height: "30px" }}
//                 />
//               </button>
//             </div>
//           </div>

//           {/* ========== Side Navbar ========== */}
//           <div>
//             {showFilters && (
//               <div
//                 className="position-fixed top-0 start-0 bg-white p-4 sideNavbar"
//                 style={{ width: "300px", height: "100vh", zIndex: "10000" }}
//               >
//                 {/* Sort */}
//                 <div className="sort mb-2">
//                   <p className="fw-bold fs-4">SORT</p>
//                   <p className="fw-medium fs-6">Price:</p>
//                   <div>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="radioDefault"
//                         id="radioDefault1"
//                         value="low"
//                         checked={sortOrders === "low"}
//                         onChange={(e) => setSortOrders(e.target.value)}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="radioDefault1"
//                       >
//                         smaller to Bigger
//                       </label>
//                     </div>
//                     <div className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="radio"
//                         name="radioDefault"
//                         id="radioDefault2"
//                         value="high"
//                         checked={sortOrders === "high"}
//                         onChange={(e) => setSortOrders(e.target.value)}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor="radioDefault2"
//                       >
//                         Bigger to smaller
//                       </label>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="filter d-flex justify-content-center flex-column">
//                   <p className="fw-bold fs-4"> Filter </p>
//                   <label
//                     className="form-label fw-bold mb-2 d-block"
//                     htmlFor="priceRange"
//                   >
//                     Price Range
//                   </label>
//                   <input
//                     type="range"
//                     className="form-range"
//                     id="priceRange"
//                     step="100"
//                     value={price}
//                     min="0"
//                     max="50000"
//                     onChange={(e) => setPrice(Number(e.target.value))}
//                   />
//                   <div className="price-value mt-2  mb-3">
//                     Max Price:
//                     <span className="text-success fw-bold">EGP {price} </span>
//                   </div>
//                 </div>

//                 {/* Categories */}
//                 <div className="checkLists mb-2">
//                   <h6 className="fw-bold mb-2 d-block">Filter by Category:</h6>
//                   {categories.map((category) => (
//                     <div key={category._id} className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value={category._id}
//                         id={`category-${category._id}`}
//                         onChange={(e) => {
//                           const id = e.target.value;
//                           setSelectedCategories((prev) =>
//                             prev.includes(id)
//                               ? prev.filter((c) => c !== id)
//                               : [...prev, id]
//                           );
//                         }}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor={`category-${category._id}`}
//                       >
//                         {category.name}
//                       </label>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Brands */}
//                 <div className="checkLists">
//                   <h6 className="fw-bold mb-2 d-block">Filter by Brand:</h6>
//                   {brands.map((brand) => (
//                     <div key={brand._id} className="form-check">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         value={brand._id}
//                         id={`brand-${brand._id}`}
//                         onChange={(e) => {
//                           const id = e.target.value;
//                           setSelectedBrands((prev) =>
//                             prev.includes(id)
//                               ? prev.filter((b) => b !== id)
//                               : [...prev, id]
//                           );
//                         }}
//                       />
//                       <label
//                         className="form-check-label"
//                         htmlFor={`brand-${brand._id}`}
//                       >
//                         {brand.name}
//                       </label>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-4">
//                   <button
//                     className="btn btn-warning w-100"
//                     onClick={handleResetFilters}
//                   >
//                     🔄 Reset Filters
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* ========== Products List ========== */}
//       <div className="row g-4 product-container">
//         {sortedProducts.length === 0 ? (
//           <NotFound />
//         ) : (
//           sortedProducts.map((product) => (
//             <div key={product.id} className="col-md-3">
//               {/* props to display data */}
//               <Card product={product} />
//             </div>
//           ))
//         )}
//       </div>

//       {/* ===================Page Number============ */}
//       <div className="d-flex justify-content-center align-items-center gap-4 my-5">
//        {[...Array(pagenation?.numberOfPages)].map((item, index)=>(
//         <button
//         key={index}
//         onClick={() => {
//           handlePageChange(index + 1)
//         }}
//         className={`pagination-btn ${pagenation === index + 1 ? "active" : ""}`}>
//           {index+1}
//         </button>
//        ))}
//       </div>
//     </section>
//   );
// }

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import filterIcon from "../assets/filter.png";
import React, { useEffect, useState } from "react";
import {
  faArrowLeft,
  faSearch,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import NotFound from "./NotFound";
import Card from "../Components/Card";
import Loader from "../Components/Loader";

export default function Products({ hideExtras = false }) {
  const [input, setInput] = useState("");
  const [products, setProducts] = useState([]);
  const { showFilters, setShowFilters } = useOutletContext();
  const [price, setPrice] = useState(0);
  const [sortOrders, setSortOrders] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");

  async function getAllProducts(page = 1) {
    setLoading(true);
    let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}`;

    if (categoryId) {
      url += `&category[in]=${categoryId}`;
    }

    try {
      const { data } = await axios.get(url);
      setProducts(data.data || []);
      setPagination(data.metadata || null);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();

    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        const allowed = ["Women's Fashion", "Men's Fashion", "Electronics"];
        setCategories(
          res.data.data.filter((cat) => allowed.includes(cat.name))
        );
      });

    axios.get("https://ecommerce.routemisr.com/api/v1/brands").then((res) => {
      const allowed = ["Canon", "Dell", "DeFacto", "Puma"];
      setBrands(res.data.data.filter((brand) => allowed.includes(brand.name)));
    });
  }, [categoryId]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(input.toLowerCase());
    const matchesCategory =
      !selectedCategories.length ||
      selectedCategories.includes(product.category._id);
    const matchesBrand =
      !selectedBrands.length || selectedBrands.includes(product.brand._id);
    const matchesPrice = price === 0 || product.price <= price;
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrders === "low") return a.price - b.price;
    if (sortOrders === "high") return b.price - a.price;
    return 0;
  });

  function handleResetFilters() {
    setPrice(0);
    setInput("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSortOrders("");
  }

  if (loading) return <Loader />;

  return (
    <section className="container products-container py-5 my-5">
      {!hideExtras && (
        <div>
          {/* Search Section */}
          <div className="d-flex justify-content-between align-items-center searchComponent w-50 p-2 rounded shadow-sm bg-white">
            <button
              className="btn rounded-circle shadow-lg back-icon"
              onClick={() => navigate("/")}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <div className="search-container position-relative flex-grow-1 mx-3">
              <input
                type="text"
                id="searchInput"
                className="form-control rounded-pill ps-4 shadow-sm"
                placeholder="Search for amazing products..."
                aria-label="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              />
            </div>

            <button
              className="btn back-icon rounded-circle shadow-sm filter-btn"
              onClick={() => setShowFilters((prev) => !prev)}
              style={{ width: "40px", height: "40px" }}
            >
              <img
                src={filterIcon}
                alt="filter icon"
                style={{ height: "20px" }}
              />
            </button>
          </div>

          {/* Side Navbar */}
          <div
            className={`position-fixed py-0 px-5 top-0 start-0 bg-success text-white bg-opacity-75 sideNavbar shadow-lg ${
              showFilters ? "open" : ""
            }`}
            style={{
              width: "300px",
              height: "100vh",
              zIndex: "10000",
              borderTopRightRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            {/* Sort */}
            <div className="sort">
              <p className="fw-medium fs-6 mb-0 pt-4">Price:</p>
              {["low", "high"].map((order) => (
                <div className="form-check" key={order}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="priceSort"
                    value={order}
                    checked={sortOrders === order}
                    onChange={(e) => setSortOrders(e.target.value)}
                  />
                  <label className="form-check-label">
                    {order === "low"
                      ? "smaller to Bigger"
                      : "Bigger to smaller"}
                  </label>
                </div>
              ))}
              <hr style={{ width: "80%" }} />
            </div>

            {/* Price Filter */}
            <div className="filter">
              <p className="fw-bold fs-4">
                {" "}
                Filter
                {/* <hr style={{width: "50%"}}/> */}
              </p>
              <label className="form-label fw-bold d-block">Price Range</label>
              <input
                type="range"
                className="form-range"
                step="50"
                value={price}
                min="0"
                max="5000"
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <div className="price-value bg-success text-white shadow-lg">
                Max Price:
                <span className="fw-bold"> EGP {price}</span>
              </div>
              <hr style={{ width: "80%" }} />
            </div>

            {/* Categories */}
            <div className="checkLists">
              <h6 className="fw-bold">Filter by Category:</h6>
              {categories.map((category) => (
                <div key={category._id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={category._id}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedCategories((prev) =>
                        prev.includes(id)
                          ? prev.filter((c) => c !== id)
                          : [...prev, id]
                      );
                    }}
                  />
                  <label className="form-check-label">{category.name}</label>
                </div>
              ))}
              <hr style={{ width: "80%" }} />
            </div>

            {/* Brands */}
            <div className="checkLists">
              <h6 className="fw-bold">Filter by Brand:</h6>
              {brands.map((brand) => (
                <div key={brand._id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={brand._id}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedBrands((prev) =>
                        prev.includes(id)
                          ? prev.filter((b) => b !== id)
                          : [...prev, id]
                      );
                    }}
                  />
                  <label className="form-check-label">{brand.name}</label>
                </div>
              ))}
            </div>

            <div>
              <button
                className="btn reset-btn position-absolute"
                style={{
                  borderRadius: "50%",
                  border: "5px rgb(1, 133, 76) solid",
                  backgroundColor: "rgb(1, 133, 76)",
                }}
                onClick={handleResetFilters}
              >
                <FontAwesomeIcon icon={faSyncAlt} style={{ color: "white" }} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="row g-4 product-container">
        {sortedProducts.length === 0 ? (
          <NotFound />
        ) : (
          sortedProducts.map((product) => (
            <div key={product.id} className="col-md-3">
              <Card product={product} />
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination?.numberOfPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-4 my-5">
          {Array.from({ length: pagination.numberOfPages }, (_, index) => (
            <button
              key={index}
              onClick={() => getAllProducts(index + 1)}
              className={`pagination-btn ${
                pagination.currentPage === index + 1 ? "active" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
