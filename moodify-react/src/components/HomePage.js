import React, { Component } from 'react';

import SongList from './SongList'
import SongForm from './SongForm'
    
class HomePage extends Component {
  render() {
    console.log(this.props.songs)
    return (
      <div>
        <h1>Moodify</h1>
        <SongForm addNewSongToSongList={this.props.addNewSongToSongList} />
        <SongList songs={this.props.songs} />
      </div>
    );
  }
}

export default HomePage;