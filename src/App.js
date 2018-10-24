import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scale from './components/Scale.js';
import Calendar from './components/Calendar.js';

class App extends Component {
  render() {

    let events = [
      {id: 1, start: '9:45am', end: '11:15am'},
      {id: 2, start: '6:10pm', end: '7:00pm'},
      {id: 3, start: '6:30pm', end: '7:30pm'},
      {id: 4, start: '7:05pm', end: '8:05pm'}
    ]

    return (
      <div>
        <Scale></Scale>
        <Calendar events={events}></Calendar>
      </div>
    );
  }
}

export default App;
