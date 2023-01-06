import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { userLogin } from "../../reducers/userReducer";

const LoginForm = () => {
  const userInfo = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      userLogin({
        email: email,
        password: password,
      })
    );
    setEmail("");
    setPassword("");
    nav("/");
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
