import React, { Component } from 'react'
import SodukoField from './SodukoField'

export default class SodukoBoard extends Component {
  render () {
    const { soduko } = this.props
    console.log(soduko)
    return (
      <div className='board'>
        {soduko.map((row) =>
          <div className='board-row' key={row.index}>
            {row.cols.map((col) =>
              <SodukoField field={col} key={col.col} className='board-col' />
            )}

          </div>)}
      </div>
    )
  }
}
