/**
 * Description. given a sudoku cell, returns the row
 * @param {number} cell the cell of a 9x9 sudoku board.
 * @returns {number} the row the cell belongs to.
 */
function returnRow (cell) {
  return Math.floor(cell / 9)
}

/**
 * Description. given a sudoku cell, returns the column
 * @param {number} cell the cell of a 9x9 sudoku board.
 * @returns {number} the column the cell belongs to.
 */
function returnCol (cell) {
  return cell % 9
}

/**
 * Description. given a sudoku cell, returns the 3x3 block.
 * @param {number} cell the cell of a 9x9 sudoku board.
 * @returns {number} the block the cell belongs to.
 */
function returnBlock (cell) {
  return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3)
}

/**
 * Description. given a number, a row and a sudoku, returns true if the number can be placed in the row.
 * @param {number} number the number to be placed in the row.
 * @param {number} row The row to check.
 * @param {array} sudoku The board to check in.
 * @returns {boolean} true if the number can be placed in the row.
 */
function isPossibleRow (number, row, sudoku) {
  for (let i = 0; i <= 8; i++) {
    if (sudoku[row * 9 + i] === number) {
      return false
    }
  }
  return true
}

/**
 * given a number, a column and a sudoku, returns true if the number can be placed in the column
 * @param {number} number The number to be placed in the column.
 * @param {number} col The column to check.
 * @param {array} sudoku The board to check in.
 * @returns {boolean} true if the number can be placed in the column.
 */
function isPossibleCol (number, col, sudoku) {
  for (let i = 0; i <= 8; i++) {
    if (sudoku[col + 9 * i] === number) {
      return false
    }
  }
  return true
}

/**
 * given a number, a 3x3 block and a sudoku, returns true if the number can be placed in the block
 * @param {number} number The number to be placed in the block.
 * @param {number} block The block to check.
 * @param {array} sudoku The board to check in.
 * @returns {boolean} true if the number can be placed in the block.
 */
function isPossibleBlock (number, block, sudoku) {
  for (let i = 0; i <= 8; i++) {
    if (sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)] === number) {
      return false
    }
  }
  return true
}

/**
 * given a cell, a number and a sudoku, returns true if the number can be placed in the cell.
 * @param {number} cell The cell to place the number in.
 * @param {number} number The number to be placed in the cell.
 * @param {array} sudoku The board to check in.
 * @returns {boolean} true if the number can be placed in the cell.
 */
function isPossibleNumber (cell, number, sudoku) {
  const row = returnRow(cell)
  const col = returnCol(cell)
  const block = returnBlock(cell)
  return isPossibleRow(number, row, sudoku) && isPossibleCol(number, col, sudoku) && isPossibleBlock(number, block, sudoku)
}

/**
 * given a row and a sudoku, returns true if it's a valid row.
 * @param {number} row the row to check
 * @param {array} sudoku The board to check in.
 * @returns {boolean} true if it's a valid row'
 */
function isCorrectRow (row, sudoku) {
  const rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const rowTemp = []
  for (let i = 0; i <= 8; i++) {
    rowTemp[i] = sudoku[row * 9 + i]
  }
  rowTemp.sort()
  return rowTemp.join() === rightSequence.join()
}

/**
 * given a column and a sudoku, returns true if it's a valid column.
 * @param {number} col the column to check
 * @param {array} sudoku The board to check in.
 * @returns {boolean} true if it's a valid column'
 */
function isCorrectCol (col, sudoku) {
  const rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const colTemp = []
  for (let i = 0; i <= 8; i++) {
    colTemp[i] = sudoku[col + i * 9]
  }
  colTemp.sort()
  return colTemp.join() === rightSequence.join()
}

/**
 * given a 3x3 block id and a sudoku, returns true if it's a valid block.
 * @param {number} block the block to check
 * @param {array} sudoku The board to check in.
 * @returns {boolean} true if it's a valid block'
 */
function isCorrectBlock (block, sudoku) {
  const rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const blockTemp = []
  for (let i = 0; i <= 8; i++) {
    blockTemp[i] = sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)]
  }
  blockTemp.sort()
  return blockTemp.join() === rightSequence.join()
}

/**
 * given a sudoku, returns true if the sudoku is solved
 * @param {array} sudoku The board to check.
 * @returns {boolean} true if the sudoku is solved
 */
function isSolvedSudoku (sudoku) {
  for (let i = 0; i <= 8; i++) {
    if (!isCorrectBlock(i, sudoku) || !isCorrectRow(i, sudoku) || !isCorrectCol(i, sudoku)) {
      return false
    }
  }
  return true
}

