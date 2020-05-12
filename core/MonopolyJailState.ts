import { GameState } from './GameState';
import { Player } from './Player';
import Monopoly from './MonopolyContext';
import MonopolyDicesState from './MonopolyDicesState';
import { DisplayObject } from './DisplayObject';
import { GameOperation } from './GameOperation';
import { JAIL_CAUTION } from './constants';

export default class MonopolyJailState implements GameState {
  player: Player;
  nextPlayer: Player;
  dice1: number;
  dice2: number;

  constructor(player: Player, nextPlayer: Player) {
    this.player = player;
    this.nextPlayer = nextPlayer;
    this.dice1 = Monopoly.playDice();
    this.dice2 = Monopoly.playDice();
  }

  displayObject(): DisplayObject {
    let message = [];

    switch(this.player.getNbDEqualsDice()) {
      case 0:
        message = [`Vous avez 3 tentatives pour faire un double de dès (${this.dice1}, ${this.dice2})`];
      case 1:
      case 2:
        message = [`Vous avez encore ${3 - this.player.getNbDEqualsDice()} tentative(s) (${this.dice1}, ${this.dice2})`];
      default:
        message = ['Vous avez échoué à faire un double.', `Vous pouvez retenter un double a votre prochain tour ou payer maintenant une amende de ${JAIL_CAUTION} €`];
    }

    return {
      title: 'Vous êtes en prison',
      message,
      cost: JAIL_CAUTION,
    };
  }

  displayCLI(): string {
    switch(this.player.getNbDEqualsDice()) {
      case 0:
        return `Vous êtes en prison.\nVous avez 3 tentatives pour faire un double de dès (${this.dice1}, ${this.dice2})`;
      case 1:
      case 2:
        return `Vous êtes en prison.\nVous avez encore ${3 - this.player.getNbDEqualsDice()} tentative(s) (${this.dice1}, ${this.dice2})`;
      default:
        return `Vous êtes en prison.\nVous avez échoué à faire un double.\nVous devez payer une amende de ${JAIL_CAUTION} €`;
    }
  }

  execute(monopoly: Monopoly, options: GameOperation) {
    if(options === true || this.player.getNbDEqualsDice() === 3) {
      this.player.setJail(false);
      this.player.removeCash(JAIL_CAUTION);
    } else {
      if(this.dice1 === this.dice2) {
        this.player.setJail(false);
      } else {
        this.player.setNbDEqualsDice(this.player.getNbDEqualsDice() + 1);
      }
    }

    if(this.nextPlayer.inJail()) {
      monopoly.setState(new MonopolyJailState(this.nextPlayer, monopoly.nextPlayer(this.nextPlayer)));
    } else {
      monopoly.setState(new MonopolyDicesState(this.nextPlayer));
    }
  }
}