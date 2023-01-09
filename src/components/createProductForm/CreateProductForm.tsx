import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { fetchAllCategories } from "../../reducers/categoryReducer";
import { CreateProduct } from "../../types/product";

const CreateProductForm = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const category = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let fileArray: File[] = [];
    if (files?.length) {
      for (let i = 0; i < files.length; i++) {
        fileArray.push(files[i]);
      }
    }
    console.log(fileArray);
    setFiles(fileArray);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
  };
  return (
    <div>
      <h1>Create Product Form</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="text" id="price" />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea id="description" />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            {category.map((item) => {
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
