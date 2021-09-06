import React, { Component } from 'react'
import DifficultyMenu from './DifficultyMenu'
import TimeStatus from './TimeStatus'
import Button from 'react-bootstrap/Button'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

export default class StatusBoard extends Component {
  render () {
    const {
      totalSeconds,
      cautionMode,
      onCautionMode,
      highlightsMode,
      onHighlightsMode,
      showSolutionMode,
      onShowSolutionChange,
      onNewGameClick,
      onChangeDifficulty,
      isSolvedStatus
    } = this.props
    return (
      <section className='game-status'>
        <DifficultyMenu onChange={onChangeDifficulty} />
        <Button
          variant='secondary'
          onClick={onNewGameClick}
        >New Game
        </Button>
        <TimeStatus totalSeconds={totalSeconds} isSolvedMode={isSolvedStatus} />
        <BootstrapSwitchButton
          checked={highlightsMode}
          onstyle='secondary'
          onlabel='Highlights On'
          offlabel='Highlights Off'
          width={200}
          onChange={onHighlightsMode}
        />
        <BootstrapSwitchButton
          checked={cautionMode}
          onlabel='Caution On'
          offlabel='Caution Off'
          onChange={onCautionMode}
          onstyle='secondary'
          width={200}
        />

        <BootstrapSwitchButton
          checked={isSolvedStatus || showSolutionMode}
          onlabel='Hide Solution'
          offlabel='Show Solution'
          onstyle='secondary'
          onChange={onShowSolutionChange}
          disabled={isSolvedStatus}
          width={200}
        />

      </section>
    )
  }
}
