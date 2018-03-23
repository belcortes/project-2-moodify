import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import UserProfile from './components/UserProfile';

class App extends Component {
  state = {
      currentUser: {
        userName: 'bob_loblaw',
        firstName: 'bel',
        lastName: 'cortes'
      }
    }

  render() {
    

    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} firstName={this.state.currentUser.firstName}  />
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
