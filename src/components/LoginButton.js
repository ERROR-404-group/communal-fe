import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className='right-btn' onClick={() => loginWithRedirect()}>Login Here To Get TuneTastic!</button>;
};

export default LoginButton;