/**
 * given a cell and a sudoku, returns an array with all possible values we can write in the cell.
 * @param {number} cell the cell to check in.
 * @param {array} sudoku The board to check in.
 * @returns {array} An array with all possible values.
 */
function determinePossibleValues (cell, sudoku) {
  const possible = []
  for (let i = 1; i <= 9; i++) {
    if (isPossibleNumber(cell, i, sudoku)) {
      possible.unshift(i)
    }
  }
  return possible
}

/**
 * given an array of possible values assignable to a cell, returns a random value picked from the array
 * @param {array} possible An array with all possible values for a given cell.
 * @param {number} cell the cell to test.
 * @returns {array} a random value picked from the possible array.
 */
function determineRandomPossibleValue (possible, cell) {
  const randomPicked = Math.floor(Math.random() * possible[cell].length)
  return possible[cell][randomPicked]
}

/**
 * given a sudoku, returns a two dimension array with all possible values
 * @param {array} sudoku The board to check.
 * @returns {boolean} false if the sudoku is not unique.
 * @returns {array} The two dimension array with all possible values, if true.
 */
/*
[
    [ 9, 8, 7, ...],
    .
    .
    .
    [ 9, 8, 7, ...]
]

*/
function scanSudokuForUnique (sudoku) {
  const possible = []
  for (let i = 0; i <= 80; i++) {
    if (sudoku[i] === 0 || sudoku[i] === null) {
      possible[i] = []
      possible[i] = determinePossibleValues(i, sudoku)
      if (possible[i].length === 0) {
        return false
      }
    }
  }
  return possible
}

/**
 * given an array and a number, removes the number from the array
 * @param {array} attemptArray array with attempt numbers.
 * @param {number} number number to remove.
 * @returns {array} attemptArray with number removed.
 */
function removeAttempt (attemptArray, number) {
  for (let i = 0; i < attemptArray.length; i++) {
    if (attemptArray[i] === number) {
      attemptArray.splice(i, 1)
    }
  }
  return attemptArray
}

/**
 * given a two dimension array of possible values, returns the index of a cell where there are the less possible numbers to choose from
 * @param {array} possible a two dimension array of possible values
 * @returns {number} the index of a cell where there are the less possible numbers to choose from.
 */
function nextRandom (possible) {
  let max = 9
  let minChoices = 0
  for (let i = 0; i <= 80; i++) {
    if (possible[i] !== undefined) {
      if ((possible[i].length <= max) && (possible[i].length > 0)) {
        max = possible[i].length
        minChoices = i
      }
    }
  }
  return minChoices
}

/**
 * given a sudoku, solve it and returns it
 * @param {array} sudokuUnsolved unsolved sudoku to solve.
 * @returns {array} a solved sudoku array.
 */
function solve (sudokuUnsolved) {
  let sudoku = [...sudokuUnsolved]
  const saved = []
  const savedSudoku = []
  let nextMove
  let whatToTry
  let attempt

  while (!isSolvedSudoku(sudoku)) {
    // get the next possible moves per cell
    nextMove = scanSudokuForUnique(sudoku)

    // if theres no new moves, check from the last stored moves
    if (nextMove === false) {
      nextMove = saved.pop()
      sudoku = savedSudoku.pop()
    }

    // pick the cell with least number of moves to try
    whatToTry = nextRandom(nextMove)

    // pick at random a number from the possible moves for the given cell
    attempt = determineRandomPossibleValue(nextMove, whatToTry)

    // if there's move, remove it from the list off attempts
    if (nextMove[whatToTry].length > 1) {
      nextMove[whatToTry] = removeAttempt(nextMove[whatToTry], attempt)
      saved.push(nextMove.slice())
      savedSudoku.push(sudoku.slice())
    }
    // add the number/attempt to the sudoku
    sudoku[whatToTry] = attempt
  }

  return sudoku
}

/**
 * given a difficulty, return the number of values to remove from a solved sudoku.
 * @param {string} difficulty a string representing dificulty level.
 * @returns {number} the number of values to remove from a solved sudoku.
 */
function levelNumber (difficulty) {
  // define the different dificulty levels
  const levels = ['hard', 'medium', 'easy']
  // hard => remove 50 - 58 values
  const hard = Array.from(new Array(8), (x, i) => i + 50)
  // medium => remove 40 - 48 values
  const medium = Array.from(new Array(8), (x, i) => i + 40)
  // easy => remove 30 - 38 values
  const easy = Array.from(new Array(8), (x, i) => i + 30)

  // choose a level at random if difficulty is random
  if (difficulty === 'random') {
    difficulty = levels[Math.floor(Math.random() * levels.length)]
  }

  // return a random number in the range for the given difficulty level
  if (difficulty === 'hard') {
    return hard[Math.floor(Math.random() * hard.length)]
  } else if (difficulty === 'medium') {
    return medium[Math.floor(Math.random() * medium.length)]
  } else if (difficulty === 'easy') {
    return easy[Math.floor(Math.random() * easy.length)]
  }
}

