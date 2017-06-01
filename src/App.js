import React, { Component } from 'react';
import Note from './components/Note.js';
import './reset.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 'Start a Jott',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let notes = [];
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    this.setState({value: event.target.value});
    let retrievedData = localStorage.getItem("notes");
    let notes = JSON.parse(retrievedData);
    notes.push(this.state.value)
    localStorage.setItem("notes", JSON.stringify(notes));
    this.setState({value: ''})
    event.preventDefault();
  }

  render() {
    let retrievedData = localStorage.getItem("notes");
    let notesArray = JSON.parse(retrievedData);
    let notes = [];
    Object.entries(notesArray).forEach(
      ([key, value]) => value !== null ? notes.push(<Note key={key} note={value}/>) : null
    );

    return (
      <div className="app">
        <div className="container">
          <h1>JOTT</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form">
              <textarea placeholder={this.state.value} onChange={this.handleChange} />
              <input type="submit" value="Submit" />
            </div>
          </form>
          <div className="middle">Notes</div>
          <div className="notes__container">
            {notes}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
