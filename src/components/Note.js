import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './Note.css';
import DeleteButton from '../assets/delete.svg';
import EditButton from '../assets/edit.svg';

class Note extends Component {

  render() {
    const { note, timestamp, author, photo } = this.props.details;
    const { removeNote } = this.props;

    return (
      <div className="note">
          <div className="note__header">
            <div className="note__author">
              <div className="note__avatar">
                <img src={photo} alt="avatar" />
                <span>{author}</span>
              </div>
              <span>{moment(timestamp).format('MMMM Do YYYY, h:mm a')}</span>
            </div>
            <div className="note__actions">
              <button><img src={EditButton} alt="button" /></button>
              <button onClick={removeNote.bind(null, this.props.index)}><img src={DeleteButton} alt="button" /></button>
            </div>
          </div>
          <p>{note}</p>
      </div>
    );
  }
}


Note.propTypes = {
  author: PropTypes.string,
  details: PropTypes.object,
  removeNote: PropTypes.func,
}

export default Note;
