import { withAuth0 } from "@auth0/auth0-react";
import React from 'react';
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import "./Content.css"; // import the CSS file
import Welcome from './Welcome';

class Content extends React.Component {
  render() {
    console.log('content page is working');
    return (
      <>
        {this.props.auth0.isAuthenticated ? 
          <>
          <div className="playlist-container">
              <Playlist />
            </div>
            <div className="search-container">
            <Search />
            </div> 
            </>
            :
       
            <Welcome />
          
        }
      </>
    )
  }
}

export default withAuth0(Content);

// {this.props.auth0.isAuthenticated ? 
//   <h1>Hello</h1> :
// <>
//     <div className="playlist-container">
//       <Playlist />
//     </div>
//     <div className="search-container">
//     <Search />
//     </div>
//   </>
// }
