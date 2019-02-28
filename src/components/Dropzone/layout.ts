import styled from 'styled-components'
import { PLAYER_COLORS, BOARD_COLUMNS } from '../../constants'

export const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(${BOARD_COLUMNS}, 50px);
  grid-template-rows: 50px;
  grid-gap: 8px;
  margin-bottom: 8px;

  &:focus {
    outline: none;
  }
`


export const ActiveColumn = styled.button<{ playerColor: string }>`
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

export const DisabledColumn = styled.div`
  border-radius: 50%;
  overflow: hidden;
  background-color: transparent;
  border: 3px dashed #32464e;
  box-sizing: border-box;
`
