import { Player, Cell } from './model'

export const BOARD_COLUMNS = 7
export const BOARD_ROWS = 6
export const WINNING_LENGTH = 4

export const EMPTY_BOARD: Player[][] = Array(BOARD_COLUMNS).fill([])
export const BOARD_CELLS: Cell[] =
  Array(BOARD_COLUMNS).fill(Array(BOARD_ROWS).fill(null))
    .flatMap((column: void[], colIndex: number) => {
      return column.map((_:void, rowIndex: number) => {
        return { row: rowIndex, col: colIndex }
    })
  })

export const PLAYER_COLORS: { [player: number]: string } = {
  [Player.One]: '#ff636e',
  [Player.Two]: '#ffca56',
}
