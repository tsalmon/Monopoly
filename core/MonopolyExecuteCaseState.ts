import { GameState } from './GameState';
import { Player } from './Player';
import MonopolyContext from './MonopolyContext';
import MonopolyDicesState from './MonopolyDicesState';
import { Case } from './Case';
import { DisplayObject } from './DisplayObject';
import { GameOperation } from './GameOperation';
import MonopolyBuyState from './MonopolyBuyState';
import { RealEstate } from './RealEstate';
import MonopolyCardState from './MonopolyCardState';
import { CaseCard } from './CaseCard';
import { TaxCase } from './TaxCase';
import MonopolyJailState from './MonopolyJailState';

export default class MonopolyExecuteCaseState implements GameState {
  player: Player;
  nextPlayer: Player;
  currentCase: Case;
  caseExecuted: DisplayObject;
  buyable: boolean = false;
  card: boolean = false;

  constructor(currentCase: Case, player: Player, nextPlayer: Player) {
    this.player = player;
    this.currentCase = currentCase;
    this.nextPlayer = nextPlayer;

    this.caseExecuted = this.currentCase.execute(this.player);

    this.setBuyable();
  }

  displayObject(): DisplayObject {
    return this.caseExecuted;
  }

  displayCLI(): string {
    const { title, message, owner, cost } = this.caseExecuted;

    let display = '';
    display = `${this.player.getName()} - ${this.player.getCash()}\n\n`;

    if(owner && cost) {
      display += `Carte: \n  title: ${title}\n  informations: ${message}\n  Propriétaire: ${owner ? owner.getName() : "libre"}\n  Prix: ${cost} €\n`
    } else if(cost) {
      display += `Carte: \n  title: ${title}\n  informations: ${message}\nCoût: ${cost}`
    } else {
      display += `Carte: \n  title: ${title}\n  informations: ${message}\n`
    }

    return display;
  }

  display() {
    return this.caseExecuted;
  }

  setBuyable() {
    const hasPrice = "price" in this.currentCase;
    if(!hasPrice) {
      this.buyable = false;
    } else {
      const realEstateCase: RealEstate = this.currentCase as RealEstate;

      this.buyable = (this.caseExecuted.cost !== null)
        && ((realEstateCase.owner === null)
        || (realEstateCase.owner === this.player));
    }
  }

  isBusyRealEstateCase(): boolean {
    try {
      if(!("buy" in this.currentCase)) {
        return false;
      }

      const realEstate: RealEstate = this.currentCase as RealEstate;
      const { owner } = realEstate;

      return owner !== null && owner !== this.player;
    } catch {
      return false;
    }
  }

  isTaxCase(): boolean {
    try {
      return 'getTaxCost' in this.currentCase
    } catch {
      return false;
    }
  }

  execute(monopoly: MonopolyContext, option: GameOperation) {
    this.setBuyable();

    if(this.isTaxCase()) {
      const luxTax = this.currentCase as TaxCase;
      this.player.removeCash(luxTax.getTaxCost());
    }
    if(this.isBusyRealEstateCase()) {
      const realEstate: RealEstate = this.currentCase as RealEstate;

      if(!realEstate.owner){
        throw 'bad cast (case to realestate';
      }

      this.player.pay(realEstate.owner, realEstate.getCost(this.player) || 0);
    }

    monopoly.setBuyable(this.buyable);

    if("cards" in this.currentCase) {
      monopoly.setState(new MonopolyCardState(this.player, this.nextPlayer, this.currentCase as CaseCard));
    } else if(this.buyable) {
      monopoly.setState(new MonopolyBuyState(this.player, this.nextPlayer, this.currentCase as RealEstate));
    } else {
      if(this.nextPlayer.inJail()) {
        monopoly.setState(new MonopolyJailState(this.nextPlayer, monopoly.nextPlayer(this.nextPlayer)));
      } else {
        monopoly.setState(new MonopolyDicesState(this.nextPlayer));
      }
    }
  }
}