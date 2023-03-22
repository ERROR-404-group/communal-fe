import React from "react";
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';
import './Playlist.css';

const SERVER = process.env.REACT_APP_SERVER;

class PlaylistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newName: props.playlist.name,
      isHovered: false,
    };

  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value });
  }

  toggleEdit = () => {
    this.setState({ isEditing: !this.state.isEditing });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // function that handles the editing of the playlist. Passes the id and the new name selected
    this.props.onEdit(this.props.playlist._id, this.state.newName);
    this.setState({ isEditing: false });
  }

  handleDelete = () => {
    // function that handles the deleting of the playlist
    this.props.onDelete(this.props.playlist._id);
  }

  handleDragOver = () => {
    this.setState({ isHovered: true });
    this.props.onChange(this.props.playlist._id);
    this.props.onEnter();
  }

  handleDragEnd = (e) => {
    e.preventDefault();
    console.log(this.props.draggedSong);
    console.log(this.props.playlist.songs)
  }

  handleDragLeave = () => {
    this.setState({ isHovered: false });
    this.props.onExit();
  }

  handleActivePlaylistChange = () => {
    this.props.onChange(this.props.playlist._id)
  }


  onSongDelete = (id) => {
    // Find the index of the song with the specified id
    const index = this.props.playlist.songs.findIndex((song) => song.id === id);

    // If a song with the specified id exists in the playlist, remove it
    if (index !== -1) {
      const songs = [...this.props.playlist.songs]; // Make a copy of the songs array
      songs.splice(index, 1); // Remove the song at the specified index
      this.props.updatePlaylist({ ...this.props.playlist, songs }); // Update the playlist with the new array of songs
    }
  };

  handleAddSong = (song) => {
    const songs = [...this.props.playlist.songs, song];
    this.props.updatePlaylist({ ...this.props.playlist, songs });
  }



  render() {
    const { playlist } = this.props;
    const { isEditing, newName, } = this.state;

    return (
      <li
        className='playlist-item'
        key={playlist._id}
        data-playlist-id={playlist._id}
        onDragOver={this.props.onDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={() => this.props.onDrop(playlist._id, { playlist })}

      >
        {isEditing ? (
            <>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={newName} onChange={this.handleNameChange} />
            <button type="submit">Save</button>
            <button type="button" onClick={this.toggleEdit}>Cancel</button>
          </form>
           <ul className="list-of-songs">
             {playlist.songs.map(song => (
               <SongItem className='playlist-item' key={song.id} isEditing={this.state.isEditing} song={song} onSongDelete={this.onSongDelete} />
             ))}
           </ul>
         </>
        ) : (
          <>
            <div className="playlist-header">
              <h3>{playlist.name}</h3>
              <button type="button" onClick={this.toggleEdit}>Update Playlist</button>
              <button type="button" onClick={() => this.props.onDelete(playlist._id)}>X</button>
            </div>
            <ul className="list-of-songs">
              {playlist.songs.map(song => (
                <SongItem className='playlist-item' key={song.id} song={song} onSongDelete={this.onSongDelete} />
              ))}
            </ul>
          </>
        )}
      </li>
    );
  }
}




class SongItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteButton: false
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleMouseEnter() {
    this.setState({ showDeleteButton: true });
  }

  handleMouseLeave() {
    this.setState({ showDeleteButton: false });
  }

  handleDeleteClick() {
    const { song, onDelete } = this.props;
    onDelete(song.id);
  }

  render() {
    const { song } = this.props;
    const { showDeleteButton } = this.state;
    return (

      <li
        className='song-item'
        key={song.id + 10}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >

        {song.title} - {song.artist} - {song.album}
        {this.props.isEditing && (
          <button className='delete-button' onClick={() => this.props.onSongDelete(song.id)}>
            X
          </button>
        )}
      </li>
    );
  }
}




