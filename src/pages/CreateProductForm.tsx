import React, { useState, useEffect } from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { fetchAllCategories } from "../redux/reducers/categoryReducer";
import { createProductWithForm } from "../redux/reducers/productReducer";
import { CreateProduct } from "../types/product";

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
    const file = e.target.files;
    setFiles(file);
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
    <div className="createProduct-container">
      <form className="createProduct-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Create Product</h2>
        <div className="createProduct-form-input">
          <label className="createProduct-form-input_label" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="createProduct-form-input_input"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            required
          />
        </div>
        <div className="createProduct-form-input">
          <label className="createProduct-form-input_label" htmlFor="price">
            Price
          </label>
          <input
            type="text"
            id="price"
            className="createProduct-form-input_input"
            value={price}
            onChange={({ target }) => setPrice(+target.value)}
            required
          />
        </div>
        <div className="createProduct-form-input">
          <label
            className="createProduct-form-input_label"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className="createProduct-form-input_textarea"
            placeholder="Description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            required
          />
        </div>
        <div className="createProduct-form-input">
          <label className="createProduct-form-input_label" htmlFor="category">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="createProduct-form-input_input"
            value={categoryId}
            onChange={({ target }) => setCategoryId(+target.value)}
            required
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
        <div className="createProduct-form-input">
          <label className="createProduct-form-input_label" htmlFor="image">
            Image
          </label>
          <div>
            <label
              htmlFor="image"
              className="createProduct-form-input_labelFile"
            >
              <DriveFolderUploadIcon />
              Select Image
            </label>
            <input
              type="file"
              id="image"
              className="createProduct-form-input_file"
              multiple
              onChange={(e) => handleAddFile(e)}
              required
            />
            {files && <span> {files?.length} files uploaded</span>}
          </div>
        </div>
        <div>
          <button className="createProduct-form-button" type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
