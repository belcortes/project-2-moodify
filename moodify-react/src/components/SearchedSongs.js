import React, {Component} from 'react';

import Song from './Song';

class SearchedSongs extends Component {
  render() {
    const SongComponents = this.props.searchedSongs.map((song, index) => {
      return <Song
          title={song.title}
          artist={song.artist}
          spotifyId={song.spotifyId}
          index={index}
          key={index}
          resultList={true}
          addNewSongToSongList={this.props.addNewSongToSongList}/>

    });

    return (
        <div>
          { SongComponents }
        </div>
    );

  }
}

export default SearchedSongs;