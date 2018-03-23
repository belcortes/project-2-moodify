import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from 'axios'

import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';

class App extends Component {
  state = {
    users: {}
  }

  async componentDidMount() {
    try {
      const response = await axios.get('/users/users')
      this.setState({ users: response.data })
    } catch (error) {
        console.log('Error retrieving users!')
        console.log(error)
    }
  }

  render() {
    {console.log(this.state.users)}
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.users.userName} firstName={this.state.users.firstName}  />
    );

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/user" render={UserProfileComponent}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
