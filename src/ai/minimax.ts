import { Player } from '../model'
import { copyBoard, isFullBoard, isWinningBoard, scoreBoard, shuffle, togglePlayer, validBoardMoves } from '../utils'

function nextMove(board: Player[][], player: Player): number {
  let bestScore = Number.MIN_SAFE_INTEGER
  let bestMove = 0

  shuffle(validBoardMoves(board)).forEach(col => {
    const nextBoard = copyBoard(board)
    nextBoard[col].push(player)

    const score = minimax(nextBoard, togglePlayer(player), false)

    if (score > bestScore) {
      bestScore = score
      bestMove = col
    }
  })

  return bestMove
}

function minimax(
  board: Player[][],
  player: Player,
  isMaxPlayer: boolean,
  depth: number = 5,
  alpha: number = Number.MIN_SAFE_INTEGER,
  beta: number = Number.MAX_SAFE_INTEGER,
): number {
  if (isFullBoard(board) || isWinningBoard(board) || depth < 1) {
    return evaluate(board, player, isMaxPlayer)
  }

  let bestScore = isMaxPlayer ? Number.MIN_SAFE_INTEGER : Number.MAX_SAFE_INTEGER

  for (let col of shuffle(validBoardMoves(board))) {
    let nextBoard = copyBoard(board)
    nextBoard[col].push(player)
    let score = minimax(nextBoard, togglePlayer(player), !isMaxPlayer, depth - 1, alpha, beta)
    bestScore = isMaxPlayer ? Math.max(bestScore, score) : Math.min(bestScore, score)

    if (isMaxPlayer) {
      alpha = Math.max(alpha, score)
    } else {
      beta = Math.min(beta, score)
    }

    if (beta <= alpha) {
      break
    }
  }

  return bestScore
}

function evaluate(board: Player[][], player: Player, isMaxPlayer: boolean): number {
  const maxPlayer = isMaxPlayer ? player : togglePlayer(player)
  return scoreBoard(board, maxPlayer)
}

export default { nextMove }
