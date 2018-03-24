import React, {Component} from 'react';

class SongForm extends Component {
  state = {
    newSong: {}
  }

  handleNewSongChange = (e) => {
    const attributeName = e.target.name;
    const attributeValue = e.target.value;

    const newSong = {...this.state.newSong};
    newSong[attributeName] = attributeValue;

    this.setState({newSong})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    
    this.props.addNewSongToSongList(this.state.newSong)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div><input name="title" type="text" placeholder="Title" onChange={this.handleNewSongChange}/></div>
          <div><input name="artist" type="text" placeholder="Artist" onChange={this.handleNewSongChange}/></div>
          <div><input type="submit" value="Add New Song"/></div>
        </form>
      </div>
    );
  }
}

export default SongForm;