class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this will be the users playlists that get returned from the database
      playlistsArr: [
        {
          id: 1,
          name: "Music",
          createdBy: 'Anthony Keith',
          songs: [
            { id: 1, title: 'Item 1', artist: 'Artist 1', album: 'Album 1' },
            { id: 2, title: 'Item 2', artist: 'Artist 2', album: 'Album 2' },
            { id: 3, title: 'Item 3', artist: 'Artist 3', album: 'Album 3' },
            { id: 4, title: 'Item 4', artist: 'Artist 4', album: 'Album 4' },
            { id: 5, title: 'Item 5', artist: 'Artist 4', album: 'Album 4' },
          ]
        },
        {
          id: 2,
          name: "Also Music",
          createdBy: 'Tom Cruise',
          songs: [
            { id: 1, title: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
            { id: 2, title: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
            { id: 3, title: 'Song 3', artist: 'Artist 3', album: 'Album 3' },
            { id: 4, title: 'Song 4', artist: 'Artist 4', album: 'Album 4' },
            { id: 5, title: 'Song 5', artist: 'Artist 4', album: 'Album 4' },
          ]
        },
      ],
      newPlaylistName: "Your New Playlist",
    };
  }


  // function that handles adding a new playlist to the database
  postPlaylist = async (newPlaylist) => {
    let pl = newPlaylist;
    console.log(pl);
    try {
      // get a token from Auth0
      const res = await this.props.auth0.getIdTokenClaims();
      // JWT is the raw part of the token
      const jwt = res.__raw;
      // log the token
      // console.log(jwt);
      // declare config with headers for axios request
      const config = {
        method: 'post',
        baseURL: SERVER,
        url: '/playlists',
        data: pl,
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Data": `${pl}`
        },
      }
      // POST playlist to database with above config

      let post = await axios(config);
      console.log(post);
      // console.log(createdPlaylist.data);
      console.log('I created a new playlist')
      this.getPlaylist();
    } catch (error) {
      console.log(error.response)
    }
  }
  // function that handles adding new playlist to state
  // passes playlist object to POST function to send to server/DB
  handleAddPlaylist = () => {
    const { playlistsArr, newPlaylistName } = this.state;
    const newPlaylist = {
      name: newPlaylistName,
      songs: [],
      createdBy: this.props.userToken.email
    };
    // console.log(newPlaylist);
    this.postPlaylist(newPlaylist);
    const updatedPlaylistsArr = [...playlistsArr, newPlaylist];
    this.setState({
      playlistsArr: updatedPlaylistsArr,
    });
  };

  // function that will be called on page load. It will fetch the playlists from the database that match the users createdBy email. It will then save the array of playlists to the state as playlistsArr. It gets invoked on componentDidMount
  getPlaylist = async () => {
    if (this.props.auth0.isAuthenticated) {
      try {
        // get a token from Auth0
        const res = await this.props.auth0.getIdTokenClaims();
        // JWT is the raw part of the token
        const jwt = res.__raw;
        // log the token
        console.log(jwt);
        // declare config with headers for axios request
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/playlists',
          headers: {
            "Authorization": `Bearer ${jwt}`,
            "From": `${this.props.userToken.email}`
          }
        }
        console.log(this.props.userToken.email);
        // receive results of axios request using above config
        const playlistResults = await axios(config);
        // console log results
        console.log(playlistResults.data);
        console.log('playlist fetched!');
        this.setState({
          playlistsArr: playlistResults.data
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  updatePlaylist = (updatedPlaylist) => {
    const { playlistsArr } = this.state;
    const updatedPlaylistsArr = playlistsArr.map((playlist) =>
      playlist._id === updatedPlaylist._id ? updatedPlaylist : playlist
    );
    this.setState({ playlistsArr: updatedPlaylistsArr });
  };

  // helper function that handles the playlist name change
  handleNewPlaylistNameChange = (event) => {
    this.setState({ newPlaylistName: event.target.value });
  };

  editPlaylist = async (playlistId, rpl) => {
    let pl_id = playlistId;
    console.log(pl_id);
    let rplToPut = rpl;
    console.log(rplToPut);
    try {
      // get a token from Auth0
      const res = await this.props.auth0.getIdTokenClaims();
      // JWT is the raw part of the token
      const jwt = res.__raw;
      // log the token
      // console.log(jwt);
      // declare config with headers for axios request
      const config = {
        method: 'put',
        baseURL: SERVER,
        url: './playlists',
        data: rpl,
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Data": `${pl_id}`
        },
      }
      // PUT playlist to database with above config
      let putName = await axios(config);
      // console.log(put.data);
      // console.log(`playlist ${pl_id} updated in database`);
      console.log(putName);
    } catch (error) {
      console.log(error.response)
    }
  }

  // actual function that edits the playlist name
  handleEditPlaylist = (playlistId, newName) => {
    console.log('Playlist updated.');
    const { playlistsArr } = this.state;
    const updatedPlaylistsArr = playlistsArr.map((playlist) =>
      playlist._id === playlistId ? { ...playlist, name: newName } : playlist
    );
    // get the updated playlist object from the array using filter
    let upl = updatedPlaylistsArr.filter(playlist => playlist._id === playlistId);
    console.log(upl)
    // since filter gives us the updated playlist object inside an array, extract the object to send to the server
    this.editPlaylist(playlistId, upl[0]);
    this.setState({ playlistsArr: updatedPlaylistsArr });
  };

  // function that deletes a playlist from the database
  deletePlaylist = async (playlistId) => {
   let pl_id = playlistId;
    console.log(pl_id);
    try {
      // get a token from Auth0
      const res = await this.props.auth0.getIdTokenClaims();
      // JWT is the raw part of the token
      const jwt = res.__raw;
      // declare config with headers for axios request
      const config = {
        method: 'delete',
        baseURL: SERVER,
        url: '/playlists',
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Data": `${pl_id}`
        },
      }
      // POST playlist to database with above config
      let deletedList = await axios(config);
      console.log(deletedList);
      console.log('Playlist deleted from database.')
    } catch (error) {
      console.log(error.response)
    }
  }

  // function that handles deleting a playlist from the database and state
  handleDeletePlaylist = (playlistId) => {
    console.log('I deleted the playlist');

     const { playlistsArr } = this.state;
    const updatedPlaylistsArr = playlistsArr.filter(
      (playlist) => playlist._id !== playlistId
    );
    this.deletePlaylist(playlistId);
    this.setState({ playlistsArr: updatedPlaylistsArr });
  };

  handleAddItemToPlaylist = (playlistId, item) => {
    // Find the playlist with the matching ID
    const playlist = this.state.playlistsArr.find((p) => p._id === playlistId);

    // If a matching playlist is found, push the new item to its array of items
    if (playlist) {
      console.log(`Added ${item.name} to playlist ${playlist.name}`);
      this.editPlaylist(playlistId, playlist);
    } else {
      console.log(`Could not find playlist with ID ${playlistId}`);
    }

    // Clear the dragged item and active playlist ID from state
    this.setState({ itemBeingDragged: null, activePlaylistId: '' });
  }

  handleDragOver = (event) => {
    event.preventDefault();
  }

  handleDropEvent = (event) => {
    event.preventDefault();
    const { handleDrop, draggedItem, activePlaylistId } = this.props;
    handleDrop(activePlaylistId, draggedItem, this.state.playlistsArr);
  }

  componentDidMount() {
    this.getPlaylist();
  }

  render() {
    return (
      <>
        <div className="container">
          <h1 className="title">
            <span className="title-word title-word-1">This </span>
            <span className="title-word title-word-2">is </span>
            <span className="title-word title-word-3">my </span>
            <span className="title-word title-word-4">Playlist</span>
          </h1>
        </div>
        
        <button className='add-btn' onClick={this.handleAddPlaylist}>Create New Playlist</button>
        <ul className="list-of-playlists">
          {this.state.playlistsArr.map((playlist) => (
            <PlaylistItem
              onDragOver={this.handleDragOver}
              onDrop={this.props.handleDrop}
              key={playlist.id}
              className="playlist-item"
              playlist={playlist}
              updatePlaylist={this.updatePlaylist}
              onEdit={this.handleEditPlaylist}
              onDelete={() => this.handleDeletePlaylist(playlist._id)}
              onEnter={this.props.onEnter}
              onExit={this.props.onExit}
              onChange={this.props.onChange}
            />
          ))}
        </ul>
        <div className="muzieknootjes">
            <div class="noot-1">
              &#9835; &#9833;
            </div>
            <div class="noot-2">
              &#9833;

            </div>
            <div class="noot-3">
              &#9839; &#9834;
            </div>
            <div class="noot-4">
              &#9834;
            </div>
          </div>
      </>
    );
  }
}

export default withAuth0(Playlist);
