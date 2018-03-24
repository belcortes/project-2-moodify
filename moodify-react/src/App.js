import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// import axios from 'axios'

import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';

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
    }]
  }

  addNewSongToSongList = (newSong) => {
    const songs = [...this.state.songs]
    songs.push(newSong)
    this.setState({songs})
  }

  // async componentDidMount() {
  //   try {
  //     const response = await axios.get('/users/users')
  //     this.setState({ users: response.data })
  //   } catch (error) {
  //       console.log('Error retrieving users!')
  //       console.log(error)
  //   }
  // }

  render() {
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.users.userName} firstName={this.state.users.firstName}  />
    );

    const HomePageComponent = () => (
        <HomePage 
          songs={this.state.songs}
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
