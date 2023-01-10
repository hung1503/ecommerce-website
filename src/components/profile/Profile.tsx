import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHook";

const Profile = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  console.log(user);
  const nav = useNavigate();
  useEffect(() => {
    const isLogIn = localStorage.getItem("loggedInUser");
    if (!isLogIn) {
      nav("/login");
    }
  });

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div key={user.id}>
          <img src={user.avatar} alt={user.name} />
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
