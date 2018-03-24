import React, {Component} from 'react';

class Song extends Component {
  render() {
    const title = this.props.title;
    const artist = this.props.artist;

    return (
      <div>
        <h3>{title}</h3>
        <div>{artist}</div>
      </div>
    );
  }
}

export default Song;