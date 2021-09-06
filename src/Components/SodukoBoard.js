import React, { Component } from 'react'
import SodukoField from './SodukoField'

export default class SodukoBoard extends Component {
  render () {
    const { displayMode, soduko, onChange, onClick } = this.props
    return (

      (soduko !== null)
        ? (
          <section className='game-board'>
            {soduko.map((row) =>
              <div className={`board-row-${row.index}`} key={row.index}>
                {row.cols.map((col) =>
                  <SodukoField
                    field={col}
                    key={col.col}
                    className={`board-col-${col.col} ${col.active ? 'active' : ''}`}
                    onChange={onChange}
                    onClick={onClick}
                    displayMode={displayMode}
                  />
                )}

              </div>)}
          </section>
          )
        : (
          <></>
          )

    )
  }
}
