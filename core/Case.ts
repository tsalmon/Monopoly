import { Player } from './Player';

export interface Case {
  execute(player: Player): void;
}