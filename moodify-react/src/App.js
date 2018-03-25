import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
// import axios from 'axios'

import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';

const spotifyApi = new SpotifyWebApi()

class App extends Component {
  state = {
    users: {
        firstName: 'Test',
        lastName: 'User'
      },
      songs: [{
        title: 'Song',
        artist: 'Test',
        spotifyId:'75wtrabFOVsYLsUgZLCLtp'
      }, {
        title: 'Song2',
        artist: 'Test',
        spotifyId: '1ENGe5j5pdmz1YKiW6NhK9'
      }],
      songQuery: '',
      searchedSongs: [],
      valence: ''
  }

  addNewSongToSongList = (newSong) => {
    const songs = [...this.state.songs]
    songs.push(newSong)
    this.setState({songs})
    this.getSongsValence()
  }

  searchForSong = (searchedSong) => {
    this.setState({songQuery: searchedSong})
  }

  searchSpotifyTrack = () => {
    let searchedSong = {}
    const searchedSongs = []
    const currentComponent = this
    
    spotifyApi.searchTracks(this.state.songQuery, function(err, data) {
      if (err) {
        console.error(err)
      } else {
        data.tracks.items.forEach((song)=> {
          searchedSong = {
            title: song.name,
            artist: song.artists[0].name,
            spotifyId: song.id,
          }

          searchedSongs.push(searchedSong)
        });
      }

      currentComponent.setState({searchedSongs})
    })
  }

  getSongsValence = () => {
    const currentComponent = this

    const songs = currentComponent.state.songs
    const songIds = []
    songs.forEach((song)=> {
      songIds.push(song.spotifyId)
    })

    let valenceArray = []
    spotifyApi.getAudioFeaturesForTracks(songIds, function(err, data) {
      if (err) {
        console.error(err)
      } else {
        data.audio_features.forEach((features) => {
          valenceArray.push(features.valence)
        });
      }
      let total = 0
      valenceArray.forEach((valence) => {
        total+=valence
      })
      const avg = total / valenceArray.length
      currentComponent.setState({valence: Math.round(avg*100)})
    })
  }

  average = (array) => {
    array.reduce( ( p, c ) => p + c, 0 ) / array.length
  }

  componentDidMount() {
    spotifyApi.setAccessToken('BQC4r9YFAm9g7Q0NCDxZtHjeUNS_8pNMnQJ3OA9tAG3fERs7MIenylBiwYmSUDrKi1uB00rFcZ1OgerX7AS6YtwNxQG_NClVjoi9qmcEX6UxK2leVPdSIk7jMEtMeC2bH88I1gXQVrjXIi49nA');
    this.getSongsValence()
  }

  render() {
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.users.userName} firstName={this.state.users.firstName}  />
    );

    const HomePageComponent = () => (
        <HomePage 
          valence={this.state.valence}
          songs={this.state.songs}
          searchForSong={this.searchForSong}
          searchedSongs={this.state.searchedSongs}
          searchSpotifyTrack={ this.state.songQuery ? this.searchSpotifyTrack() : undefined }
          addNewSongToSongList={this.addNewSongToSongList}  />
    );

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" render={HomePageComponent}/>
            <Route exact path="/user" render={UserProfileComponent}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
