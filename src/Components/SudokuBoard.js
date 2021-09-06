import React, { Component } from 'react'
import SudokuField from './SudokuField'

/* A SudokuBoard class component to display the board */
export default class SudokuBoard extends Component {
  render () {
    const { displayMode, sudoku, onChange, onClick } = this.props
    /* map through the rows, the through the colums of each row and display each field */
    return (

      (sudoku !== null)
        ? (
          <section className='game-board'>
            {sudoku.map((row) =>
              <div className={`board-row-${row.index}`} key={row.index}>
                {row.cols.map((col) =>
                  <SudokuField
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
