import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <h2>Hello There</h2>
    )
};

export default Profile;
