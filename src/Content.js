import { withAuth0 } from "@auth0/auth0-react";
import React from 'react';
// import Welcome from './Welcome';

class Content extends React.Component {

  render() {
    console.log('content page is working');
    return (
      <>
      {this.props.auth0.isAuthenticated ? 

        <h1>Hello</h1>:
        <h2>Goodbye</h2>
        // :
        

        // <Welcome />
      }
      </>
    )
  }
}

export default withAuth0(Content);
