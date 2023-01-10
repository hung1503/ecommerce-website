import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHook";
import { userRegister } from "../../redux/reducers/userReducer";

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
    <div>
      <h1>Register Form</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="registerName">Name</label>
          <input
            type="text"
            name="registerName"
            id="registerName"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          <label htmlFor="registerEmail">Email</label>
          <input
            type="email"
            name="registerEmail"
            id="registerEmail"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <div>
          <label htmlFor="registerPassword">Password</label>
          <input
            type="password"
            name="registerPassword"
            id="registerPassword"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <label htmlFor="registerAvatar">Avatar</label>
          <input
            type="file"
            name="registerAvatar"
            id="registerAvatar"
            onChange={(e) => handleAddFile(e)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log in here!</Link>
      </p>
    </div>
  );
};

export default RegisterForm;
