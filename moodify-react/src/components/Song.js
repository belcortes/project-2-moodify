import React, {Component} from 'react'

class Song extends Component {
  // state = {
  //   newSong: {}
  // }

  render() {
    const title = this.props.title
    const artist = this.props.artist
    const spotifyId = this.props.spotifyId
    const newSong = { title, artist, spotifyId }


    return (
      <div>
        <h3>{title}</h3>
        <div>{artist}</div>
        {
          this.props.resultList ?
          <button
            onClick={() => this.props.addNewSongToSongList(newSong)}>
            Add to list
          </button>
          : null
        }
      </div>
    );
  }
}

export default Song;