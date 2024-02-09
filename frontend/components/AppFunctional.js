import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  let [inputEmail, setInputEmail] = useState(initialEmail);
  let [currentIndex, setCurrentIndex] = useState(initialIndex);
  let [moveCount, setMoveCount] = useState(initialSteps);
  let [errorMessage, setErrorMessage] = useState(initialMessage);


  function getXY(currentIndex) {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.

    let counter = currentIndex;
    let x = 1;
    let y = 1;

    while (counter > 0) {
      x++;
      if (x > 3) {
        y++;
        x = 1;
      }
      counter--;
    }

    return { x: x, y: y };

  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    let { x, y } = getXY(currentIndex)

    return `${x}, ${y}`;
  }

  function reset() {
    // Use this helper to reset all states to their initial values.
    setInputEmail(initialEmail);
    setCurrentIndex(initialIndex);
    setMoveCount(initialSteps);
    setErrorMessage('');
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const badUps = [0, 1, 2];
    const badDowns = [6, 7, 8];
    const badLefts = [0, 3, 6];
    const badRights = [2, 5, 8];

    let nextIndex = currentIndex;
    setErrorMessage("")

    switch (direction) {
      case "UP":
        if (!badUps.includes(currentIndex)) {
          nextIndex = currentIndex - 3;
        }
        else {
          setErrorMessage("You can't go up")
          return nextIndex;
        }
        break;

      case "DOWN":
        if (!badDowns.includes(currentIndex)) {
          nextIndex = currentIndex + 3;
        }
        else {
          setErrorMessage("You can't go down")
          return nextIndex;
        }
        break;

      case "LEFT":
        if (!badLefts.includes(currentIndex)) {
          nextIndex = currentIndex - 1;
        }
        else {
          setErrorMessage("You can't go left")
          return nextIndex;
        }
        break;

      case "RIGHT":
        if (!badRights.includes(currentIndex)) {
          nextIndex = currentIndex + 1
        }
        else {
          setErrorMessage("You can't go right")
          return nextIndex;
        }
        break;

    }

    return nextIndex;
  }

  function move(evt) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.textContent;
    setCurrentIndex(prevIndex => {

      // Get new index after the button has been pressed
      const newIndex = getNextIndex(direction)

      // Count incrementor
      if (newIndex !== prevIndex) {
        setMoveCount(prevCount => prevCount + 1);
      }
      return newIndex;
    });
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
    setInputEmail(evt.target.value)
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    // Group in post object state
    let postObj = { x: `${getXY(currentIndex).x}`, y: `${getXY(currentIndex).y}`, steps: `${moveCount}`, email: inputEmail };
    axios.post('http://localhost:9000/api/result', postObj)
      .then((res) => {
        setErrorMessage(res.data.message)
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message)
      })
    setInputEmail(initialEmail);
    setErrorMessage('');
  }


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates" >Coordinates ({getXYMessage()})</h3>
        <h3 id="steps">You moved {moveCount} time{moveCount === 1 ? '' : 's'}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === currentIndex ? ' active' : ''}`}>
              {idx === currentIndex ? "B" : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{errorMessage}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={inputEmail}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
