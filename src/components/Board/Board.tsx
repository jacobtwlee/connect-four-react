import React from 'react'
import { Player, Cell } from '../../model'
import { PLAYER_COLORS, BOARD_ROWS, BOARD_CELLS } from '../../constants'
import { Grid, BoardGridItem, HighlightedGridItem, TokenGridItem } from './layout'

interface Props {
  tokens: Player[][];
  highlightedCells: Cell[] | null;
}

const renderBoardGridItems = () => {
  return BOARD_CELLS.map(({ row, col }) => (
    <BoardGridItem
      row={row + 1}
      col={col + 1}
      key={`boardGridItem(${row},${col})`}
    />
  ))
}

const renderHighlightedGridItems = ({ highlightedCells }: Props) => {
  return highlightedCells && highlightedCells.map(({ row, col }) => (
    <HighlightedGridItem
      row={BOARD_ROWS - row}
      col={col + 1}
      key={`highlightedGridItem(${row},${col})`}
    />
  ))
}

const renderTokenGridItems = ({ tokens }: Props) => {
  return tokens.map((tokenColumn, col) => {
    return tokenColumn.map((player, row) => (
      <TokenGridItem
        row={BOARD_ROWS - row}
        col={col + 1}
        playerColor={PLAYER_COLORS[player]}
        key={`tokenGridItem(${row},${col})`}
      />
    ))
  })
}

export const Board = (props: Props) => (
  <Grid>
    {renderBoardGridItems()}
    {renderTokenGridItems(props)}
    {renderHighlightedGridItems(props)}
  </Grid>
)
