// given a sudoku cell, returns the row
function returnRow (cell) {
  return Math.floor(cell / 9)
}

// given a sudoku cell, returns the column
function returnCol (cell) {
  return cell % 9
}

// given a sudoku cell, returns the 3x3 block
function returnBlock (cell) {
  return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3)
}

// given a number, a row and a sudoku, returns true if the number can be placed in the row
function isPossibleRow (number, row, sudoku) {
  for (let i = 0; i <= 8; i++) {
    if (sudoku[row * 9 + i] === number) {
      return false
    }
  }
  return true
}

// given a number, a column and a sudoku, returns true if the number can be placed in the column
function isPossibleCol (number, col, sudoku) {
  for (let i = 0; i <= 8; i++) {
    if (sudoku[col + 9 * i] === number) {
      return false
    }
  }
  return true
}

// given a number, a 3x3 block and a sudoku, returns true if the number can be placed in the block
function isPossibleBlock (number, block, sudoku) {
  for (let i = 0; i <= 8; i++) {
    if (sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)] === number) {
      return false
    }
  }
  return true
}

// given a cell, a number and a sudoku, returns true if the number can be placed in the cell
function isPossibleNumber (cell, number, sudoku) {
  const row = returnRow(cell)
  const col = returnCol(cell)
  const block = returnBlock(cell)
  return isPossibleRow(number, row, sudoku) && isPossibleCol(number, col, sudoku) && isPossibleBlock(number, block, sudoku)
}

// given a row and a sudoku, returns true if it's a legal row
function isCorrectRow (row, sudoku) {
  const rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const rowTemp = []
  for (let i = 0; i <= 8; i++) {
    rowTemp[i] = sudoku[row * 9 + i]
  }
  rowTemp.sort()
  return rowTemp.join() === rightSequence.join()
}

// given a column and a sudoku, returns true if it's a legal column
function isCorrectCol (col, sudoku) {
  const rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const colTemp = []
  for (let i = 0; i <= 8; i++) {
    colTemp[i] = sudoku[col + i * 9]
  }
  colTemp.sort()
  return colTemp.join() === rightSequence.join()
}

// given a 3x3 block and a sudoku, returns true if it's a legal block
function isCorrectBlock (block, sudoku) {
  const rightSequence = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const blockTemp = []
  for (let i = 0; i <= 8; i++) {
    blockTemp[i] = sudoku[Math.floor(block / 3) * 27 + i % 3 + 9 * Math.floor(i / 3) + 3 * (block % 3)]
  }
  blockTemp.sort()
  return blockTemp.join() === rightSequence.join()
}

// given a sudoku, returns true if the sudoku is solved
function isSolvedSudoku (sudoku) {
  for (let i = 0; i <= 8; i++) {
    if (!isCorrectBlock(i, sudoku) || !isCorrectRow(i, sudoku) || !isCorrectCol(i, sudoku)) {
      return false
    }
  }
  return true
}

// given a cell and a sudoku, returns an array with all possible values we can write in the cell
function determinePossibleValues (cell, sudoku) {
  const possible = []
  for (let i = 1; i <= 9; i++) {
    if (isPossibleNumber(cell, i, sudoku)) {
      possible.unshift(i)
    }
  }
  return possible
}

// given an array of possible values assignable to a cell, returns a random value picked from the array
function determineRandomPossibleValue (possible, cell) {
  const randomPicked = Math.floor(Math.random() * possible[cell].length)
  return possible[cell][randomPicked]
}

// given a sudoku, returns a two dimension array with all possible values
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

// given an array and a number, removes the number from the array
function removeAttempt (attemptArray, number) {
  for (let i = 0; i < attemptArray.length; i++) {
    if (attemptArray[i] === number) {
      attemptArray.splice(i, 1)
    }
  }
  return attemptArray
}

// given a two dimension array of possible values, returns the index of a cell where there are the less possible numbers to choose from
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

// given a sudoku, solves it
function solve (sudoku) {
  const saved = []
  const savedSudoku = []
  let nextMove
  let whatToTry
  let attempt
  while (!isSolvedSudoku(sudoku)) {
    nextMove = scanSudokuForUnique(sudoku)
    if (nextMove === false) {
      nextMove = saved.pop()
      sudoku = savedSudoku.pop()
    }
    whatToTry = nextRandom(nextMove)

    attempt = determineRandomPossibleValue(nextMove, whatToTry)
    if (nextMove[whatToTry].length > 1) {
      nextMove[whatToTry] = removeAttempt(nextMove[whatToTry], attempt)
      saved.push(nextMove.slice())
      savedSudoku.push(sudoku.slice())
    }
    sudoku[whatToTry] = attempt
  }

  return sudoku
}

function levelNumber (difficulty) {
  const levels = ['hard', 'medium', 'easy']
  const hard = Array.from(new Array(5), (x, i) => i + 58)
  const medium = Array.from(new Array(5), (x, i) => i + 50)
  const easy = Array.from(new Array(5), (x, i) => i + 41)

  if (difficulty === 'random') {
    difficulty = levels[Math.floor(Math.random() * levels.length)]
  }

  if (difficulty === 'hard') {
    return hard[Math.floor(Math.random() * hard.length)]
  } else if (difficulty === 'medium') {
    return medium[Math.floor(Math.random() * medium.length)]
  } else if (difficulty === 'easy') {
    return easy[Math.floor(Math.random() * easy.length)]
  }
}

function randomIndexes (quantity) {
  const randomIndexesArr = []
  while (randomIndexesArr.length < quantity) {
    const number = Math.floor(Math.random() * 81)
    if (randomIndexesArr.indexOf(number) === -1) randomIndexesArr.push(number)
  }
  return randomIndexesArr
}

function removeNumbers (indexArray, solvedSoduko) {
  const unsolvedSoduko = [...solvedSoduko]
  for (let i = 0; i < indexArray.length; i++) {
    unsolvedSoduko[indexArray[i]] = null
  }
  return unsolvedSoduko
}

function getUnsolvedSoduko (difficulty, soduko) {
  const solvedSoduko = soduko
  const elemntsToRemove = levelNumber(difficulty)
  const elementIndexes = randomIndexes(elemntsToRemove)
  const unsolvedSoduko = removeNumbers(elementIndexes, solvedSoduko)
  return unsolvedSoduko
}

function getSoduko (difficulty) {
  const soduko = Array(81).fill(null)
  const solvedSoduko = solve(soduko)
  const unsolvedSoduko = getUnsolvedSoduko(difficulty, solvedSoduko)
  return { solvedSoduko, unsolvedSoduko }
}

function generateSodukoObject (difficulty) {
  const { solvedSoduko, unsolvedSoduko } = getSoduko(difficulty)

  /*
      generate a sudoku with the following structure:

      {rows: [{index: 0, cols: [{row: 0, col: 0, value: 1, readOnly: true}...]}, ...]}

    */
  const sodukoRowsObject = []
  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i }
    for (let j = 0; j < 9; j++) {
      const value = unsolvedSoduko[i * 9 + j]
      const col = {
        row: i,
        col: j,
        value: value,
        readOnly: value !== null
      }
      row.cols.push(col)
    }
    sodukoRowsObject.push(row)
  }
  return sodukoRowsObject
}

function getSodukoFromObject (sodukoObj) {
  return sodukoObj.map(row => row.cols.map(col => col.value)).flat()
}
export { solve, generateSodukoObject, getSodukoFromObject }
