import React from 'react'
import styled from 'styled-components'
import { PLAYER_COLORS, BOARD_ROWS, BOARD_COLUMNS } from '../constants'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${BOARD_COLUMNS}, 50px);
  grid-template-rows: repeat(${BOARD_ROWS}, 50px);
  grid-gap: 8px;
`

const BoardGridItem = styled.div`
  position: relative;
  grid-row: ${p => p.row};
  grid-column: ${p => p.col};
  box-sizing: border-box;
  border: 3px solid #6edfff;
  border-radius: 50%;
  z-index: 0;
`

const HighlightedGridItem = styled.div`
  position: relative;
  grid-row: ${p => p.row};
  grid-column: ${p => p.col};
  box-sizing: border-box;
  border: 3px solid #ebffff;
  border-radius: 50%;
  box-shadow: 0 0 6px 2px #ebffff55;
  z-index: 2;
`

const TokenGridItem = styled.div`
  position: relative;
  grid-row: ${p => p.row};
  grid-column: ${p => p.col};
  background-color: ${p => p.playerColor};
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
`

const renderBoardGridItems = () => {
  return Array(BOARD_ROWS).fill(Array(BOARD_COLUMNS).fill(null)).map((row, rowIndex) => {
    return row.map((_, colIndex) => {
      return (
        <BoardGridItem
          row={rowIndex + 1}
          col={colIndex + 1}
          key={`boardGridItem(${rowIndex},${colIndex})`}
        />
      )
    })
  })
}

const renderHighlightedGridItems = (highlightedCells) => {
  return highlightedCells && highlightedCells.map(([ rowIndex, colIndex ]) => (
    <HighlightedGridItem
      row={BOARD_ROWS - rowIndex}
      col={colIndex + 1}
      key={`highlightedGridItem(${rowIndex},${colIndex})`}
    />
  ))
}

const renderTokenGridItems = (columns) => {
  return columns.map((col, colIndex) => {
    return col.map((player, rowIndex) => {
      return (
        <TokenGridItem
          row={BOARD_ROWS - rowIndex}
          col={colIndex + 1}
          playerColor={PLAYER_COLORS[player]}
          key={`tokenGridItem(${rowIndex},${colIndex})`}
        />
      )
    })
  })
}

export const Board = ({ columns, highlightedCells }) => (
  <Grid>
    {renderBoardGridItems()}
    {renderTokenGridItems(columns)}
    {renderHighlightedGridItems(highlightedCells)}
  </Grid>
)