/**
 * returns n (quantity) random numbers between 1 and 81, no repeats
 * @param {number} quantity the number of values to remove from a solved sudoku.
 * @returns {array} random numbers between 1 and 81, no repeats.
 */
function randomIndexes (quantity) {
  const randomIndexesArr = []
  while (randomIndexesArr.length < quantity) {
    const number = Math.floor(Math.random() * 81)
    if (randomIndexesArr.indexOf(number) === -1) randomIndexesArr.push(number)
  }
  return randomIndexesArr
}

/**
 * repalece the given indexs with null from a solved sudoku, to create an unsolved sudoku, and returns it
 * @param {array} indexArray containing random numbers between 1 and 81 to remove from the sudoku.
 * @param {array} solvedSudoku solved sudoku array.
 * @returns {array} unsolved sudoku array.
 */
function removeNumbers (indexArray, solvedSudoku) {
  const unsolvedSudoku = [...solvedSudoku]
  for (let i = 0; i < indexArray.length; i++) {
    unsolvedSudoku[indexArray[i]] = null
  }
  return unsolvedSudoku
}

/**
 * returns an unsolved sudoku, given a solved sudoku and difficulty
 * @param {string} difficulty to set on the sudoku.
 * @param {array} sudoku solved sudoku array.
 * @returns {array} unresolved sudoku array.
 */
function getUnsolvedSudoku (difficulty, sudoku) {
  const solvedSudoku = sudoku
  const elemntsToRemove = levelNumber(difficulty)
  const elementsIndexes = randomIndexes(elemntsToRemove)
  const unsolvedSudoku = removeNumbers(elementsIndexes, solvedSudoku)
  return unsolvedSudoku
}

/**
 * returns a solved and unsolved Sudoku, given the difficulty.
 * @param {string} difficulty to set on the sudoku.
 * @returns {object} solved and unsolved Sudoku
 */
function getSudoku (difficulty) {
  const sudoku = [0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0]
  const solvedSudoku = solve(sudoku)
  const unsolvedSudoku = getUnsolvedSudoku(difficulty, solvedSudoku)
  return { solvedSudoku, unsolvedSudoku }
}

/**
 *  returns a sudoku object from a given soduku array.
 * @param {array} SudokuArray sudoku array.
 * @returns {object} sudoku array object.
 */
function generateSudokuObject (SudokuArray) {
  /*
      generate a sudoku with the following structure:

      {rows: [{index: 0, cols: [{row: 0, col: 0, value: 1, readOnly: true, active: false, repeating: false}...]}, ...]}

    */
  const SudokuRowsObject = []
  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i }
    for (let j = 0; j < 9; j++) {
      const value = SudokuArray[i * 9 + j]
      const col = {
        row: i,
        col: j,
        value: value,
        readOnly: value !== null,
        active: false,
        repeating: false
      }
      row.cols.push(col)
    }
    SudokuRowsObject.push(row)
  }
  return SudokuRowsObject
}

/**
 *  returns a sudoku array from agiven sudoku object.
 * @param {object} SudokuObj sudoku array object.
 * @returns {array} sudoku array.
 */
function getSudokuFromObject (SudokuObj) {
  return SudokuObj.map(row => row.cols.map(col => col.value === '' ? null : col.value)).flat()
}

/**
 * A function to create a Share URL.
 * @param {object} gameObj parameters of the played game (sudoku, solveTime...).
 * @returns {string} URL to play the game.
 */
function shareURL (gameObj) {
  const query = btoa(JSON.stringify(gameObj))
  return document.location.href.replace(/\?.+$/, '') + `?sudoku=${query}`
}

/**
 * A function to extract the data from the URL.
 * @returns {object} if any, an object containing game parameters.
 */
function extractURLData () {
  // retrive the URL
  const url = new URL(window.location)
  // get the sudoku parameter
  const sudoku = url.searchParams.get('sudoku')
  // clear all parameters
  url.searchParams.delete('sudoku')
  url.searchParams.delete('foo')
  window.history.pushState({}, '', url)

  // decode the sudoku parameter if given
  if (sudoku) {
    return JSON.parse(atob(sudoku))
  }
  return null
}

/* Export the given functions */
export {
  generateSudokuObject,
  getSudokuFromObject,
  returnBlock,
  isPossibleNumber,
  getSudoku,
  isSolvedSudoku,
  solve,
  shareURL,
  extractURLData
}
