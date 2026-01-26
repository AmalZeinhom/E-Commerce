import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import filterIcon from "../assets/filter.png";
import React, { useEffect, useMemo, useState } from "react";
import {
  faSearch,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import Card from "../Components/Card";
import BackButton from "../Components/BackButton";
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
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("id");

  /* ===================== PRODUCTS ===================== */
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
      console.error(error);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [categoryId]);

  /* ===================== CATEGORIES & BRANDS ===================== */
  useEffect(() => {
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
  }, []);

  /* ===================== FILTERING ===================== */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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
  }, [products, input, selectedCategories, selectedBrands, price]);

  const sortedProducts = useMemo(() => {
    if (sortOrders === "low")
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    if (sortOrders === "high")
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    return filteredProducts;
  }, [filteredProducts, sortOrders]);

  function handleResetFilters() {
    setPrice(0);
    setInput("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSortOrders("");
    // close the drawer when resetting filters
    setShowFilters(false);
  }

  if (loading) {
      return (
        <div className="d-flex justify-content-center mt-5">
          <Loader />
        </div>
      );
    }

  return (
    <section className="products-page py-5">
      <div className="container">
        {!hideExtras && (
          <>
            {/* ================= SEARCH BAR ================= */}
            <div className="search-wrapper">
              <button className="btn icon-btn" onClick={() => navigate("/")}>
                <BackButton/>
              </button>

              <div className="search-box">
                <input
                  className="form-control"
                  placeholder="Search products..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <FontAwesomeIcon icon={faSearch} />
              </div>

              <button
                className="btn icon-btn filter-btn"
                onClick={() => setShowFilters(true)}
              >
                <img src={filterIcon} alt="filter" />
              </button>
            </div>

            {/* ================= OVERLAY ================= */}
            {showFilters && (
              <div
                className="filter-overlay"
                onClick={() => setShowFilters(false)}
              />
            )}

            {/* ================= FILTER DRAWER ================= */}
            <aside className={`filters-drawer ${showFilters ? "open" : ""}`}>
              <div className="filters-header">
                <h5>Filters</h5>
                <button onClick={() => setShowFilters(false)}>✕</button>
              </div>

              <hr />

              <p className="fw-bold">Sort by Price</p>
              {["low", "high"].map((order) => (
                <label key={order} className="d-block">
                  <input
                    type="radio"
                    name="sortOrder"
                    checked={sortOrders === order}
                    onChange={() => setSortOrders(order)}
                  />
                  {order === "low" ? " Low → High" : " High → Low"}
                </label>
              ))}

              <hr />

              <label className="fw-bold">Max Price</label>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
              <p>EGP {price}</p>

              <hr />

              <h6>Categories</h6>
              {categories.map((cat) => (
                <label key={cat._id} className="d-block">
                  <input
                    type="checkbox"
                    value={cat._id}
                    checked={selectedCategories.includes(cat._id)}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedCategories((prev) =>
                        prev.includes(id)
                          ? prev.filter((c) => c !== id)
                          : [...prev, id]
                      );
                    }}
                  />
                  {cat.name}
                </label>
              ))}

              <hr />

              <h6>Brands</h6>
              {brands.map((brand) => (
                <label key={brand._id} className="d-block">
                  <input
                    type="checkbox"
                    value={brand._id}
                    checked={selectedBrands.includes(brand._id)}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedBrands((prev) =>
                        prev.includes(id)
                          ? prev.filter((b) => b !== id)
                          : [...prev, id]
                      );
                    }}
                  />
                  {brand.name}
                </label>
              ))}

              <button
                className="btn btn-light w-100 mt-3"
                onClick={handleResetFilters}
              >
                <FontAwesomeIcon icon={faSyncAlt} /> Reset
              </button>
            </aside>
          </>
        )}

        {/* ================= PRODUCTS ================= */}
        <div className="row g-4 mt-4 product-container">
          {sortedProducts.length === 0 ? (
            <div className="col-12 text-center py-5 text-muted">
              No products match your filters.
            </div>
          ) : (
            sortedProducts.map((product) => (
              <div
                key={product._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <Card product={product} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination?.numberOfPages > 1 && (
        <div className="d-flex justify-content-center gap-3 my-5">
          {Array.from(
            {
              length: pagination.numberOfPages,
            },
            (_, i) => (
              <button key={i} onClick={() => getAllProducts(i + 1)} className= {`pagination-btn ${pagination.currentPage === i + 1 ? "active" : ""}`}>
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
    </section>
  );
}
