import React, {Component} from 'react';

class Search extends Component {
  state = {
    songQuery: ''
  }

  addQueryToSongQuery = (e) => {
    const attributeValue = e.target.value;

    this.setState({songQuery: attributeValue})
  }

  // handleNewSongChange = (e) => {
  //   const attributeName = e.target.name;
  //   const attributeValue = e.target.value;

  //   const searchedSong = {...this.state.searchedSong};
  //   searchedSong[attributeName] = attributeValue;

  //   this.setState({searchedSong})
  // }

  handleSubmit = (e) => {
    e.preventDefault()
    
    this.props.searchForSong(this.state.songQuery)
    this.props.searchSpotifyTrack
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div><input name="search" type="text" placeholder="Search for track" onChange={this.addQueryToSongQuery}/></div>
          <div><input type="submit" value="Search Song"/></div>
        </form>
      </div>
    );
  }
}

export default Search;