import { WINNING_LENGTH } from './constants'

export const findWinningCells = (columns) => {
  for (let col = 0; col < columns.length; col++) {
    for (let row = 0; row < columns[col].length; row++) {
      const winningCells = [
        checkVertical(columns, row, col),
        checkHorizontal(columns, row, col),
        checkDiagonalUp(columns, row, col),
        checkDiagonalDown(columns, row, col),
      ].find(cells => cells)

      if (winningCells) {
        return winningCells
      }
    }
  }

  return null
}

const allEqual = arr => arr.every(x => x === arr[0])

const getCell = (columns, row, col) => {
  return columns[col] && columns[col][row]
}

const checkFrom = (columns, row, col, next) => {
  const players = []
  const cells = []

  for (let i = 0; i < WINNING_LENGTH; i++) {
    let [curRow, curCol] = next(row, col, i)
    players.push(getCell(columns, curRow, curCol))
    cells.push([curRow, curCol])
  }

  return allEqual(players) && cells
}

const checkVertical = (columns, row, col) => {
  return checkFrom(columns, row, col, (r, c, i) => [r + i, c])
}

const checkHorizontal = (columns, row, col) => {
  return checkFrom(columns, row, col, (r, c, i) => [r, c + i])
}

const checkDiagonalDown = (columns, row, col) => {
  return checkFrom(columns, row, col, (r, c, i) => [r - i, c + i])
}

const checkDiagonalUp = (columns, row, col) => {
  return checkFrom(columns, row, col, (r, c, i) => [r + i, c + i])
}
