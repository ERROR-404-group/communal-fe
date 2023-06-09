import { withAuth0 } from "@auth0/auth0-react";
import React from 'react';
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import "./Content.css"; // import the CSS file
import LogoutButton from "./components/LogoutButton";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isZoneActive: false,
      activePlaylistId: '',
      itemBeingDragged: null,
    };
  }

  handleZoneHover = () => {
    this.setState({ isZoneActive: true });
  }

  handleZoneLeave = () => {
    this.setState({ isZoneActive: false });
  }

  handleDragStart = (item) => {
    this.setState({ itemBeingDragged: item });
  }

  handlePlaylistIdChange = (playlistId) => {
    this.setState({ activePlaylistId: playlistId });
  }

  // function to update the playlist will be called here when the user drops a song into a playlist.

  handleDrop = (playlistId, playlists) => {
    playlists.playlist.songs.push(this.state.itemBeingDragged);
    this.setState({ itemBeingDragged: null });
  }


  render() {
    return (
      <>
          <>
          <div className="playlist-container">
              <Playlist 
              onEnter={this.handleZoneHover}
              onExit={this.handleZoneLeave}
              onChange={this.handlePlaylistIdChange}
              draggedItem={this.state.itemBeingDragged}
              activePlaylistId={this.state.activePlaylistId}
              handleDrop={this.handleDrop}
              auth0={this.props.auth0.isAuthenticated}
              userToken={this.props.auth0.user}/>
            </div>
            <div className="search-container">
            <Search 
            setIsDragging={this.handleZoneHover}
            dragStart={this.handleDragStart}
            abovePlaylist={this.state.isZoneActive}
            />
            </div> 
            <LogoutButton />
            </>

          
        
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
