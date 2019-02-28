import { Player, Cell } from './model'
import { WINNING_LENGTH } from './constants'

export function findWinningCells(board: Player[][]): Cell[] {
  for (let col = 0; col < board.length; col++) {
    for (let row = 0; row < board[col].length; row++) {
      const winningCells = [
        checkVertical(board, { row, col }),
        checkHorizontal(board, { row, col }),
        checkDiagonalUp(board, { row, col }),
        checkDiagonalDown(board, { row, col }),
      ].find(cells => cells && cells.length > 0)

      if (winningCells) {
        return winningCells
      }
    }
  }

  return []
}

function allEqual(arr: any[]): boolean {
  return arr.every(val => val === arr[0])
}

function getPlayerAtCell(board: Player[][], cell: Cell): Player {
  const { row, col } = cell
  return board[col] && board[col][row]
}

function checkWinnerFromCell(board: Player[][], cell: Cell, next: (root: Cell, inc: number) => Cell ): Cell[] {
  const players: Player[] = []
  const cells: Cell[] = []

  for (let i = 0; i < WINNING_LENGTH; i++) {
    const nextCell = next(cell, i)
    players.push(getPlayerAtCell(board, nextCell))
    cells.push(nextCell)
  }

  return allEqual(players) ? cells : []
}

function checkVertical(board: Player[][], cell: Cell): Cell[] {
  return checkWinnerFromCell(board, cell, (root, inc) => ({
    row: root.row + inc,
    col: root.col,
  }))
}

function checkHorizontal(board: Player[][], cell: Cell): Cell[] {
  return checkWinnerFromCell(board, cell, (root, inc) => ({
    row: root.row,
    col: root.col + inc,
  }))
}

function checkDiagonalDown(board: Player[][], cell: Cell): Cell[] {
  return checkWinnerFromCell(board, cell, (root, inc) => ({
    row: root.row - inc,
    col: root.col + inc,
  }))
}

function checkDiagonalUp(board: Player[][], cell: Cell): Cell[] {
  return checkWinnerFromCell(board, cell, (root, inc) => ({
    row: root.row + inc,
    col: root.col + inc,
  }))
}
