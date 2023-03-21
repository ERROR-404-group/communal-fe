import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      // This array will get populated with the axios.get results from the handleSubmit function
      songsReturnedArray: [
        { id: 1, name: 'Item 1' , artist: 'Artist 1', album: 'Album 1' },
        { id: 2, name: 'Item 2', artist: 'Artist 2', album: 'Album 2' },
        { id: 3, name: 'Item 3', artist: 'Artist 3', album: 'Album 3' },
        { id: 4, name: 'Item 4', artist: 'Artist 4', album: 'Album 4' },
        { id: 5, name: 'Item 5', artist: 'Artist 5', album: 'Album 5' },
        { id: 6, name: 'Item 6', artist: 'Artist 6', album: 'Album 6' },
        { id: 7, name: 'Item 7', artist: 'Artist 7', album: 'Album 7' },
        { id: 8, name: 'Item 8', artist: 'Artist 8', album: 'Album 8' },
        { id: 9, name: 'Item 9', artist: 'Artist 9', album: 'Album 9' },
        { id: 10, name: 'Item 10', artist: 'Artist 10', album: 'Album 10' },
      ],
    };

  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ searchTerm: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // do something with the search term, such as send it to a search API
    console.log(`Search term submitted: ${this.state.searchTerm}`);
  }

  render() {
    return (
      <>
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={this.state.searchTerm}
          onChange={this.handleChange}
          />
        <button type="submit">Search</button>
      </form>
      <ul>
          {this.state.songsReturnedArray.map((song) => (
            <li key={song.id}>{song.name}, {song.artist}, {song.album}</li>
          ))}
        </ul>
          </>
      
    );
  }
}

export default Search;
