import React, { Component } from 'react'
import SodukoBoard from './SodukoBoard'

export default class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      soduko: this.props.soduko
    }
  }

  render () {
    return (
      <div>
        <SodukoBoard soduko={this.state.soduko} />
      </div>
    )
  }
}
