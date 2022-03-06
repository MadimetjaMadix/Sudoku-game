import React, { Component } from 'react'
import {
  returnBlock,
  isPossibleNumber,
  getSudokuFromObject,
  getSudoku,
  generateSudokuObject,
  isSolvedSudoku,
  solve,
  shareURL,
  extractURLData
} from '../lib/sodukoFns'
import InfoTab from './InfoTab'
import SudokuBoard from './SudokuBoard'
import StatusBoard from './StatusBoard'
import Container from 'react-bootstrap/Container'
import produce from 'immer'

/* A Game class componet to rander the game */
export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = produce({}, () => ({
      sudoku: null,
      solutionSoduko: null,
      highlightsMode: true,
      cautionMode: false,
      penaltySeconds: 0,
      difficulty: 'random',
      displayMode: false,
      showSolution: false,
      isSolved: false,
      startTime: new Date(),
      solvedTime: null,
      shareURL: null

    }))

    this.ititializeBoard = this.ititializeBoard.bind(this)
    this.countUp = this.countUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInputClick = this.handleInputClick.bind(this)
    this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this)
    this.handleNewGameClick = this.handleNewGameClick.bind(this)
    this.handleHighlightsMode = this.handleHighlightsMode.bind(this)
    this.handleCautionMode = this.handleCautionMode.bind(this)
    this.handleShowSolution = this.handleShowSolution.bind(this)
    this.handleClearSelection = this.handleClearSelection.bind(this)
    this.handleShareGame = this.handleShareGame.bind(this)
    this.isSolved = this.isSolved.bind(this)
  }

  /* A function to initialise the game */
  ititializeBoard () {
    const URLData = extractURLData()
    let sudokuData
    if (URLData) {
      sudokuData = {
        solvedSudoku: solve(URLData.rawSoduko),
        unsolvedSudoku: URLData.rawSoduko
      }
    }
    const { solvedSudoku, unsolvedSudoku } = URLData ? sudokuData : getSudoku(this.state.difficulty)

    this.setState(produce(state => {
      state.sudokuRaw = unsolvedSudoku
      state.sudoku = generateSudokuObject(unsolvedSudoku)
      state.solutionSoduko = generateSudokuObject(solvedSudoku)
      state.penaltySeconds = 0
      state.displayMode = false
      state.showSolution = false
      state.isSolved = false
      state.startTime = new Date()
      state.solvedTime = null
      state.URLData = URLData
    }))
    setInterval(this.countUp, 1000)
  }

  /* A function to run once the component is mounted */
  componentDidMount () {
    // this.ititializeBoard()
  }

  /* A function to increment/update the penaltySeconds state varriable */
  countUp () {
    if (this.state.isSolved) {
      // return if the pazzle is solved
      // this.isSolved()
      return
    } else if (this.state.showSolution) {
      // increment by 10 if the solution is viewed
      this.setState(produce(state => {
        state.penaltySeconds = state.penaltySeconds + 1
      }))
    }
    // else increment by 1
    /* this.setState(produce(state => {
      state.penaltySeconds = state.penaltySeconds + 1
    })) */
    this.isSolved()
  }

  /* A function to check if the sudoku is soved and update the isSolved stated variable accordingly */
  isSolved () {
    const sodukoArray = getSudokuFromObject(this.state.sudoku)
    const isSolved = isSolvedSudoku(sodukoArray)
    this.setState(produce(state => {
      state.isSolved = isSolved
      state.solvedTime = isSolved ? new Date() : null
    }))

    if (isSolved) {
      const sudokuObj = {
        raw: this.state.sudokuRaw,
        startTime: this.state.startTime,
        solvedTime: this.state.solvedTime,
        penaltySeconds: this.state.penaltySeconds
      }
      this.setState(produce(state => {
        state.shareURL = shareURL(sudokuObj)
      }))
    }
  }

  /* A function to intialise the game if the New Game button is clicked */
  handleNewGameClick () {
    this.ititializeBoard()
  }

  /* A function to update the difficulty state variable on change */
  handleChangeDifficulty (difficulty) {
    this.setState(produce(state => {
      state.difficulty = difficulty
    }))
  }

  /* A function to update the showSolution and displayMode state variables on change */
  handleShowSolution () {
    this.setState(produce(state => {
      state.showSolution = !state.showSolution
      state.displayMode = state.showSolution
    }))
    this.countUp()
  }

  /* A function to update the highlightsMode state variable on change */
  handleHighlightsMode () {
    this.setState(produce(state => {
      state.highlightsMode = !state.highlightsMode
    }))
    if (this.state.highlightsMode) this.handleClearSelection()
  }

  /* A function to update the cautionMode state variable on change */
  handleCautionMode () {
    this.setState(produce(state => {
      state.cautionMode = !state.cautionMode
    }))
    if (this.state.cautionMode) this.handleClearSelection()
  }

  /* A function to update the active and repeating properties of the sudoku object */
  handleClearSelection () {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.setState(produce(state => {
          state.sudoku[i].cols[j].active = false
          state.sudoku[i].cols[j].repeating = false
        }))
      }
    }
  }

  /* A function to highlight the 3x3 block, row and column of the clicked cell if highlightsMode is active */
  handleInputClick (e) {
    if (this.state.highlightsMode) {
      this.handleClearSelection()
      for (let col = 0; col < 9; col++) {
        this.setState(produce(state => {
          state.sudoku[e.row].cols[col].active = true
        }))
      }
      for (let row = 0; row < 9; row++) {
        this.setState(produce(state => {
          state.sudoku[row].cols[e.col].active = true
        }))
      }
      const cell = e.row * 9 + e.col
      const blocknum = returnBlock(cell)
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const row = (Math.floor(blocknum / 3) * 3) + i
          const col = (blocknum % 3 * 3) + j
          this.setState(produce(state => {
            state.sudoku[row].cols[col].active = true
          }))
        }
      }
    }
  }

  /* A function to update the value of the given cell of the sudoku object */
  handleChange (e) {
    /** create the next immutable state by mutating the current one */
    const sodukoArray = getSudokuFromObject(this.state.sudoku)
    const cell = e.row * 9 + e.col
    const isRepeating = !isPossibleNumber(cell, e.value, sodukoArray) && this.state.cautionMode
    this.setState(produce(state => {
      state.sudoku[e.row].cols[e.col].value = e.value
      state.sudoku[e.row].cols[e.col].repeating = isRepeating
    }))
  }

  /** A Function to create data to share the game */
  handleShareGame () {
    let name = null
    while (name === null) {
      name = prompt('Please enter your name to share the Game')
    }
    /* content to share */
    const sudokuObj = {
      name: name,
      raw: this.state.sudokuRaw,
      startTime: this.state.startTime,
      solvedTime: this.state.solvedTime,
      penaltySeconds: this.state.penaltySeconds
    }
    /* set the state variables */
    this.setState(produce(state => {
      state.shareURL = shareURL(sudokuObj)
      state.shareData = sudokuObj
    }))
  }

  render () {
    // get the sudoku to display based on the mode
    const sudoku = (this.state.showSolution) ? this.state.solutionSoduko : this.state.sudoku
    return (

      <>
        <Container>
          <InfoTab isSolvedStatus={this.state.isSolved} onShareClick={this.handleShareGame} />
        </Container>
        <br />
        <Container>
          {this.state.shareData && <p>share data ready</p>}
        </Container>
        <Container className='game-components'>

          {
            sudoku && <SudokuBoard
              displayMode={this.state.displayMode}
              sudoku={sudoku}
              onChange={this.handleChange}
              onClick={this.handleInputClick}
                      />
            }

          <StatusBoard
            startTime={this.state.startTime}
            solvedTime={this.state.solvedTime}
            cautionMode={this.state.cautionMode}
            onCautionMode={this.handleCautionMode}
            highlightsMode={this.state.highlightsMode}
            onHighlightsMode={this.handleHighlightsMode}
            showSolutionMode={this.state.showSolution}
            onShowSolutionChange={this.handleShowSolution}
            onNewGameClick={this.handleNewGameClick}
            onChangeDifficulty={this.handleChangeDifficulty}
            isSolvedStatus={this.state.isSolved}
            dispayBoard={sudoku !== null}
          />
        </Container>
      </>

    )
  }
}
