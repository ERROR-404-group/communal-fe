import { withAuth0 } from "@auth0/auth0-react";
import React from 'react';
import Search from "./components/Search";
import Playlist from "./components/Playlist";
import "./Content.css"; // import the CSS file
import Welcome from './Welcome';

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

  handleDrop = (playlistId, playlists) => {
    console.log(`You have dropped song with title ${this.state.itemBeingDragged.title} on the playlist with an Id of ${playlistId}`);
    console.log(playlists.playlist.songs)
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
              userToken={this.props.auth0.user}/>
            </div>
            <div className="search-container">
            <Search 
            setIsDragging={this.handleZoneHover}
            dragStart={this.handleDragStart}
            abovePlaylist={this.state.isZoneActive}
            />
            </div> 
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
