import React, { useState } from "react";
import { useAppDispatch } from "../hooks/reduxHook";
import { updateProduct } from "../redux/reducers/productReducer";
import { EditProductType } from "../types/product";

const EditProduct = ({ togglePopUp, product }: EditProductType) => {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [description, setDescription] = useState(product.description);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = {
      ...product,
      title,
      price,
      description,
    };
    dispatch(updateProduct({ id: product.id, update: newProduct }));
    togglePopUp();
  };

  return (
    <div className="editContainer">
      <div className="editContainer-box">
        <span className="close-icon" onClick={togglePopUp}>
          x
        </span>
        <h1>Edit Product</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={({ target }) => setPrice(+target.value)}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
