import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Note extends Component {

  render() {
    const { note } = this.props.details;
    const { removeNote } = this.props;

    return (
      <div>
        <div>
          <span>May 26, 2017</span>
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
