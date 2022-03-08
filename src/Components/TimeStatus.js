import React, { Component } from 'react'
import { timeFormat } from '../lib/timeFns'

export default class TimeStatus extends Component {
  render () {
    const { startTime, solvedTime, isSolvedMode } = this.props
    const timeNow = isSolvedMode ? solvedTime : null
    return (
      /* Add classes based on the isSolvedMode */
      <div className={`status-time ${(isSolvedMode === true) ? 'time-solved-mode' : ''}`}>
        {timeFormat(startTime, timeNow)}
      </div>
    )
  }
}
