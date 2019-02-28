import React, { useRef } from 'react'
import { Player } from '../../model'
import { PLAYER_COLORS, BOARD_COLUMNS } from '../../constants'
import { Columns, ActiveColumn, DisabledColumn } from './layout'

interface Props {
  currentPlayer: Player;
  onClickColumn: (index: number) => void;
  isDisabled: boolean;
}

const renderColumns = (currentPlayer: Player, onClickColumn: (colIndex: number) => void, isDisabled: boolean) => {
  return Array(BOARD_COLUMNS).fill(null).map((_: void, col) => {
    if (isDisabled) {
      return <DisabledColumn key={col} />
    }

    return (
      <ActiveColumn
        playerColor={PLAYER_COLORS[currentPlayer]}
        onClick={() => onClickColumn(col)}
        key={col}
      />
    )
  })
}

export const Dropzone = ({ currentPlayer, onClickColumn, isDisabled }: Props) => {
  const columnsRef = useRef<HTMLElement>(null)

  const handleColumnClick = (col: number): void => {
    if (columnsRef.current) {
      columnsRef.current.focus()
    }
    
    onClickColumn(col)
  }

  return (
    <Columns ref={columnsRef as any} tabIndex={-1}>
      {renderColumns(currentPlayer, handleColumnClick, isDisabled)}
    </Columns>
  )
}
