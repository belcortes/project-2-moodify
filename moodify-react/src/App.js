import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-js'
import axios from 'axios'

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

  deleteSong = (index) => {
    const updatedSongList = [...this.state.songs]
    updatedSongList.splice(index, 1)
    this.setState({songs: updatedSongList})
    this.getSongsValence()
  }

  // Finding a track using spotify API
  searchSpotifyTrack = () => {
    const currentComponent = this
    let searchedSong = {}
    const searchedSongs = []
    
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

  // Getting a song's valence with the Spotify Api
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
        total += valence
      })
      const avg = total / valenceArray.length
      currentComponent.setState({valence: Math.round(avg*100)})
    })
  }

  // Found this method for finding average on StackOverflow 
  // - a new way of finding average with ES6
  average = (array) => {
    array.reduce((a, b) => a + b, 0) / array.length
  }

  componentDidMount() {
    axios.get('/users/users')
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
            console.log('Error retrieving ideas!')
            console.log(error)
        })

    spotifyApi.setAccessToken('BQA05ALKWtsDQ0qTei3yPAkQHagnBhB9QVTIwRCvS0wHyBB6M6MaXO0Jkl9PgwxvCsYebW2BqjFar7PaEM5m9WwENjtPNbz-PVpsDaeW06qQUGE_poXThx3SeN3Z0z_6g4HOSLy8TVpBfRMSdw');

    this.getSongsValence()
  }

  render() {
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.users.userName} firstName={this.state.users.firstName}  />
    )

    const HomePageComponent = () => (
        <HomePage 
          firstName={this.state.users.firstName} 
          lastName={this.state.users.lastName}
          valence={this.state.valence}
          songs={this.state.songs}
          searchForSong={this.searchForSong}
          searchedSongs={this.state.searchedSongs}
          searchSpotifyTrack={ this.state.songQuery ? this.searchSpotifyTrack() : undefined }
          addNewSongToSongList={this.addNewSongToSongList}
          deleteSong={this.deleteSong}  />
    )

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
