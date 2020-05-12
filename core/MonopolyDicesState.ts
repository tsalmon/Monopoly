import { GameState } from './GameState';
import { Player } from './Player';
import MonopolyContext from './MonopolyContext';
import { Case } from './Case';
import MonopolyExecuteCaseState from './MonopolyExecuteCaseState';
import { START_CASH } from './constants';
import { DisplayObject } from './DisplayObject';
import MonopolyBuyState from './MonopolyBuyState';
import { RealEstate } from './RealEstate';

export default class MonopolyDicesState implements GameState {
  player: Player;
  dice1: number;
  dice2: number;
  currentCase: Case | null;

  constructor(player: Player) {
    this.player = player;
    this.dice1 = MonopolyContext.playDice();
    this.dice2 = MonopolyContext.playDice();
    this.currentCase = null;
  }

  displayCLI(): string {
    let display = '';

    display += `des 1: ${this.dice1}\n`;
    display += `des 2: ${this.dice2}\n`;

    return display;
  }

  displayObject(): DisplayObject {
    return {
      title: 'Lancé de dès',
      message: [
        this.dice1.toString(),
        this.dice2.toString(),
      ],
    }
  }

  execute(monopoly: MonopolyContext) {
    let nextPlayer = monopoly.nextPlayer(this.player);

    // DOUBLE DICE AND NEXT PLAYER
    if(this.dice1 === this.dice2) {
      this.player.incNbEqualsDice();

      if(this.player.getNbDEqualsDice() === 2) {
        this.player.setJail(true);
        this.player.setNbDEqualsDice(0);
      } else {
        nextPlayer = this.player;
      }
    }

    //POSITION AND START CASH
    let position: number = this.player.getPosition() + this.dice1 + this.dice2;
    const nbCases = monopoly.getNbCases();

    if(position >= nbCases) {
      this.player.addCash(START_CASH);
      position = position % nbCases;
    }

    this.player.setPosition(position);
    this.currentCase = monopoly.getCaseById(position);
    
    try {
      const realEstate: RealEstate = this.currentCase as RealEstate;
      if(realEstate.owner === null) {
        monopoly.setState(new MonopolyBuyState(this.player, nextPlayer, this.currentCase as RealEstate));
      } else {
        monopoly.setState(new MonopolyExecuteCaseState(this.currentCase, this.player, nextPlayer));
      }
    } catch {
      monopoly.setState(new MonopolyExecuteCaseState(this.currentCase, this.player, nextPlayer));
    }
  }
}