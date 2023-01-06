import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div>
      <h1>Register Form</h1>
      <form>
        <div>
          <label htmlFor="registerName">Name</label>
          <input type="text" name="registerName" id="registerName" />
        </div>
        <div>
          <label htmlFor="registerEmail">Email</label>
          <input type="email" name="registerEmail" id="registerEmail" />
        </div>
        <div>
          <label htmlFor="registerPassword">Password</label>
          <input
            type="password"
            name="registerPassword"
            id="registerPassword"
          />
        </div>
        <div>
          <label htmlFor="registerAvatar">Avatar</label>
          <input type="file" name="registerAvatar" id="registerAvatar" />
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
