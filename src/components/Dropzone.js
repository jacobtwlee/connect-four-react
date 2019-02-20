import React, { useRef } from 'react'
import styled from 'styled-components'
import { PLAYER_COLORS, BOARD_COLUMNS } from '../constants'

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(${BOARD_COLUMNS}, 50px);
  grid-template-rows: 50px;
  grid-gap: 8px;
  margin-bottom: 8px;

  &:focus {
    outline: none;
  }
`

const Column = styled.button`
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  background-color: transparent;
  border: 3px dashed ${p => p.playerColor};
  box-sizing: border-box;

  &:hover, &:focus {
    outline: none;
    background-color: ${p => p.playerColor};
  }
`

const DisabledColumn = styled.div`
  border-radius: 50%;
  overflow: hidden;
  background-color: transparent;
  border: 3px dashed #32464e;
  box-sizing: border-box;
`

const renderColumns = (currentPlayer, onClickColumn, isDisabled) => {
  return Array(BOARD_COLUMNS).fill(null).map((_, colIndex) => {
    if (isDisabled) {
      return <DisabledColumn key={colIndex} />
    }

    return (
      <Column
        playerColor={PLAYER_COLORS[currentPlayer]}
        onClick={() => onClickColumn(colIndex)}
        key={colIndex}
      />
    )
  })
}

export const Dropzone = ({
  currentPlayer,
  onClickColumn,
  isDisabled,
}) => {
  const columnsRef = useRef(null)

  const handleColumnClick = (col) => {
    columnsRef.current.focus();
    onClickColumn(col)
  }

  return (
    <Columns ref={columnsRef} tabIndex="-1">
      {renderColumns(currentPlayer, handleColumnClick, isDisabled)}
    </Columns>
  )
}
