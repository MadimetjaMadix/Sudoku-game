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
    const { totalSeconds, isSolvedMode } = this.props
    /* claculate the corresponding seconds from the totalSeconds */
    const seconds = this.timeFormat((totalSeconds % 60).toString())
    /* claculate the corresponding minutes from the totalSeconds */
    const mins = this.timeFormat(Math.floor(totalSeconds / 60).toString())

    return (
      /* Add classes based on the isSolvedMode */
      <div className={`status-time ${(isSolvedMode === true) ? 'time-solved-mode' : ''}`}>
        {`${mins}:${seconds}`}
      </div>
    )
  }
}
