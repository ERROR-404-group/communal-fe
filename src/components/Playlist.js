import React from "react";
import './Playlist.css';

class PlaylistItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newName: props.playlist.name,
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
    this.props.onEdit(this.props.playlist.id, this.state.newName);
    this.setState({ isEditing: false });
  }

  handleDelete = () => {
    // function that handles the deleting of the playlist
    this.props.onDelete(this.props.playlist.id);
  }

  handleDragOver = (event) => {
    console.log('Item is being dragged over:', this.props.playlist.name);
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
  
  render() {
    const { playlist } = this.props;
    const { isEditing, newName, isHovered } = this.state;

    // if the playlist is being edited, render the edit form
    if (isEditing) {
      return (
        <>
          <li
            className='playlist-item'
            key={playlist.id}
            onDragOver={this.handleDragOver}
          >
            <form onSubmit={this.handleSubmit}>
              <input type="text" value={newName} onChange={this.handleNameChange} />
              <button type="submit">Save</button>
              <button type="button" onClick={this.toggleEdit}>Cancel</button>
            </form>
          </li>
          <ul>
            {playlist.songs.map(song => (
              <SongItem key={song.id} song={song} />
            ))}
          </ul>
        </>
      );
    }

    // if the playlist is not being edited, render the normal playlist
    return (
      <li
        className='playlist-item'
        key={playlist.id}
      >
        <div className="playlist-header">
          <h3>{playlist.name}</h3>
          <button type="button" onClick={this.toggleEdit}>Edit Playlist</button>
          <button type="button" onClick={() => this.props.onDelete(playlist.id)}>X</button> 
        </div>
        <ul className="list-of-songs">
          {playlist.songs.map(song => (
            <SongItem className='playlist-item' key={song.id} song={song} onSongDelete={this.onSongDelete} />
          ))}
        </ul>
        {isHovered && <div>Hovering over playlist item</div>} {/* add a message to display when the item is being hovered over */}
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
        key={song.id}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {song.name} - {song.artist} - {song.album}
        {showDeleteButton && (
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
          description: "Music",
          songs: [
            { id: 1, name: 'Item 1', artist: 'Artist 1', album: 'Album 1' },
            { id: 2, name: 'Item 2', artist: 'Artist 2', album: 'Album 2' },
            { id: 3, name: 'Item 3', artist: 'Artist 3', album: 'Album 3' },
            { id: 4, name: 'Item 4', artist: 'Artist 4', album: 'Album 4' },
            { id: 5, name: 'Item 5', artist: 'Artist 4', album: 'Album 4' },
          ]
        },
        {
          id: 2,
          name: "Also Music",
          description: "Also Music",
          songs: [
            { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
            { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
            { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3' },
            { id: 4, name: 'Song 4', artist: 'Artist 4', album: 'Album 4' },
            { id: 5, name: 'Song 5', artist: 'Artist 4', album: 'Album 4' },
          ]
        },
      ],
      newPlaylistName: "Your New Playlist",
    };
  }
  // function that handles adding a new playlist to the database
  handleAddPlaylist = () => {
    const { playlistsArr, newPlaylistName } = this.state;
    const newPlaylist = {
      id: playlistsArr.length + 1,
      name: newPlaylistName,
      description: "",
      songs: [],
    };
    const updatedPlaylistsArr = [...playlistsArr, newPlaylist];
    this.setState({
      playlistsArr: updatedPlaylistsArr,
    });
  };

  updatePlaylist = (updatedPlaylist) => {
    const { playlistsArr } = this.state;
    const updatedPlaylistsArr = playlistsArr.map((playlist) =>
      playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist
    );
    this.setState({ playlistsArr: updatedPlaylistsArr });
  };
  // helper function that handles the playlist name change
  handleNewPlaylistNameChange = (event) => {
    this.setState({ newPlaylistName: event.target.value });
  };
  // actual function that edits the playlist name
  handleEditPlaylist = (playlistId, newName) => {
    const { playlistsArr } = this.state;
    const updatedPlaylistsArr = playlistsArr.map((playlist) =>
      playlist.id === playlistId ? { ...playlist, name: newName } : playlist
    );
    this.setState({ playlistsArr: updatedPlaylistsArr });
  };

  // function that handles deleting a playlist from the database and state
  handleDeletePlaylist = (playlistId) => {
    const { playlistsArr } = this.state;
    const updatedPlaylistsArr = playlistsArr.filter(
      (playlist) => playlist.id !== playlistId
    );
    this.setState({ playlistsArr: updatedPlaylistsArr });
  };

  render() {
    return (
      <>
        <h1>Your Playlists</h1>
        <button className='add-btn' onClick={this.handleAddPlaylist}>Create New Playlist</button>
        <ul className="list-of-playlists">
          {this.state.playlistsArr.map((playlist) => (
            <PlaylistItem
              key={playlist.id}
              className="playlist-item"
              playlist={playlist}
              updatePlaylist={this.updatePlaylist}
              onEdit={this.handleEditPlaylist}
              onDelete={() => this.handleDeletePlaylist(playlist.id)} // pass down handleDeletePlaylist as a prop
            />
          ))}
        </ul>
      </>
    );
  }
}

export default Playlist;
