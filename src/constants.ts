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

export const MATCH_CELLS: Cell[][] =
  Array(BOARD_COLUMNS).fill(Array(BOARD_ROWS).fill(null))
    .flatMap((column: any[], c: number) => {
      return column.reduce((result: Cell[][], _:void, r: number) => {
        const match = Array(WINNING_LENGTH).fill(null)

        // Horizontal match
        if (c <= BOARD_COLUMNS - WINNING_LENGTH) {
          result.push(match.map((_, i) => ({ row: r, col: c + i })))
        }

        // Vertical match
        if (r <= BOARD_ROWS - WINNING_LENGTH) {
          result.push(match.map((_, i) => ({ row: r + i, col: c })))
        }

        // Diagonal (positive slope) match
        if ((c <= BOARD_COLUMNS - WINNING_LENGTH) && (r <= BOARD_ROWS - WINNING_LENGTH)) {
          result.push(match.map((_, i) => ({ row: r + i, col: c + i })))
        }

        // Diagonal (negative slope) match
        if ((c <= BOARD_COLUMNS - WINNING_LENGTH) && (r >= WINNING_LENGTH - 1)) {
          result.push(match.map((_, i) => ({ row: r - i, col: c + i })))
        }

        return result
      }, [])
    })

export const PLAYER_COLORS: { [player: number]: string } = {
  [Player.One]: '#ff636e',
  [Player.Two]: '#ffca56',
}
