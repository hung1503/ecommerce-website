import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  authenticalCredential,
  loginUser,
} from "../../redux/reducers/userReducer";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const accessToken = localStorage.getItem("loggedInUser");
  if (accessToken) {
    dispatch(loginUser(accessToken));
    nav("/");
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      authenticalCredential({
        email: email,
        password: password,
      })
    );
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="loginEmail">Email</label>
        <input
          type="email"
          name="loginEmail"
          id="loginEmail"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <label htmlFor="loginPassword">Password</label>
        <input
          type="password"
          name="loginPassword"
          id="loginPassword"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <h3>Register</h3>
      <p>
        If you don't have an account yet, create one now and receive multiple
        rewards
      </p>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
