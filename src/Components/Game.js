import React, { Component } from 'react'
import {
  returnBlock,
  isPossibleNumber,
  getSodukoFromObject,
  getSoduko,
  generateSodukoObject,
  isSolvedSudoku
} from '../lib/sodukoFns'
import InfoTab from './InfoTab'
import SodukoBoard from './SodukoBoard'
import StatusBoard from './StatusBoard'
import Container from 'react-bootstrap/Container'
import produce from 'immer'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = produce({}, () => ({
      soduko: null,
      solutionSoduko: null,
      highlightsMode: true,
      cautionMode: false,
      totalSeconds: 0,
      difficulty: 'random',
      displayMode: false,
      showSolution: false,
      isSolved: false

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
    this.isSolved = this.isSolved.bind(this)
  }

  ititializeBoard () {
    const { solvedSoduko, unsolvedSoduko } = getSoduko(this.state.difficulty)
    this.setState(produce(state => {
      state.soduko = generateSodukoObject(unsolvedSoduko)
      state.solutionSoduko = generateSodukoObject(solvedSoduko)
      state.totalSeconds = 0
      state.displayMode = false
      state.showSolution = false
      state.isSolved = false
    }))
  }

  componentDidMount () {
    this.ititializeBoard()
    setInterval(this.countUp, 1000)
  }

  countUp () {
    if (this.state.isSolved) {
      this.isSolved()
      return
    } else if (this.state.showSolution) {
      this.setState(produce(state => {
        state.totalSeconds = state.totalSeconds + 10
      }))
    }
    this.setState(produce(state => {
      state.totalSeconds = state.totalSeconds + 1
    }))
    this.isSolved()
  }

  isSolved () {
    const sodukoArray = getSodukoFromObject(this.state.soduko)
    this.setState(produce(state => {
      state.isSolved = isSolvedSudoku(sodukoArray)
    }))
  }

  handleNewGameClick () {
    this.ititializeBoard()
  }

  handleChangeDifficulty (difficulty) {
    this.setState(produce(state => {
      state.difficulty = difficulty
    }))
  }

  handleShowSolution () {
    this.setState(produce(state => {
      state.showSolution = !state.showSolution
      state.displayMode = state.showSolution
    }))
  }

  handleHighlightsMode () {
    this.setState(produce(state => {
      state.highlightsMode = !state.highlightsMode
    }))
    if (this.state.highlightsMode) this.handleClearSelection()
  }

  handleCautionMode () {
    this.setState(produce(state => {
      state.cautionMode = !state.cautionMode
    }))
    if (this.state.cautionMode) this.handleClearSelection()
  }

  handleClearSelection () {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        this.setState(produce(state => {
          state.soduko[i].cols[j].active = false
          state.soduko[i].cols[j].repeating = false
        }))
      }
    }
  }

  handleInputClick (e) {
    if (this.state.highlightsMode) {
      this.handleClearSelection()
      for (let col = 0; col < 9; col++) {
        this.setState(produce(state => {
          state.soduko[e.row].cols[col].active = true
        }))
      }
      for (let row = 0; row < 9; row++) {
        this.setState(produce(state => {
          state.soduko[row].cols[e.col].active = true
        }))
      }
      const cell = e.row * 9 + e.col
      const blocknum = returnBlock(cell)
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const row = (Math.floor(blocknum / 3) * 3) + i
          const col = (blocknum % 3 * 3) + j
          this.setState(produce(state => {
            state.soduko[row].cols[col].active = true
          }))
        }
      }
    }
  }

  handleChange (e) {
    /** create the next immutable state by mutating the current one */
    const sodukoArray = getSodukoFromObject(this.state.soduko)
    const cell = e.row * 9 + e.col
    const isRepeating = !isPossibleNumber(cell, e.value, sodukoArray) && this.state.cautionMode
    this.setState(produce(state => {
      state.soduko[e.row].cols[e.col].value = e.value
      state.soduko[e.row].cols[e.col].repeating = isRepeating
    }))
  }

  render () {
    const soduko = (this.state.showSolution) ? this.state.solutionSoduko : this.state.soduko
    return (

      <>
        <Container>
          <InfoTab isSolvedStatus={this.state.isSolved} />
        </Container>
        <br />
        <Container>

          <SodukoBoard
            displayMode={this.state.displayMode}
            soduko={soduko}
            onChange={this.handleChange}
            onClick={this.handleInputClick}
          />

          <StatusBoard
            totalSeconds={this.state.totalSeconds}
            cautionMode={this.state.cautionMode}
            onCautionMode={this.handleCautionMode}
            highlightsMode={this.state.highlightsMode}
            onHighlightsMode={this.handleHighlightsMode}
            showSolutionMode={this.state.showSolution}
            onShowSolutionChange={this.handleShowSolution}
            onNewGameClick={this.handleNewGameClick}
            onChangeDifficulty={this.handleChangeDifficulty}
            isSolvedStatus={this.state.isSolved}
          />
        </Container>
      </>

    )
  }
}
