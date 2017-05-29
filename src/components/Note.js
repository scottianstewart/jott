import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Note extends Component {

  render() {
    const { note } = this.props.details;

    return (
      <div>
        <div>
          <span>May 26, 2017</span>
          <button>edit</button>
          <button>delete</button>
        </div>
        {note}
      </div>
    );
  }
}

Note.propTypes = {
  details: PropTypes.object,
}

export default Note;
