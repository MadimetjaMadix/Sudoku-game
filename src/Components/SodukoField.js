import React, { Component } from 'react'

export default class SodukoField extends Component {
  render () {
    const { field } = this.props
    console.log(field)
    return (
      <input
        className='field'
        value={field.value !== null ? field.value : ''}
        readOnly={field.readOnly}
      />
    )
  }
}
