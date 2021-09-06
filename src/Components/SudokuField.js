import React, { Component } from 'react'
import { returnBlock } from '../lib/sodukoFns'

/* A SudokuField class component to display each cell of the board */
export default class SudokuField extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  /* A function to handle any input change */
  handleChange (e) {
    let input = e.target.value
    if (!parseInt(input, 10)) input = ''
    const value = input === '' ? '' : parseInt(input, 10)
    this.props.onChange({ ...this.props.field, value: value })
  }

  /* A function to handle any click change */
  handleClick () {
    this.props.onClick({ ...this.props.field })
  }

  /* display the cell/field */
  render () {
    const { displayMode, field, className } = this.props
    const blockNum = returnBlock(field.row * 9 + field.col)
    return (
      <input
        className={`field ${className} block-${blockNum} ${field.repeating ? 'repeating' : ''}`}
        value={field.value !== null ? field.value : ''}
        readOnly={field.readOnly || displayMode}
        maxLength='1'
        onChange={this.handleChange}
        onClick={this.handleClick}
      />
    )
  }
}
