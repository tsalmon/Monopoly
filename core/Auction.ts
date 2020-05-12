import { Player } from "./Player";

enum AuctionState {
  START,
  CONTINUE,
  FINISH,
}

export class Auction {
  bestBidPlayer: number | null;
  bestBid: number | null;
  private players: Player[];
  currentPlayer: number;
  state: AuctionState;

  constructor(players: Player[], currentPlayer: number) {
    this.state = AuctionState.START;
    this.bestBid = null;
    this.bestBidPlayer = null;
    this.players = players;
    this.currentPlayer = currentPlayer;
  }

  getBestBidPlayer(): Player | null {
    if(this.bestBidPlayer === null){
      return null;
    }

    return this.players[this.bestBidPlayer]
  }

  getPlayer(): Player {
    return this.players[this.currentPlayer];
  }

  getBestBid(): number {
    if(!this.bestBid) {
      return -1;
    }

    return this.bestBid;
  }

  noAuction() {
    if(this.state === AuctionState.START){
      this.state = AuctionState.CONTINUE;
      this.bestBidPlayer = this.currentPlayer;
    }

    if(this.getNextPlayer() === this.bestBidPlayer) {
      if(this.bestBidPlayer && !this.bestBid){
        this.bestBidPlayer = null;
      }

      this.state = AuctionState.FINISH;
    }

    this.incCurrentPlayer();
  }

  getAuctionStatut(): AuctionState {
    return this.state;
  }

  auctionFinished(): boolean {
    return this.state === AuctionState.FINISH;
  }

  incCurrentPlayer() {
    this.currentPlayer = this.getNextPlayer();
  }

  getNextPlayer(): number {
    return (this.currentPlayer + 1) % this.players.length;
  }

  newAuction(bid: number): boolean {
    if(bid < 1) {
      return false;
    }

    if(this.bestBid === null || bid > this.bestBid) {
      if(this.state === AuctionState.START){
        this.state = AuctionState.CONTINUE;
      }
  
      this.bestBidPlayer = this.currentPlayer;
      this.bestBid = bid;
      this.incCurrentPlayer();  
      return true;
    }

    return false;
  }
}