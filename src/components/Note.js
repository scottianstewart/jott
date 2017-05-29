import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class Note extends Component {

  render() {
    const { note, timestamp } = this.props.details;
    const { removeNote } = this.props;

    return (
      <div>
        <div>
          <span>{moment(timestamp).format('MMMM Do YYYY, h:mm a')}</span>
          <button>edit</button>
          <button onClick={removeNote.bind(null, this.props.index)}>delete</button>
        </div>
        {note}
      </div>
    );
  }
}

Note.propTypes = {
  details: PropTypes.object,
  removeNote: PropTypes.func,
}

export default Note;
