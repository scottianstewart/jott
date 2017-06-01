import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Note.css';
import DeleteButton from '../assets/delete.svg';
import EditButton from '../assets/edit.svg';

class Note extends Component {

  render() {
    const { note } = this.props;

    return (
      <div className="note">
          <div className="note__header">
            <span>May 28, 2017</span>
            <div className="note__actions">
              <button><img src={EditButton} alt="button" /></button>
              <button><img src={DeleteButton} alt="button" /></button>
            </div>
          </div>
          <p>{note}</p>
      </div>
    );
  }
}


Note.propTypes = {
  note: PropTypes.string,
}

export default Note;
