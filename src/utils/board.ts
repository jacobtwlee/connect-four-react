import { Player, Cell } from '../model'
import { BOARD_ROWS, MATCH_CELLS, WINNING_LENGTH } from '../constants'
import { togglePlayer } from './player';

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

export function findWinningCells(board: Player[][], player?: Player): Cell[] {
  for (let col = 0; col < board.length; col++) {
    for (let row = 0; row < board[col].length; row++) {
      const cell = { row, col }
      const winningCells = [
        checkVertical(board, cell),
        checkHorizontal(board, cell),
        checkDiagonalUp(board, cell),
        checkDiagonalDown(board, cell),
      ].find(cells => cells && cells.length > 0)

      if (winningCells) {
        if (!player ||  player === getPlayerAtCell(board, cell)) {
          return winningCells
        }
      }
    }
  }

  return []
}

export function copyBoard(board: Player[][]): Player[][] {
  return board.map(tokenColumn => [...tokenColumn])
}

export function isWinningBoard(board: Player[][], player?: Player): boolean {
  return findWinningCells(board, player).length > 0
}

export function isFullBoard(board: Player[][]): boolean {
  return board.every(tokenColumn => {
    return tokenColumn.length === BOARD_ROWS
  })
}

export function validBoardMoves(board: Player[][]): number[] {
  return board.reduce((result, tokenColumn, i) => {
    if (tokenColumn.length < BOARD_ROWS) {
      result.push(i)
    }
    
    return result
  }, [])
}

export function scoreBoard(board: Player[][], maxPlayer: Player): number {
  const filledBoard: (Player | null)[][] = board.map(tokenColumn => {
    return [...tokenColumn, ...Array(BOARD_ROWS - tokenColumn.length).fill(null)]
  })

  let result = 0

  MATCH_CELLS.forEach(matchCells => {
    const match = matchCells.map(cell => filledBoard[cell.col][cell.row])
    const minPlayer = togglePlayer(maxPlayer)

    if (!match.includes(minPlayer)) {
      const playerCount = match.filter(p => p === maxPlayer).length
      result += 16 ** playerCount
    }
    
    if (!match.includes(maxPlayer)) {
      const playerCount = match.filter(p => p === minPlayer).length
      result -= 16 ** playerCount
    }
  })

  return result
}
