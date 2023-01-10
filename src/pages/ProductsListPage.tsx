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

const ProductsListPage = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
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

  const handleCategory = (category: number) => {
    dispatch(fetchFilteredProducts(category));
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
  return (
    <div className="productListContainer">
      <Link to="/">Home</Link>/<Link to="/products">Products</Link>
      <h1>Products</h1>
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
          {categories.slice(0, 5).map((category) => {
            return (
              <div key={category.id}>
                <button
                  type="submit"
                  onClick={() => handleCategory(category.id)}
                >
                  {category.name}
                </button>
              </div>
            );
          })}
        </div>
        <div className="productWrapper-products">
          {!products ? (
            <h2>Loading...</h2>
          ) : (
            products.map((item) => {
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
    </div>
  );
};

export default ProductsListPage;
