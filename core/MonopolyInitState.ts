import { GameState } from './GameState';
import { DisplayObject } from './DisplayObject';

export default class MonopolyInitState implements GameState {

  constructor() {
  }

  displayCLI(): string {
    return 'En attente de joueurs ...';
  }

  displayObject(): DisplayObject {
    return {
      title: 'Jeu non initialié',
      message: ['Ajoutez des joueurs'],
    }
  }

  execute() {}
}