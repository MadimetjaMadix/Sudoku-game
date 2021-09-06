import React, { Component, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

/* A fuction to return the how to popup modal */
function HowToModal () {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button variant='info' onClick={() => setShow(true)}>
        help
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby='how-to-modal'
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='how-to-modal' className='how-to-modal-title'>
            How to Play Sudoku
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='how-to-modal-body'>
          <p>Every sudoku puzzle involves a 9×9 grid of squares subdivided into 3×3 boxes.
          </p>
          <p>In total there are 81 squares on a sudoku grid and when the puzzle is completed each square will contain exactly one number.</p>

          <h4>Rules </h4>
          <p>Sudoku is a puzzle based on a small number of very simple rules:</p>
          <ul>
            <li>Every square has to contain a single number </li>
            <li>Only the numbers from 1 through to 9 can be used </li>
            <li>Each 3×3 box can only contain each number from 1 to 9 once </li>
            <li>Each vertical column can only contain each number from 1 to 9 once </li>
            <li>Each horizontal row can only contain each number from 1 to 9 once </li>
          </ul>

          <p>Once the puzzle is solved, this means that every row, column, and 3×3 box will contain every number from 1 to 9 exactly once.  </p>
          <p>In other words, no number can be repeated in any 3×3 box, row, or column. </p>

          <h4>Buttons and Modes</h4>
          <ul>
            <li> <b>Difficulty: </b> Lets you choose between easy, medium and hard. it is on random by default. </li>
            <li> <b>New Game: </b> Lets you start a new game using the difficulty selected. </li>
            <li> <b>Timer: </b> This displays the elapsed time since the game started. It only stops once the puzzle is solved. The counter increments by 10 every second you spend viewing the solution.</li>
            <li> <b>Highlights Mode: </b> This Highlights the row, column, and 3×3 box the clicked square belongs to.</li>
            <li> <b>Caution Mode: </b> This lets you know if a number is repeating in its given row, column, and 3×3 box. The enterned number will be red if it is repeating </li>
            <li> <b>Show Solution: </b>  This lets you see the solved solution.</li>
          </ul>

        </Modal.Body>
      </Modal>
    </>
  )
}

/* a InfoTab class component to display the help button */
export default class InfoTab extends Component {
  render () {
    const { isSolvedStatus } = this.props
    return (
      <div className='info-tab'>
        <h4>{isSolvedStatus === true ? 'Puzzle Solved' : 'Welcome'} </h4>
        <HowToModal />
      </div>
    )
  }
}
