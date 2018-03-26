import React from 'react';

import Song from './Song';

const SearchedSongs = (props) => {

  const SongComponents = props.searchedSongs.map((song, index) => {
    return <Song
        title={song.title}
        artist={song.artist}
        spotifyId={song.spotifyId}
        index={index}
        key={index}
        resultList={true}
        addNewSongToSongList={props.addNewSongToSongList}/>

  });

  return (
      <div>
        { SongComponents }
      </div>
  )

}

export default SearchedSongs;