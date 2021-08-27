import React, { Component } from 'react'

export default class SodukoField extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const input = e.target.value
    const value = input === '' ? '' : parseInt(input, 10)
    this.props.onChange({ ...this.props.field, value: value })
  }

  render () {
    const { field } = this.props
    return (
      <input
        className='field'
        value={field.value !== null ? field.value : ''}
        readOnly={field.readOnly}
        onChange={this.handleChange}
      />
    )
  }
}
