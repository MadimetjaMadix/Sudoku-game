import React, { Component } from 'react'

export default class TimeStatus extends Component {
  constructor (props) {
    super(props)
    this.timeFormat = this.timeFormat.bind(this)
  }

  /* A function to for a number to 2 digits */
  timeFormat (time) {
    return time.length < 2 ? '0' + time : time
  }

  render () {
    const { startTime, solvedTime, isSolvedMode } = this.props
    const timeNew = isSolvedMode ? solvedTime : new Date()
    const secondsElapsed = parseInt((timeNew - startTime) / 1000)
    /* claculate the corresponding seconds from the totalSeconds */
    const seconds = this.timeFormat((secondsElapsed % 60).toString())
    /* claculate the corresponding minutes from the totalSeconds */
    const mins = this.timeFormat(Math.floor(secondsElapsed / 60).toString())

    return (
      /* Add classes based on the isSolvedMode */
      <div className={`status-time ${(isSolvedMode === true) ? 'time-solved-mode' : ''}`}>
        {`${mins}:${seconds}`}
      </div>
    )
  }
}
