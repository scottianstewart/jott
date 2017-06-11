import React, { Component } from 'react';
import Rebase from 're-base';
import Note from './components/Note.js';
import './reset.css';
import './App.css';

// var firebase = require('firebase/app');
import firebase from 'firebase'
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

var provider = new firebase.auth.FacebookAuthProvider();
provider.addScope('user_birthday');
provider.setCustomParameters({
  'display': 'popup'
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: {},
      value: '',
      uid: '',
      displayName: '',
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

  loginWithFacebook() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      this.setState({uid: token});
      this.setState({displayName: result.user.displayName})
      console.log(result)
    }.bind(this));
  }

  logOut() {
    firebase.auth().signOut().then(function() {
      this.setState({uid: null});
    }.bind(this));
  }

  renderLogin() {
    return (
      <div>
        <button onClick={this.loginWithFacebook.bind(this, 'facebook')}>Login With Facebook</button>
      </div>
    )
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
    let logoutButton = <button onClick={this.logOut.bind(this)}>Log Out!</button>
    const { value } = this.state;

    if(!this.state.uid) {
      return this.renderLogin()
    }

    // if(this.state.uid !== this.state.owner) {
    //   return <div>Sorry, you aren't the owner {logoutButton}</div>
    // }

    return (
      <div className="app">
        <div className="container">
          {logoutButton}
          <h1>JOTT</h1>
          <h1>{this.state.displayName}</h1>
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
