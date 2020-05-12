import { Case } from './Case';
import { Player } from './Player';
import { GameState } from './GameState';
import MonopolyDicesState from './MonopolyDicesState';
import { GameOperation } from './GameOperation';
import { MonopolyCases } from './MonopolyCases';
import { START_CASH } from './constants';
import MonopolyInitState from './MonopolyInitState';

export default class MonopolyContext {
  private state: GameState;
  private cases: Case[];
  private players: Player[];
  readonly startBank: number = START_CASH;
  private buyable: boolean = false;
  private auction: number = -1;
  private choice: boolean = false;

  constructor() {
    this.cases = MonopolyCases;
    this.players = [];
    this.state = new MonopolyInitState();
  }

  init(nbpPlayers: number, nbBots: number) {
    this.players = []

    for(let i = 0; i < nbpPlayers; i++) {
      this.players.push(new Player(i, `joueur ${i+1}`, false));
    }

    for(let i = 0; i < nbBots; i++) {
      this.players.push(new Player(i, `bot ${i+1}`, true));
    }

    this.state = new MonopolyDicesState(this.players[0]);
  }

  execute(operation: GameOperation) {
    if(!this.gameFinished()){
      this.state.execute(this, operation);
    }
  }

  setState(state: GameState) {
    if(!this.gameFinished()){
      this.setPlayer(this.players);
      this.state = state;
    }
  }

  getState(): GameState {
    return this.state;
  }

  static playDice(): number {
    return Math.floor(Math.random() * 6 + 1);
  }

  /*
   * PLAYERS
   */

  getPlayers(): Player[] {
    return this.players;
  }

  private setPlayer(players: Player[]) {
    const newPlayers: Player[] = [];
    let id = 0;

    for(let player of players) {
      if(!player.isInsolvable()) {
        player.setId(id++);
        newPlayers.push(player);
      }
    }

    this.players = newPlayers;
  }

  nextPlayer(currentPlayer: Player): Player {
    const nextId = (currentPlayer.getId() + 1) % this.players.length;
    return this.players[nextId];
  }

  /*
  * AUCTIONS
  */


  setAuction(auction: number){
    this.auction = auction;
  }

  /*
  * OPTIONS USERS
  */


  canAuction(): boolean {
    return this.auction > -1;
  }

  setBuyable(buyable: boolean) {
    this.buyable = buyable;
  }

  haveChoice(): boolean {
    return this.choice;
  }

  setChoice(choice: boolean) {
    this.choice = choice;
  }

  canBuy(): boolean {
    return this.buyable;
  }

  minOffer(): number {
    return this.auction;
  }

  getCaseById(id: number): Case {
    return this.cases[id];
  }

  getNbCases(): number {
    return this.cases.length;
  }

  gameFinished(): boolean {
    return this.players.length === 1;
  }

  getWinner(): Player {
    if(!this.gameFinished()) {
      throw 'Game not finished';
    }

    return this.players[0];
  }
}
