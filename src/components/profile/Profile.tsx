import React from "react";
import { useAppSelector } from "../../hooks/reduxHook";

const Profile = () => {
  const user = useAppSelector((state) => state.user);
  if (user.length === 0) {
  }
  return (
    <div>
      <h1>Profile</h1>
      {user.map((user) => {
        return (
          <div key={user.id}>
            <img src={user.avatar} alt={user.name} />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
