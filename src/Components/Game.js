import React, { Component } from 'react'
import SodukoBoard from './SodukoBoard'
import produce from 'immer'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = produce({}, () => ({
      soduko: this.props.soduko
    }))

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    /** create the next immutable state by mutating the current one */
    console.log(e)
    this.setState(produce(state => {
      state.soduko[e.row].cols[e.col].value = e.value
    }))
  }

  render () {
    return (
      <div>
        <SodukoBoard
          soduko={this.state.soduko}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
