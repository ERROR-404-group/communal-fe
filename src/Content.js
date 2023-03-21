import { withAuth0 } from "@auth0/auth0-react";
import React from 'react';
import Search from "./components/Search";
import Playlist from "./components/Playlist";
// import Welcome from './Welcome';

class Content extends React.Component {

  render() {
    console.log('content page is working');
    return (
      <>

      {this.props.auth0.isAuthenticated ? 
        <h1>Hello</h1>:
        <>
        <h2>You are still not logged in</h2>
        <Search />
        <Playlist />
        </>
        
        // :
        
        
        // <Welcome />
    
      }
      </>
    )
  }
}

export default withAuth0(Content);
