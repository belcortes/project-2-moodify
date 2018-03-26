import React from 'react';

import Song from './Song';

const SongList = (props) => {
  const SongComponents = props.songs.map((song, index) => {
    return <Song
        title={song.title}
        artist={song.artist}
        index={index}
        deleteSong={props.deleteSong}
        key={index}
        resultList={false}/>;
  });

  return (
      <div>
        { SongComponents }
      </div>
  );

}

export default SongList;