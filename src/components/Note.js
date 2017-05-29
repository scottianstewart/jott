import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Note.css';

class Note extends Component {

  render() {
    const { note } = this.props;

    return (
      <div>
          <div className="note">
              <p>{note}</p>
              <div className="fixed">
              <span>May 28, 2017</span>
              <button className="edit">edit</button>
              <button className="delete">delete</button>
             </div>
          </div>
      </div>
    );
  }
}


Note.propTypes = {
  note: PropTypes.string,
}

export default Note;
