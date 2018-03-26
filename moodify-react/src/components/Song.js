import React from 'react'

const Song = (props) => {

  const title = props.title
  const artist = props.artist
  const spotifyId = props.spotifyId
  const newSong = { title, artist, spotifyId }


  return (
    <div>
      <h3>{title}</h3>
      <div>{artist}</div>
      {
        props.resultList ?
        <button
          onClick={() => props.addNewSongToSongList(newSong)}>
          Add to list
        </button>
        : 
        <button
          onClick={() => props.deleteSong(props.index)}>
          Delete
        </button>
      }
    </div>
  )
}

export default Song;