import React, { useState } from "react";
import { Link } from "react-router-dom";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useAppDispatch } from "../hooks/reduxHook";
import { userRegister } from "../redux/reducers/userReducer";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<FileList | null>(null);
  const dispatch = useAppDispatch();
  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setAvatar(files);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    if (avatar) {
      dispatch(userRegister({ image: avatar, user: newUser }));
    }
    setName("");
    setEmail("");
    setPassword("");
    setAvatar(null);
  };
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
        <h2>Register Form</h2>
        <div className="register-form-input">
          <label className="register-form-input_label" htmlFor="registerName">
            Name
          </label>
          <input
            type="text"
            name="registerName"
            id="registerName"
            className="register-form-input_input"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div className="register-form-input">
          <label className="register-form-input_label" htmlFor="registerEmail">
            Email
          </label>
          <input
            type="email"
            name="registerEmail"
            id="registerEmail"
            className="register-form-input_input"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div className="register-form-input">
          <label
            className="register-form-input_label"
            htmlFor="registerPassword"
          >
            Password
          </label>
          <input
            type="password"
            name="registerPassword"
            id="registerPassword"
            className="register-form-input_input"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div className="register-form-input">
          <label className="register-form-input_label" htmlFor="registerAvatar">
            Avatar
          </label>
          <div>
            <label
              htmlFor="registerAvatar"
              className="createProduct-form-input_labelFile"
            >
              <DriveFolderUploadIcon />
              Select Image
            </label>
            <input
              type="file"
              name="registerAvatar"
              id="registerAvatar"
              className="register-form-input_file"
              onChange={(e) => handleAddFile(e)}
            />
            {avatar && <span> {avatar?.length} files uploaded</span>}
          </div>
        </div>
        <button className="createProduct-form-button" type="submit">
          Register
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in here!</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
