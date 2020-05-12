import { GameState } from './GameState';
import { Player } from './Player';
import { RealEstate } from './RealEstate';
import MonopolyContext from './MonopolyContext';
import { GameOperation } from './GameOperation';
import MonopolyDicesState from './MonopolyDicesState';
import { DisplayObject } from './DisplayObject';

export default class MonopolyAuctionState implements GameState {
  player: Player;
  endPlayer: Player;
  bestBid: number | null = null;
  playerBid: Player | null = null;
  auctionCase: RealEstate;

  constructor(player: Player, nextPlayer: Player, auctionCase: RealEstate) {
    this.player = player;
    this.auctionCase = auctionCase;
    this.endPlayer = nextPlayer;
    this.playerBid = player;
    this.bestBid = 0;
  }

  displayCLI(): string {
    let display = `${this.player.getName()} - ${this.player.getCash()}\n\n`;

    if(this.bestBid && this.playerBid) {
      display += `${this.bestBid} / ${this.playerBid} \n`;
    } else {
      display += 'debut des enchères...\n';
    }

    return display;
  }

  displayObject(): DisplayObject {
    return {
      title: 'Enchères',
      message: [
        `Meilleur enchère: ${this.bestBid}`,
        `Joueur: ${this.playerBid}`,
      ],
    };
  }

  execute(monopoly: MonopolyContext, option: GameOperation) {
    if(option === false || option === true) {
      throw 'bad option'
    } else if (option === null) {

    } else if(this.bestBid === null || option > this.bestBid) {
      this.bestBid = option;
      this.playerBid = this.player;
    }

    this.player = monopoly.nextPlayer(this.player);
    this.bestBid = this.bestBid;

    if(this.player === this.playerBid) {
      monopoly.setBuyable(false);
      monopoly.setAuction(-1);
      monopoly.setState(new MonopolyDicesState(this.endPlayer));
    }
  }
}