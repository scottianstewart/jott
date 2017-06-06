import React, { Component } from 'react';
import Rebase from 're-base';
import Note from './components/Note.js';
import './reset.css';
import './App.css';

var firebase = require('firebase/app');
var database = require('firebase/database');
var app = firebase.initializeApp({
      apiKey: "AIzaSyCsec_emJE66qqmfVSUNHDbBvzSK7m6oLI",
      authDomain: "jott-5f382.firebaseapp.com",
      databaseURL: "https://jott-5f382.firebaseio.com",
      storageBucket: "jott-5f382.appspot.com",
      messagingSenderId: "689360057294"
});
var db = database(app);
var base = Rebase.createClass(db);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: {},
      value: '',
    };

    this.createNote = this.createNote.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
    this.removeNote = this.removeNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    base.syncState('/', {
      context: this,
      state: 'notes',
    })
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.createNote();
      if(e.preventDefault) e.preventDefault(); 
    }
  }

  addNote(note) {
    let timestamp = (new Date()).getTime();

    const notes = Object.assign({}, this.state.notes, { ['note-' + timestamp]: note })
    this.setState({ notes })
  }

  createNote(event) {
    if(event) {
      event.preventDefault();
    }

    let timestamp = (new Date()).getTime();

    var note = {
      note : this.refs.note.value,
      timestamp : timestamp,
    }

    this.addNote(note)
    this.setState({ value: ''})
  }

  removeNote(key) {
    const notes = Object.assign({}, this.state.notes, { [key]: null })
    this.setState({ notes })
  }

  renderNotes(key) {
    return (
      <Note
        key={key}
        index={key}
        details={this.state.notes[key]}
        removeNote={this.removeNote}
      />
    )
  }

  render() {
    const { value } = this.state;

    return (
      <div className="app">
        <div className="container">
          <h1>JOTT</h1>
          <form className="form" ref="notepad" onSubmit={this.createNote}>
            <textarea
              type="text"
              ref="note"
              placeholder="Start a Jott..."
              value={value}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
            <button
              type="submit"
              className={value.length > 0 ? 'button button--active' : 'button'}
            >
              Submit
            </button>
          </form>
          <div className="middle">Notes</div>
          {Object.keys(this.state.notes).map(this.renderNotes)}
        </div>
      </div>
    );
  }
}

export default App;
