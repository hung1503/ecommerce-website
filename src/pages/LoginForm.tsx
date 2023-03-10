import React, { useEffect, useState } from "react";
import EastIcon from "@mui/icons-material/East";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { authenticalCredential } from "../redux/reducers/userReducer";
import { displayNoti } from "../redux/reducers/notification";

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
    dispatch(
      displayNoti({
        message: "User Successfully Login",
        type: "success",
      })
    );
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
            required
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
            required
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
            <Link to="/register" className="login-section-register-btn">
              Register Now <EastIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
