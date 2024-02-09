// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor (props){
    super(props);
    this.state = {
      currentIndex: initialIndex,
      inputEmail: initialEmail,
      moveCount: initialSteps,
      errorMessage: initialMessage,
    };
  }
  
  getXY = (currentIndex) => {
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

  getXYMessage = () => {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
    let {x , y} = this.getXY(this.state.currentIndex)

    return `${x}, ${y}`;
  }

  reset = () => {
    // Use this helper to reset all states to their initial values.
    this.setState({
      inputEmail: initialEmail,
      currentIndex: initialIndex,
      moveCount: initialSteps,
      errorMessage: '',
    })
  }

  getNextIndex = (direction) => {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.

    const badUps = [0, 1, 2];
    const badDowns = [6, 7, 8];
    const badLefts = [0, 3, 6];
    const badRights = [2, 5, 8];

    let nextIndex = this.state.currentIndex;
    this.setState({
      errorMessage: ''
    })

    switch (direction) {
      case "UP":
        if (!badUps.includes(this.state.currentIndex)) {
          nextIndex = this.state.currentIndex - 3;
        }
        else {
          this.setState({
            errorMessage: "You can't go up"
          })
          return nextIndex;
        }
        break;

      case "DOWN":
        if (!badDowns.includes(this.currentIndex)) {
          nextIndex = this.currentIndex + 3;
        }
        else {
          this.setState({
            errorMessage: "You can't go down"
          })
          return nextIndex;
        }
        break;

      case "LEFT":
        if (!badLefts.includes(this.currentIndex)) {
          nextIndex = this.currentIndex - 1;
        }
        else {
          this.setState({
            errorMessage: "You can't go left"
          })
          return nextIndex;
        }
        break;

      case "RIGHT":
        if (!badRights.includes(this.currentIndex)) {
          nextIndex = this.currentIndex + 1
        }
        else {
          this.setState({
            errorMessage: "You can't go right"
          })
          return nextIndex;
        }
        break;

    }

    return nextIndex;
  }

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.textContent;
    this.setState(prevIndex => {

      // Get new index after the button has been pressed
      const newIndex = getNextIndex(direction)

      // Count incrementor
      if (newIndex !== prevIndex) {
        setMoveCount(prevCount => prevCount + 1);
      }
      return newIndex;
    });
  }

  onChange = (evt) => {
    // You will need this to update the value of the input.
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  componentDidUpdate (props) {
    console.log(this.currentIndex)
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <p>(This component is not required to pass the sprint)</p>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.currentIndex} ? ' active' : ''}`}>
                {idx === this.currentIndex ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
