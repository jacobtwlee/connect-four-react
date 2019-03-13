import { Player } from '../model'

export function togglePlayer(player: Player): Player {
  return player === Player.One ? Player.Two : Player.One
}
