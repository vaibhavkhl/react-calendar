import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Scale from './components/Scale.js';
import Calendar from './components/Calendar.js';

class App extends Component {
  render() {
    /* for testing
    let events = [
      {id: 1, start: '9:45am', end: '11:15am'},
      {id: 2, start: '6:10pm', end: '7:00pm'},
      {id: 3, start: '6:30pm', end: '7:30pm'},
      {id: 4, start: '6:40pm', end: '8:05pm'},
      {id: 5, start: '7:10pm', end: '7:45pm'},
      {id: 6, start: '7:35pm', end: '8:00pm'},
      {id: 7, start: '7:49pm', end: '8:30pm'}
    ]
    */

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
