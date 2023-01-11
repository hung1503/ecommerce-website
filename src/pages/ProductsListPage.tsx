import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { addToCart } from "../redux/reducers/cartReducer";
import { fetchAllCategories } from "../redux/reducers/categoryReducer";
import {
  fetchAllProducts,
  fetchFilteredProducts,
  sortName,
  sortPrice,
} from "../redux/reducers/productReducer";
import { ProductType } from "../types/product";
import Pagination from "../components/Pagination";

const ProductsListPage = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(20);
  const products = useAppSelector((state) =>
    state.products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
  );
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const sortProducts = (sort: string) => {
    setSort(sort);
    if (sort === "nameAsc") {
      dispatch(sortName("asc"));
    } else if (sort === "nameDesc") {
      dispatch(sortName("desc"));
    } else if (sort === "priceAsc") {
      dispatch(sortPrice("asc"));
    } else if (sort === "priceDesc") {
      dispatch(sortPrice("desc"));
    }
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(fetchFilteredProducts(+e.target.value));
    setCategory(+e.target.value);
  };

  const handleClearFilter = () => {
    dispatch(fetchAllProducts());
    setCategory(0);
  };

  const handleAddtoCart = (product: ProductType) => {
    dispatch(
      addToCart({
        product: product,
        quantity: 1,
        totalPrice: product.price,
      })
    );
  };

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  return (
    <div className="productListContainer">
      <div className="productListContainer-route">
        <Link to="/">Home</Link>/<Link to="/products">Products</Link>
      </div>
      <h1 className="pageTitle">Products</h1>
      <div className="productListContainer-sorting">
        <form className="productListContainer-sorting-search">
          <input
            type="text"
            placeholder="Search product"
            value={search}
            onChange={({ target }) => setSearch(target.value)}
          />
        </form>
        <div className="productListContainer-sorting-product">
          <select
            name="filter"
            id="filter"
            value={sort}
            onChange={({ target }) => sortProducts(target.value)}
          >
            <option value="nameAsc">A-Z</option>
            <option value="nameDesc">Z-A</option>
            <option value="priceAsc">Price up</option>
            <option value="priceDesc">Price down</option>
          </select>
        </div>
      </div>
      <div className="productWrapper">
        <div className="productWrapper-categories">
          <h2>Filter</h2>
          <h3>Categories</h3>
          <div>
            {categories.slice(0, 5).map((item) => {
              return (
                <div key={item.id}>
                  <input
                    type="radio"
                    id={item.name}
                    name={item.name}
                    value={item.id}
                    onChange={(e) => handleCategory(e)}
                    checked={category === item.id}
                  />
                  <label htmlFor={item.name}>{item.name}</label>
                </div>
              );
            })}
            <button type="submit" onClick={() => handleClearFilter()}>
              Clear filter
            </button>
          </div>
        </div>
        <div className="productWrapper-products">
          {!products ? (
            <h2>Loading...</h2>
          ) : (
            currentProducts.map((item) => {
              return (
                <div className="productCard" key={item.id}>
                  <Link to={"/products/" + item.id}>
                    <div className="productCard-img">
                      <img src={item.images[0]} alt={item.title} />
                    </div>
                  </Link>
                  <div className="productCard-content">
                    <p className="carouselProduct-title">{item.title}</p>
                    <p className="carouselProduct-price">${item.price}</p>
                  </div>
                  <div className="productCard-btn">
                    <button type="submit" onClick={() => handleAddtoCart(item)}>
                      <AddShoppingCartIcon /> Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <Pagination
        totalProducts={products.length}
        productsPerPage={productsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductsListPage;
