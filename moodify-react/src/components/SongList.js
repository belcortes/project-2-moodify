import React, {Component} from 'react';

import Song from './Song';

class SongList extends Component {
  render() {
    const SongComponents = this.props.songs.map((song, index) => {
      return <Song
          title={song.title}
          artist={song.artist}
          index={index}
          key={index}/>;
    });

    return (
        <div>
          { SongComponents }
        </div>
    );

  }
}

export default SongList;