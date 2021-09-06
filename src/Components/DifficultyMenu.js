import React, { Component } from 'react'

const options = ['Random', 'Easy', 'Medium', 'Hard']
export default class DifficultyMenu extends Component {
  constructor (props) {
    super(props)
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
  }

  handleDifficultyChange (e) {
    const difficulty = options[e.target.options.selectedIndex].toLowerCase()
    this.props.onChange(difficulty)
  }

  render () {
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
