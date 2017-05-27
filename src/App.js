import React, { Component } from 'react';
import TextArea from './components/TextArea';
import Note from './components/Note.js';
import './App.css';

class App extends Component {

  render() {

    return (
      <div>
        <h1>Jott</h1>
        <TextArea />
        <Note
          note="Hey, this is a note!"
        />
      </div>
    );
  }
}

export default App;
