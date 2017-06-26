import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actions/actionCreators';
import Rebase from 're-base';
import Note from './components/Note.js';
import './reset.css';
import './App.css';
import { connect } from 'react-redux';
import firebase from 'firebase';
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
      value: '',
      uid: '',
      displayName: '',
      photoURL: '',
      dropdownActive: false,
    };

  }

  componentWillMount() {
    let uid = localStorage.getItem('uid');
    let displayName = localStorage.getItem('displayName');
    let photoURL = localStorage.getItem('photoURL');
    this.setState({uid: uid})
    this.setState({displayName: displayName})
    this.setState({photoURL: photoURL})
  }

  componentDidMount() {
    base.syncState('/', {
      context: this,
      state: 'notes',
    })
  }

  authenticate(type) {
    let provider = "";

    if(type === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_birthday');
    }

    if(type === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    }

    firebase.auth().signInWithPopup(provider).then(this.authHandler);
  }

  authHandler = (authData) => {
      localStorage.setItem('uid', authData.user.uid);
      localStorage.setItem('displayName', authData.user.displayName);
      localStorage.setItem('photoURL', authData.user.photoURL);
      this.setState({uid: authData.user.uid});
      this.setState({displayName: authData.user.displayName});
      this.setState({photoURL: authData.user.photoURL});
  }

  logOut() {
    firebase.auth().signOut().then(function() {
      this.setState({uid: null});
      localStorage.setItem('uid', null);
    }.bind(this));
  }

  renderLogin() {
    return (
      <div className="app container">
        <button onClick={this.authenticate.bind(this, 'facebook')}>Login With Facebook</button>
        <button onClick={this.authenticate.bind(this, 'twitter')}>Login With Twitter</button>
      </div>
    )
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.createNote();
      if(e.preventDefault) e.preventDefault();
    }
  }

  // addNote = (note) => {
  //   let timestamp = (new Date()).getTime();
  //
  //   const notes = Object.assign({}, this.state.notes, { ['note-' + timestamp]: note })
  //   this.setState({ notes })
  // }

  createNote = (event) => {
    if(event) {
      event.preventDefault();
    }

    let timestamp = (new Date()).getTime();

    var note = {
      note : this.refs.note.value,
      timestamp : timestamp,
      author : this.state.displayName,
      photo : this.state.photoURL,
    }

    this.props.addNote(note)
    this.setState({ value: ''})
  }

  toggleDropdown = () => {
    this.setState({ dropdownActive: !this.state.dropdownActive})
  }

  render() {
    let logoutButton = <button onClick={this.logOut.bind(this)}>Log Out</button>
    const { value } = this.state;

    if(!this.state.uid) {
      return this.renderLogin()
    }

    return (
      <div className="app">
        <div className="container">
          <div className="header">
            <h1>JOTT</h1>
            <div className="account" onClick={this.toggleDropdown}>
              <div className="avatar">
                <img src={this.state.photoURL} alt="avatar"/>
                <span>{this.state.displayName}</span>
                <div className="arrow-down" />
              </div>
              {this.state.dropdownActive ? (
                <div className="account-dropdown">
                  {logoutButton}
                </div>
              ) : null}
            </div>
          </div>
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
          {this.props.notes ? this.props.notes.map((note, i) => {
              return (
                <Note
                  key={i}
                  i={i}
                  note={note}
                  favorite={note.favorite}
                  {...this.props}
                />
              )
            }
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
