import styled from 'styled-components'
import { BOARD_ROWS, BOARD_COLUMNS } from '../../constants'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${BOARD_COLUMNS}, 50px);
  grid-template-rows: repeat(${BOARD_ROWS}, 50px);
  grid-gap: 8px;
`

export const BoardGridItem = styled.div<{ row: number, col: number }>`
  position: relative;
  grid-row: ${p => p.row};
  grid-column: ${p => p.col};
  box-sizing: border-box;
  border: 3px solid #6edfff;
  border-radius: 50%;
  z-index: 0;
`

export const HighlightedGridItem = styled.div<{ row: number, col: number }>`
  position: relative;
  grid-row: ${p => p.row};
  grid-column: ${p => p.col};
  box-sizing: border-box;
  border: 3px solid #ebffff;
  border-radius: 50%;
  box-shadow: 0 0 6px 2px #ebffff55;
  z-index: 2;
`

export const TokenGridItem = styled.div<{ row: number, col: number, playerColor: string }>`
  position: relative;
  grid-row: ${p => p.row};
  grid-column: ${p => p.col};
  background-color: ${p => p.playerColor};
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
`
