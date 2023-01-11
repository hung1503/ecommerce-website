import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { authenticalCredential } from "../redux/reducers/userReducer";

const LoginForm = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (user !== undefined) {
      nav("/");
    }
  }, [user, nav]);
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
    <div className="login-container">
      <div className="login-section">
        <form className="login-section-form" onSubmit={(e) => handleSubmit(e)}>
          <h3>Login</h3>
          <label className="login-section-form_label" htmlFor="loginEmail">
            Email
          </label>
          <input
            type="email"
            name="loginEmail"
            id="loginEmail"
            className="login-section-form_input"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <label className="login-section-form_label" htmlFor="loginPassword">
            Password
          </label>
          <input
            type="password"
            name="loginPassword"
            className="login-section-form_input"
            id="loginPassword"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button className="login-section-form_button" type="submit">
            Login
          </button>
        </form>
        <div className="login-section-register">
          <h3>Register</h3>
          <p>
            If you don't have an account yet, create one now and receive
            multiple rewards
          </p>
          <div>
            <Link to="/register">Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
