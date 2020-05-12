import { GameState } from './GameState';
import { Player } from './Player';
import MonopolyContext from './MonopolyContext';
import MonopolyDicesState from './MonopolyDicesState';
import MonopolyAuctionState from './MonopolyAuctionState';
import { GameOperation } from './GameOperation';
import { Card } from './Card';
import { CaseCard } from './CaseCard';
import { Luck } from './Luck';
import { START_CASH } from './constants';
import MonopolyExecuteCaseState from './MonopolyExecuteCaseState';
import MonopolyJailState from './MonopolyJailState';
import { DisplayObject } from './DisplayObject';

interface PayByProperties {
  house: number;
  hostel: number;
}

export default class MonopolyCardState implements GameState {
  player: Player;
  currentCard: Card;
  nextPlayer: Player;
  gain: number = 0;
  pay: number = 0;
  movePosition: number = 0;
  moveTo: number = 0;
  freeJail: boolean = false;
  payByProperties: PayByProperties | null = null;
  

  constructor(player: Player, nextPlayer: Player, currentCase: CaseCard) {
    this.player = player;
    this.currentCard = currentCase.getRandomCard();
    this.nextPlayer = nextPlayer;
  }

  displayCLI(): string {
    let message : string = '';

    for(let line of this.currentCard.message) {
      message += `${line}\n`
    }

    return message;
  }

  displayObject(): DisplayObject {
    return {
      title: 'Carte Chance',
      message: this.currentCard.message,
    }
  }

  execute(monopoly: MonopolyContext, options: GameOperation) {
    const { 
      getLuckCard,
      goTo,
      moveTo,
      gain,
      loose,
      freeJailCard,
      dontTouchStartCash,
      choices,
      otherPaid,
      goToJail,    
    } = this.currentCard;

    if(goTo !== undefined) {
      if(!dontTouchStartCash) {
        this.player.addCash(START_CASH);
      }

      this.player.setPosition(goTo);
    }
    
    if(moveTo !== undefined) {
      if(dontTouchStartCash) {
        this.player.addCash(START_CASH);
      }

      this.player.setPosition(this.player.getPosition() + moveTo);
    }

    if(gain !== undefined) {
      this.player.addCash(gain(this.player));
    }

    if(loose !== undefined) {
      this.player.removeCash(loose(this.player));
    }

    if(freeJailCard !== undefined) {
      this.player.addJailCard();
    }

    if(choices !== undefined) {
      monopoly.setChoice(true);
    }
   
    if(otherPaid !== undefined) {
      const players = monopoly.getPlayers();

      for(let player of players) {
        if(player !== this.player){
          player.pay(this.player, otherPaid);
        }
      }
    }

    if(goToJail !== undefined) {
      this.player.setJail(true);
    } 

    if(getLuckCard !== undefined) {
      monopoly.setState(new MonopolyCardState(this.player, this.nextPlayer, new Luck()))
    } else if(moveTo !== undefined || goTo !== undefined) {
      monopoly.setState(new MonopolyExecuteCaseState(monopoly.getCaseById(this.player.getPosition()), this.player, this.nextPlayer))
    } else {
      if(this.player.inJail()){
        monopoly.setState(new MonopolyJailState(this.nextPlayer, this.nextPlayer));
      } else if(!monopoly.haveChoice()) {
        monopoly.setState(new MonopolyDicesState(this.nextPlayer));
      }
    }
  }
}