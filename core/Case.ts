import { Player } from './Player';
import { DisplayObject } from './DisplayObject';

export interface Case {
  execute(player: Player): DisplayObject;
}