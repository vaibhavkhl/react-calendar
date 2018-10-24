import React, { Component } from 'react';

function Scale() {
  let range = ['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm']

  let hours = range.map((h) => {
    return <div style={{height: '60px'}}>{h}</div>
  })

  return (
    <div style={{background: 'aliceblue', width: '50px', float: 'left'}}>{hours}</div>
  )
}

export default Scale
