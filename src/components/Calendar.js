import React, { Component } from 'react';
import Event from './Event.js';

class Calendar extends Component {
  render() {

    let events = changeEventFormat(this.props.events)

    // step 1
    let overlappingEvents = findOverlappingEvents(events)
    //step 2
    //let allOverlappingEvents = setEventsTogether(overlappingEvents)
    // step 3
    let eventsWithWidth = setWidthAndOrderToEvents(events, overlappingEvents)
    let eventsWithDimensions = setDimensionsToEvents(eventsWithWidth)

    let appointments = []
    events.forEach(event => {
      appointments.push(<Event event={event}></Event>)
    })

    return (
        <div className="appointment-container">
          {appointments}
        </div>
    );
  }
}

export default Calendar;

// step 1
// return array of arrays of ids
function findOverlappingEvents(events) {
  let overlappingEventsIdsArray = []
  events.forEach((event) => {
    let overlappingEvents = compareEventToOtherEvents(event, events)
    overlappingEventsIdsArray.push(overlappingEvents)
  })

  console.log('overlapping events array of arrays', overlappingEventsIdsArray)
  return overlappingEventsIdsArray
}

// find other events that overlap with this particular event
// return array of ids
// eg: for event 1 it returns [1] because it doesn't overlap with any event
// for event 2 it returns [2, 3] beacuse 2 overlaps with 3
// for event 3 it returns [3, 2, 4]
// for event 4 it returns [4, 3]
function compareEventToOtherEvents(eventToCompare, events) {
  let eventsThatOverlapWithEventToCompare = [eventToCompare.id]

  events.forEach((event, index) => {
    if (eventToCompare.id == event.id) {
      return
    }
    if ((event.start > eventToCompare.start && event.start < eventToCompare.end) ||
      (event.end > eventToCompare.start && event.end < eventToCompare.end) ||
      (event.start < eventToCompare.start && event.end > eventToCompare.end)) {
        eventsThatOverlapWithEventToCompare.push(event.id)
    }
  })
  console.log('e', eventsThatOverlapWithEventToCompare)
  return eventsThatOverlapWithEventToCompare
}

/* step 2 not needed anymore

// step 2
// in this step we want all eevents together that overlap
// for this input [1][2,3][3,2,4][4,3] we want to insert id 4 into [2, 3]
function setEventsTogether(arr) {
  // let copy = arr.map(function(ar) {
  //   return ar.slice();
  // });

  arr.forEach((ar, index) => {
    let modifiedar = compareWithPreviousArrays(ar, arr, index)
    if (modifiedar) {
      console.log('modifiedar', modifiedar)
      arr[modifiedar.idx] = modifiedar.arr
    }

  })

  return arr
}

// [1][2,3][3,2,4][4,3]
// only compare with previous arrays and push all events of current array to previous array if it ovelaps
// for eg 2 ovelaps with 3 and 3 overlaps with 4 so we want 2,3,4 together
// returns a modified array
function compareWithPreviousArrays(arrayToCompare, array, index) {
  let newArray = []
  let idxToReplace

  array.every((arr, idx) => {
    if (index > idx) {

      if (arr.includes(arrayToCompare[0])) {
        console.log('previous array', arr)
        console.log('arrayToCompare', arrayToCompare)
        newArray = pushAllElementsToArray(arr, arrayToCompare)
        console.log('new array', newArray)
        idxToReplace = idx
        return false
      }

    }
    return true
  })

  if (newArray.length) {
    return {
      idx: idxToReplace, arr: newArray
    }
  }

}

*/

// step 3
// now all the eventids that overlaps are together in the array with first overlaping event
// so now we can assign count(which is length of array of ids) to each event which determines width
// and order which determines horizontal position
function setWidthAndOrderToEvents(events, copy) {
  copy.forEach((arr) => {
    setWidthAndOrder(arr)
  })

  function setWidthAndOrder(arrayOfIds) {
      let order = 0
      let skipArray = false
      let width

      arrayOfIds.forEach((id, index) => {
        let event = events[id - 1]
        if (event.width || skipArray) {
          // if the element has width we want to skip it, and if its first element
          // in the array skip all other elements of the array.
          // we will cover them in their own array
          if (index == 0) {
            skipArray = true
          }
          return
        }
        width = width || findWidth(arrayOfIds, events)
        event.width = width
        event.order = order
        order += 1
      })

  }

  console.log('events with width and order', events)
  return events
}

function findWidth(arrayOfIds, events) {
  // we call this function for teh first event in the array.
  // if any overlapping event which occurs before this event and already has width
  // then we return this width
  let event = events[Math.min(...arrayOfIds)]
  return event.width || 600/arrayOfIds.length
}

function setDimensionsToEvents(events) {
  events.forEach(event => {
    event.top = event.start
    event.height = event.end - event.start
    //event.width = 600/event.count
    event.left = event.width * event.order + 10 //for padding
  })
  return events
}

function changeEventFormat(events) {
  events.map((e) => {
    e.start = convertTimeToMinutes(e.start)
    e.end = convertTimeToMinutes(e.end)
    return e
  })

  console.log('new format', events)
  return events
}

function convertTimeToMinutes(start) {
  if (start.slice(-2) == 'am') {
    start = start.slice(0, -2)
    let hour = parseInt(start.substring(0, start.indexOf(":")))
    let minutes = parseInt(start.substring(start.lastIndexOf(":")+1))
    start = (hour - 9) * 60 + minutes
  } else {
    start = start.slice(0, -2)
    let hour = parseInt(start.substring(0, start.indexOf(":")))
    let minutes = parseInt(start.substring(start.lastIndexOf(":")+1))
    start = (hour * 60) + minutes + 180
  }

  return start
}

function pushAllElementsToArray(arr1, arr2) {
  arr2.forEach((a) => {
    if (!arr1.includes(a)) {
      arr1.push(a)
    }
  })

  return arr1
}
