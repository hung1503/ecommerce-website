import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHook";

const Profile = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const nav = useNavigate();
  useEffect(() => {
    const isLogIn = localStorage.getItem("loggedInUser");
    if (!isLogIn) {
      nav("/login");
    }
  }, [nav]);

  return (
    <div className="profile-container">
      <h1>User's Profile</h1>
      {user && (
        <div className="profile-section" key={user.id}>
          <img
            className="profile-section-pic"
            src={user.avatar}
            alt={user.name}
          />
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Log in as: {user.role}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
