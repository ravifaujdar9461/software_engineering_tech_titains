import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const ProfileContent = () => {
  const { profile } = useContext(AuthContext);

  console.log(profile);
  return (
    <div className="profile-content">
      <span>{profile.firstName}</span>
      <span>{profile.lastName}</span>
      <p>{profile.email}</p>
    </div>
  );
};
