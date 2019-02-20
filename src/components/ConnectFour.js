import React, { useState } from 'react';
import { Board } from './Board'
import { Dropzone } from './Dropzone'
import { Button } from './Button'
import { PLAYER_1, PLAYER_2, BOARD_ROWS, EMPTY_COLUMNS } from '../constants'
import { findWinningCells } from '../utils'

export const ConnectFour = () => {
  const [ currentPlayer, setCurrentPlayer ] = useState(PLAYER_1)
  const [ columns, setColumns ] = useState(EMPTY_COLUMNS)
  const [ winningCells, setWinningCells ] = useState(null)

  const dropToken = (colIndex) => {
    if (columns[colIndex].length < BOARD_ROWS && !winningCells) {
      const nextColumns = columns.map(column => [...column])
      nextColumns[colIndex].push(currentPlayer)

      const winningCells = findWinningCells(nextColumns)
      setColumns(nextColumns)

      if (winningCells) {
        setWinningCells(winningCells)
      } else {
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1)
      }
    }
  }

  const resetGame = () => {
    setColumns(EMPTY_COLUMNS)
    setCurrentPlayer(PLAYER_1)
    setWinningCells(null)
  }

  return (
    <div>
      <Dropzone
        currentPlayer={currentPlayer}
        onClickColumn={dropToken}
        isDisabled={!!winningCells}
      />
      <Board
        columns={columns}
        highlightedCells={winningCells}
      />
      <Button onClick={resetGame}>
        New Game
      </Button>
    </div>
  )
}
