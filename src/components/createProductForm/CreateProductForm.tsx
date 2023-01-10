import axios from "axios";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { fetchAllCategories } from "../../redux/reducers/categoryReducer";
import { createProductWithForm } from "../../redux/reducers/productReducer";
import { CreateProduct } from "../../types/product";

const CreateProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [files, setFiles] = useState<FileList | null>(null);
  const category = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleAddFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setFiles(files);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct: CreateProduct = {
      title,
      price,
      description,
      categoryId,
      images: [],
    };
    if (files) {
      dispatch(createProductWithForm({ images: files, product: newProduct }));
    }
    setTitle("");
    setPrice(0);
    setDescription("");
    setCategoryId(0);
    setFiles(null);
  };
  return (
    <div>
      <h1>Create Product Form</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={({ target }) => setPrice(+target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={categoryId}
            onChange={({ target }) => setCategoryId(+target.value)}
          >
            {category.slice(0, 5).map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            multiple
            onChange={(e) => handleAddFile(e)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateProductForm;
