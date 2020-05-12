import { Case } from "./Case";
import { Card } from "./Card";

export interface CaseCard extends Case {
  cards: Card[];

  getRandomCard(): Card;
}
