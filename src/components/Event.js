import React, { Component } from 'react';

function Event(props) {
  let event = props.event
  return (
    <div style={{width: event.width + 'px', height: event.height + 'px',
    height: event.height + 'px', top: event.top + 'px', left: event.left + 'px',
    position: 'absolute', outline: '1px solid', textAlign: 'center'}}>{event.id}</div>
  )
}

export default Event
