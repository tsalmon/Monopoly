import { Player } from "./Player";
import { GameOperation } from "./GameOperation";
import { DisplayObject } from "./DisplayObject";
import MonopolyContext from "./MonopolyContext";

export interface GameState {
  player?: Player,

  execute(monopoly: MonopolyContext, operation: GameOperation): void;
  displayCLI(): string;
  displayObject(): DisplayObject
}