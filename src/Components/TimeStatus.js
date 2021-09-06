import React, { Component } from 'react'

export default class TimeStatus extends Component {
  constructor (props) {
    super(props)
    this.timeFormat = this.timeFormat.bind(this)
  }

  timeFormat (time) {
    return time.length < 2 ? '0' + time : time
  }

  render () {
    const { totalSeconds, isSolvedMode } = this.props
    const seconds = this.timeFormat((totalSeconds % 60).toString())
    const mins = this.timeFormat(Math.floor(totalSeconds / 60).toString())
    return (
      <div className={`status-time ${(isSolvedMode === true) ? 'time-solved-mode' : ''}`}>
        {`${mins}:${seconds}`}
      </div>
    )
  }
}
