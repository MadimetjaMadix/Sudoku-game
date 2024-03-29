import React, { Component } from 'react'
import DifficultyMenu from './DifficultyMenu'
import TimeStatus from './TimeStatus'
import Button from 'react-bootstrap/Button'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

/* A StatusBoard class comonent to display the game status and additional buttons */
export default class StatusBoard extends Component {
  render () {
    /* retrive all the props */
    const {
      startTime,
      solvedTime,
      cautionMode,
      onCautionMode,
      highlightsMode,
      onHighlightsMode,
      showSolutionMode,
      onShowSolutionChange,
      onNewGameClick,
      onChangeDifficulty,
      isSolvedStatus,
      dispayBoard
    } = this.props

    return (
      <section className='game-status'>
        {/* Display the difficulty selection menu */}
        <DifficultyMenu onChange={onChangeDifficulty} />

        {/* Display a button for initialising a new game */}
        <Button
          variant='secondary'
          onClick={onNewGameClick}
        >New Game
        </Button>

        {/* Display the time elapsed since the game started */}
        {dispayBoard && <TimeStatus startTime={startTime} solvedTime={solvedTime} isSolvedMode={isSolvedStatus} />}

        {/* Display the switch for changing the highlightsMode */}
        {dispayBoard && !isSolvedStatus &&
          <BootstrapSwitchButton
            checked={highlightsMode}
            onstyle='secondary'
            onlabel='Highlights On'
            offlabel='Highlights Off'
            width={200}
            onChange={onHighlightsMode}
          />}

        {/* Display the switch for changing the cautionMode */}
        {dispayBoard && !isSolvedStatus &&
          <BootstrapSwitchButton
            checked={cautionMode}
            onlabel='Caution On'
            offlabel='Caution Off'
            onChange={onCautionMode}
            onstyle='secondary'
            width={200}
          />}

        {/* Display the switch for changing the showSolutionMode */}
        {dispayBoard && !isSolvedStatus &&
          <BootstrapSwitchButton
            checked={isSolvedStatus || showSolutionMode}
            onlabel='Hide Solution'
            offlabel='Show Solution'
            onstyle='secondary'
            onChange={onShowSolutionChange}
            disabled={isSolvedStatus}
            width={200}
          />}

      </section>
    )
  }
}
