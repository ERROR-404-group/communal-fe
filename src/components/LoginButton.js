import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className='right-side' onClick={() => loginWithRedirect()}>Let's Get TuneTastic!</button>;
};

export default LoginButton;
