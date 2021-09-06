import React, { Component } from 'react'
// Difficulty options
const options = ['Random', 'Easy', 'Medium', 'Hard']

/* A DifficultyMenu class components to display the dropdown menu */
export default class DifficultyMenu extends Component {
  constructor (props) {
    super(props)
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
  }

  /* A function to handle any selection change */
  handleDifficultyChange (e) {
    const difficulty = options[e.target.options.selectedIndex].toLowerCase()
    this.props.onChange(difficulty)
  }

  render () {
    /* Display the dropdown with the options */
    return (
      <div className='status-difficulty'>
        <span className='status-difficulty-text'>
          Difficulty:
        </span>
        <br />
        <select
          name='status-difficulty-select'
          className='status-difficulty-select'
          onChange={this.handleDifficultyChange}
        >
          {options.map(opt => (
            <option
              value={opt}
              key={opt}
              className='select-option'
            >
              {opt}
            </option>
          ))}
        </select>

      </div>
    )
  }
}
