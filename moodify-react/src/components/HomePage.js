import React, { Component } from 'react';

import SongList from './SongList'
import SearchedSongs from './SearchedSongs'
import Search from './Search'
    
class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Moodify</h1>
        <p>Positiveness: {this.props.valence}%</p>
        <Search 
          searchForSong={this.props.searchForSong} 
          searchSpotifyTrack={this.props.searchSpotifyTrack}
           />
        { 
          this.props.searchedSongs ? 
          <SearchedSongs 
            searchedSongs={this.props.searchedSongs} 
            addNewSongToSongList={this.props.addNewSongToSongList} /> 
          : undefined
        }
        <SongList songs={this.props.songs} />
      </div>
    );
  }
}

export default HomePage;