import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
    };
  }

  handleDrag = (e) => {
    e.preventDefault();
    if (this.props.abovePlaylist === true) {
      console.log('Playlist Below');
    }
  }

  handleDragStart = (e, myObject) => {
    this.props.dragStart(myObject);
    e.dataTransfer.setData('application/json', JSON.stringify(myObject));
    this.setState({
      dragging: true
    });
  }

  handleDragEnd = (e) => {
    e.preventDefault();
    
    this.setState({
      dragging: false
    })
  }

  handleDrop = (e) => {
    e.preventDefault();

    this.setState({
      dragging: false
    })
  }


  render() {
    const { dragging } = this.state;
    return (
      <ul className='search-results'>
        {this.props.songs.map((song, index) => (

          <li className={`search-item draggable ${dragging ? 'dragging' : ''}`} 
          key={index}
          draggable="true"
          onDrag={this.handleDrag}
          onDragEnd={this.handleDragEnd}
          onDragStart={(e) => this.handleDragStart(e, song)}
          onDrop={this.handleDrop}
          
          >
            <p>{song.title}, {song.artist}, {song.album}</p>
            </li>

        ))}
      </ul>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      // This array will get populated with the axios.get results from the handleSubmit function
      songsReturnedArray: [],
    };

  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    // do something with the search term, such as send it to a search API
    try {
      let searchResults = await axios.get(`${process.env.REACT_APP_SERVER}/search?q=${this.state.searchTerm}`);
      if (searchResults.data !== "search unavailable") {
      this.setState({ songsReturnedArray: searchResults.data });
      } else {
        window.alert("Search unavailable. Please try again later.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleDragStart = () => {
    const { setIsDragging } = this.props;
    setIsDragging(true);
  }

  handleDragEnd = () => {
    const { setIsDragging } = this.props;
    setIsDragging(false);
  }

  render() {
    return (
      <div className='results-table'>
        <h1 className="title">
            <span className="title-word title-word-1">Search </span>
            <span className="title-word title-word-2">your </span>
            <span className="title-word title-word-3">favorite </span>
            <span className="title-word title-word-4">Booty Music</span>
            </h1>
      <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={this.state.searchTerm}
            onChange={this.handleChange}
            />
          <button type="submit">Search</button>
        </form>
        <SongList className ="song-list"
        draggable
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd} 
        songs={this.state.songsReturnedArray} 
        dragStart={this.props.dragStart}
        />
            <div className="muzieknootjes">
            <div className="noot-1">
              &#9835; &#9833;
            </div>
            <div className="noot-2">
              &#9833;

            </div>
            <div className="noot-3">
              &#9839; &#9834;
            </div>
            <div className="noot-4">
              &#9834;
            </div>
          </div>
          </div>
      
    );
  }
}

export default Search;

// if (this.props.auth0.isAuthenticated) {
//   console.log('please work');
//   const result = await this.props.auth0.getIdTokenClaims();
//   console.log('Hello!');
//   const jwt = result._raw;
//   console.log(jwt);
//   const configuration = {
//     method: 'get',
//     baseURL: process.env.REACT_APP_SERVER,
//     url: '/playlists',
//     headers: {
//       "Authorization": `Bearer ${jwt}`

//     }
//   }
//   let results = await axios(configuration);
//   console.log(results.data);
//   this.setState({
//     music: results.data,
//     isEditing: false,
// })
