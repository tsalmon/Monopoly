import { GameState } from './GameState';
import { Player } from './Player';
import { RealEstate } from './RealEstate';
import Monopoly from './MonopolyContext';
import MonopolyDicesState from './MonopolyDicesState';
import MonopolyAuctionState from './MonopolyAuctionState';
import { GameOperation } from './GameOperation';
import { DisplayObject } from './DisplayObject';
import MonopolyJailState from './MonopolyJailState';

export default class MonopolyBuyState implements GameState {
  player: Player;
  currentCase: RealEstate;
  nextPlayer: Player;
  caseExecuted: DisplayObject;

  constructor(player: Player, nextPlayer: Player, currentCase: RealEstate) {
    this.player = player;
    this.currentCase = currentCase;
    this.nextPlayer = nextPlayer;
    this.caseExecuted = this.currentCase.execute(this.player);
  }

  displayCLI() {
    return ''
  }

  displayObject(): DisplayObject {
    return this.caseExecuted;
  }

  execute(monopoly: Monopoly, options: GameOperation) {
    monopoly.setBuyable(false);

    if(options === true) {
      if(this.currentCase.buy(this.player)){
        if(this.nextPlayer.inJail()) {
          monopoly.setState(new MonopolyJailState(this.nextPlayer, monopoly.nextPlayer(this.nextPlayer)));
        } else {
          monopoly.setState(new MonopolyDicesState(this.nextPlayer));
        }
      }
    } else {
      monopoly.setAuction(0);
      monopoly.setState(new MonopolyAuctionState(monopoly.nextPlayer(this.player), this.nextPlayer, this.currentCase));
    }
  }
}