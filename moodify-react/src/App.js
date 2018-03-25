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
        artist: 'Test'
      }, {
        title: 'Song2',
        artist: 'Test'
      }],
      songQuery: '',
      searchedSongs: [],
      valence: ''
  }

  

  addNewSongToSongList = (newSong) => {
    const songs = [...this.state.songs]
    songs.push(newSong)
    this.setState({songs})
  }

  searchForSong = (searchedSong) => {

    this.setState({songQuery: searchedSong})
  }

  searchSpotifyTrack = () => {
    let searchedSong = {}
    const searchedSongs = []
    let currentComponent = this
    spotifyApi.setAccessToken('BQCDvBqLZDxnTIDF9lOeSIsR3V6QjqgZu6hKqoJ4JL6kTl70gd-sQlHKxrcn9rxOcL-25y-QFH_dpHTOjDRU5PPws7iL2I57gGtvkGunvOcE7KKBh_p_DnYxpZFuKcmPGiUJAAla9nGIc0xsdA');
    spotifyApi.searchTracks(this.state.songQuery, function(err, data) {
      if (err) {
        console.error(err)
      } else {
        data.tracks.items.forEach((song)=> {
          searchedSong = {
            title: song.name,
            artist: song.artists[0].name,
            spotifyId: song.id
          }

          searchedSongs.push(searchedSong)
        });
      }

      currentComponent.setState({searchedSongs})
    })
  }

  componentDidMount = () => {
    // console.log(this.state.searchedSongs)
    // this.searchSpotifyTrack()
    // console.log(this.state.songQuery)
    // const searchedSong = this.getSpotifyTrack
    // 
    // const searchedSongs= this.state.searchedSongs
    
    //   searchedSongs.push(searchedSong)
    //   this.setState({searchedSongs})
    //   console.log('-----')
    //   console.log(searchedSong)
    
    // spotifyApi.getAudioFeaturesForTracks(['75wtrabFOVsYLsUgZLCLtp', '1ENGe5j5pdmz1YKiW6NhK9'], function(err, data) {
    //   if (err) {
    //     console.error(err)
    //   } else {
    //     console.log(data.audio_features)
    //     console.log('Track valence', data.audio_features[0].valence)
    //   }
    // });
    // console.log(this.state.valence)
    // try {
    //   const response = await axios.get('/users/users')
    //   this.setState({ users: response.data })
    // } catch (error) {
    //     console.log('Error retrieving users!')
    //     console.log(error)
    // }
  }

  render() {
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.users.userName} firstName={this.state.users.firstName}  />
    );

    const HomePageComponent = () => (
        <HomePage 
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
