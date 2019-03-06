import React, { useState } from 'react';
import { Board } from './Board'
import { Dropzone } from './Dropzone'
import { Button } from './Button'
import { Player, Cell } from '../model'
import { BOARD_ROWS, EMPTY_BOARD } from '../constants'
import { findWinningCells } from '../utils'

export const ConnectFour = () => {
  const [ currentPlayer, setCurrentPlayer ] = useState<Player>(Player.One)
  const [ tokens, setTokens ] = useState<Player[][]>(EMPTY_BOARD)
  const [ winningCells, setWinningCells ] = useState<Cell[] | null>(null)

  const dropToken = (colIndex: number) => {
    if (tokens[colIndex].length < BOARD_ROWS && !winningCells) {
      const nextTokens = tokens.map(tokenColumn => [...tokenColumn])
      nextTokens[colIndex].push(currentPlayer)

      const winningCells = findWinningCells(nextTokens)
      setTokens(nextTokens)

      if (winningCells.length > 0) {
        setWinningCells(winningCells)
      } else {
        setCurrentPlayer(currentPlayer === Player.One ? Player.Two : Player.One)
      }
    }
  }

  const resetGame = () => {
    setTokens(EMPTY_BOARD)
    setCurrentPlayer(Player.One)
    setWinningCells(null)
  }

  const isGameOver = () => {
    // game has winner
    if (winningCells != null) {
      return true
    }

    // game is a tie
    return tokens.every(tokenColumn => {
      return tokenColumn.length === BOARD_ROWS
    })
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
