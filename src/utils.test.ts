import { findWinningCells } from './utils'

describe('findWinningCells', () => {
  it('should find no cells in an empty board', () => {
    const board = [[], [], [], [], [], [], []]

    expect(findWinningCells(board)).toEqual([])
  })

  it('should find no winning cells in a board with no winner', () => {
    const board = [
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [2, 1, 2, 1, 2, 1],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2],
    ]

    expect(findWinningCells(board)).toEqual([])
  })

  it('should find a vertical set of winning cells', () => {
    const board = [
      [1, 1, 1, 1],
      [],
      [],
      [],
      [],
      [],
      [],
    ]

    const expectedCells = [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 3, col: 0 },
    ]

    expect(findWinningCells(board)).toEqual(expectedCells)
  })

  it('should find a horizontal set of winning cells', () => {
    const board = [
      [1],
      [1],
      [1],
      [1],
      [],
      [],
      [],
    ]

    const expectedCells = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
      { row: 0, col: 3 },
    ]

    expect(findWinningCells(board)).toEqual(expectedCells)
  })

  it('should find a upward diagonal set of winning cells', () => {
    const board = [
      [1],
      [2, 1],
      [1, 2, 1],
      [2, 1, 2, 1],
      [],
      [],
      [],
    ]

    const expectedCells = [
      { row: 0, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 2 },
      { row: 3, col: 3 },
    ]

    expect(findWinningCells(board)).toEqual(expectedCells)
  })

  it('should find a downward diagonal set of winning cells', () => {
    const board = [
      [2, 1, 2, 1],
      [1, 2, 1],
      [2, 1],
      [1],
      [],
      [],
      [],
    ]

    const expectedCells = [
      { row: 3, col: 0 },
      { row: 2, col: 1 },
      { row: 1, col: 2 },
      { row: 0, col: 3 },
    ]

    expect(findWinningCells(board)).toEqual(expectedCells)
  })

})
