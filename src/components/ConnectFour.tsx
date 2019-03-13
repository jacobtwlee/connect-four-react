import React, { useState, useEffect } from 'react';
import { Board } from './Board'
import { Dropzone } from './Dropzone'
import { Button } from './Button'
import { Player, Cell } from '../model'
import { BOARD_ROWS, EMPTY_BOARD } from '../constants'
import { copyBoard, isFullBoard, togglePlayer, findWinningCells } from '../utils'
import { Minimax } from '../ai'

export const ConnectFour = () => {
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(Player.One)
  const [ tokens, setTokens ] = useState<Player[][]>(EMPTY_BOARD)
  const [ winningCells, setWinningCells ] = useState<Cell[] | null>(null)
  const [ isPlayerOneHuman ] = useState<boolean>(true)
  const [ isPlayerTwoHuman ] = useState<boolean>(false)

  useEffect(() => {
    if (!isGameOver()) {
      const shouldAiOneMove = currentPlayer === Player.One && !isPlayerOneHuman
      const shouldAiTwoMove = currentPlayer === Player.Two && !isPlayerTwoHuman
      
      if (shouldAiOneMove || shouldAiTwoMove) {
        const col = Minimax.nextMove(tokens, currentPlayer)
        dropToken(col);
      }
    }
  }, [tokens]);

  const dropToken = (colIndex: number) => {
    if (tokens[colIndex].length < BOARD_ROWS && !winningCells) {
      const nextTokens = copyBoard(tokens)
      nextTokens[colIndex].push(currentPlayer)

      const winningCells = findWinningCells(nextTokens)
      setTokens(nextTokens)

      if (winningCells.length > 0) {
        setWinningCells(winningCells)
      } else {
        setCurrentPlayer(togglePlayer(currentPlayer))
      }
    }
  }

  const resetGame = () => {
    setTokens(EMPTY_BOARD)
    setCurrentPlayer(Player.One)
    setWinningCells(null)
  }

  const isGameOver = () => {
    return (winningCells != null) || isFullBoard(tokens)
  }

  return (
    <div>
      <Dropzone
        currentPlayer={currentPlayer}
        onClickColumn={dropToken}
        isDisabled={isGameOver()}
      />
      <Board
        tokens={tokens}
        highlightedCells={winningCells}
      />
      <Button onClick={resetGame}>
        New Game
      </Button>
    </div>
  )
}
