import { Player } from "./Player";

export interface CardOperation {
  getLuckCard?: true;
  goTo?: number;
  moveTo?: number;
  gain?(player: Player): number;
  loose?(player: Player): number;
  freeJailCard?: true;
  dontTouchStartCash?: true;
  choices?: Card[];
  otherPaid?: number;
  goToJail?: true;
}

export interface Card {
  message: string[];
  getLuckCard?: true;
  goTo?: number; // player.position = goto
  moveTo?: number; //player.position = goto + player.position
  gain?(player: Player): number;
  loose?(player: Player): number;
  freeJailCard?: true;
  dontTouchStartCash?: true;
  choices?: CardOperation;
  otherPaid?: number;
  goToJail?: true;
}