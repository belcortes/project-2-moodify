import React, { Component } from 'react';

import SongList from './SongList'
import SearchedSongs from './SearchedSongs'
import Search from './Search'
    
class HomePage extends Component {
  render() {

    const wrapperStyles = {
      width: "80%",
      margin:" 0 auto"
    }
    const songListDiv = {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row"
    }
    const navStyles = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    }
    const alignRight = {
      textAlign: "right",
    }
    return (
      <div style={wrapperStyles}>
        <div style={navStyles}>
          <h1>Moodify</h1>
          <p>{this.props.firstName} {this.props.lastName}</p>
        </div>
        <p>Music positiveness: {this.props.valence}%</p>
        <div style={alignRight}>
          <Search 
            searchForSong={this.props.searchForSong} 
            searchSpotifyTrack={this.props.searchSpotifyTrack} />
        </div>
        

        <div style={songListDiv}>
          <SongList songs={this.props.songs} />
          { 
            this.props.searchedSongs.length != 0 ? 
            <div style={alignRight}>
              <SearchedSongs 
              searchedSongs={this.props.searchedSongs} 
              addNewSongToSongList={this.props.addNewSongToSongList} />
            </div>
            : null
          }
        </div>
        
      </div>
    );
  }
}

export default HomePage;