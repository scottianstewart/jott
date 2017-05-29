import React, { Component } from 'react';
import Note from './components/Note.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: {},
    };

    this.createNote = this.createNote.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  addNote(note) {
    let timestamp = (new Date()).getTime();

    const notes = Object.assign({}, this.state.notes, { ['note-' + timestamp]: note })
    this.setState({ notes })
  }

  createNote(event) {
    event.preventDefault();

    var note = {
      note : this.refs.note.value,
    }

    this.addNote(note)
    this.refs.notepad.reset();
  }

  renderNotes(key) {
    return (
      <Note key={key} index={key} details={this.state.notes[key]}/>
    )
  }

  render() {
    return (
      <div>
        <h1>Jott</h1>
        <form ref="notepad" onSubmit={this.createNote}>
          <textarea type="text" ref="note" placeholder="hi"/>
          <button type="submit">Submit</button>
        </form>
        {Object.keys(this.state.notes).map(this.renderNotes)}
      </div>
    );
  }
}

export default App;


  // localStorage.setItem("notes", JSON.stringify(notes));
  // let retrievedData = localStorage.getItem("notes");
