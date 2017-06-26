import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import moment from 'moment';
import './Note.css';
import DeleteButton from '../assets/delete.svg';
import FavoriteButton from '../assets/favorite.svg';
import FavoriteButtonFull from '../assets/favoriteFull.svg';

class Note extends Component {

  favoriteNote = () => {
    this.state.dispatch(this.props.favorite())
  }

  render() {
    const { note, i } = this.props;

    return (
      <div className="note">
          <div className="note__header">
            <div className="note__author">
              <div className="note__avatar">
                <img src={note.photo} alt="avatar" />
              </div>
            </div>
            <div className="note__actions">
              <button onClick={()=>this.props.toggleFavorite(i)}>
                <img src={note.favorite === true ? FavoriteButtonFull : FavoriteButton} alt="button" />
              </button>
              <button onClick={()=>this.props.removeNote(i)}>
                <img src={DeleteButton} alt="button" />
              </button>
            </div>
          </div>
          <p>{note.note}</p>
      </div>
    );
  }
}

export default Note;
