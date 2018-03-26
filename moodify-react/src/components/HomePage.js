import React from 'react'

import SongList from './SongList'
import SearchedSongs from './SearchedSongs'
import Search from './Search'
    
const HomePage = (props) => {

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
        <p>{props.firstName} {props.lastName}</p>
      </div>
      <p>Music positiveness: {props.valence}%</p>
      <div style={alignRight}>
        <Search 
          searchForSong={props.searchForSong} 
          searchSpotifyTrack={props.searchSpotifyTrack} />
      </div>
      

      <div style={songListDiv}>
        <SongList 
          songs={props.songs} 
          deleteSong={props.deleteSong} />
        { 
          props.searchedSongs.length !== 0 ? 
          <div style={alignRight}>
            <SearchedSongs 
            searchedSongs={props.searchedSongs} 
            addNewSongToSongList={props.addNewSongToSongList} />
          </div>
          : null
        }
      </div>
      
    </div>
  )
}

export default HomePage