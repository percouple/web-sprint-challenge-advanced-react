import App from '../components/AppFunctional';
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'


let up, down, left, right, reset, submit; 

const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

let squares, coordinates, steps, message, email, head, keypad;

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
  keypad = document.querySelector('#keypad')
}

// Write your tests here
describe('Functional App tests', () => {
  beforeEach(() => {
    render(<App />)
    updateStatelessSelectors(document)
    updateStatefulSelectors(document)
  })

  describe('Visible texts render on-screen', () => {
    test('sanity', () => {
      expect(true).toBe(true)
    })
    test('Coordinates element is visible', () => {
      expect(coordinates.textContent).toBe("Coordinates (2, 2)")
    })
    test('Movement message is visible', () => {
      expect(steps.textContent).toMatch(/You moved \d times*/)
    })
    test('No room click message appears', () => {
      fireEvent.click(up)
      fireEvent.click(up)
      expect(message.textContent).toBe("You can't go up")
    })

  describe('Clicking does as expected', () => {
    test('Clicking a direction increments count', () => {
      fireEvent.click(up)
      expect(steps.textContent).toBe("You moved 1 time");
    })
    test('Clicking a direction path provides correct coordinates', () => {
      fireEvent.click(up)
      fireEvent.click(left)
      fireEvent.click(down)
      fireEvent.click(down)
      expect(coordinates.textContent).toBe("Coordinates (1, 3)")
    })
  })
  })
})
