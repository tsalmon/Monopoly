import { RealEstate } from './RealEstate';
import { Player } from './Player';
import MonopolyContext from './MonopolyContext';
import { DisplayObject } from './DisplayObject';

export class Company implements RealEstate {
  name: string;
  price: number;
  owner: Player | null;
  mortgage: number = 75;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
    this.owner = null;
  }

  buy(player: Player): boolean {
    if(player.hasCompany(this) || this.owner === player) {
      throw 'User has already property';
    }

    if(this.owner) {
      throw 'Property not free';
    }

    if(player.getCash() < this.price) {
      return false;
    }

    this.setOwner(player);
    player.addCompany(this);

    return true;
  }

  getOwner(): Player | null {
    return this.owner;
  }

  setOwner(owner: Player | null) {
    this.owner = owner;
  }

  getCost(player: Player): number | null {
    if(this.owner === null){
      return this.price;
    }

    if(this.owner === player){
      return null;
    }

    const dice: number = MonopolyContext.playDice();

    if (this.owner.hasAllCompanies()){
      return dice * 10;
    } 
    return dice * 4;
  }

  execute(player: Player): DisplayObject {    
    return {
      title: this.name,
      message: [''],
      owner: this.owner,
      cost: this.getCost(player),
    };
  }

  isProperty = () => false;
  isCompany = () => true;
  isStation = () => false;
}