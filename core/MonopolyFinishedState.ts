import { GameState } from './GameState';
import { DisplayObject } from './DisplayObject';
import { Player } from './Player';

export default class MonopolyFinishedState implements GameState {
  player: Player;

  constructor(player: Player) {
    this.player = player;
  }

  displayCLI(): string {
    return `${this.player.getName()} a gagné`;
  }

  displayObject(): DisplayObject {
    return {
      title: 'Fin de la partie',
      message: [`${this.player.getName()} a gagné`],
    }
  }

  execute() {}
}