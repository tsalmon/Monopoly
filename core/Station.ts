import { RealEstate } from './RealEstate';
import { Player } from './Player';
import { DisplayObject } from './DisplayObject';

interface RentStation {
  owned1: number,
  owned2: number,
  owned3: number,
  owned4: number,
}

export class Station implements RealEstate {
  name: string;
  price: number;
  owner: Player | null;
  rents: RentStation =  {
    owned1: 25,
    owned2: 50,
    owned3: 100,
    owned4: 200
  };
  mortgage: number = 100;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
    this.owner = null;
  }

  buy(player: Player): boolean {
    if(player.hasStation(this) || this.owner === player) {
      throw 'User has already property';
    }

    if(this.owner) {
      throw 'Property not free';
    }

    if(player.getCash() < this.price) {
      return false;
    }

    this.setOwner(player);
    player.addStation(this);

    return true;
  }

  getOwner(): Player | null {
    return this.owner;
  }

  setOwner(owner: Player | null) {
    this.owner = owner;
  }

  getMessage(player: Player) : string[] {
    if(this.owner === null) {
      return ['Emplacement disponible'];
    }

    if(this.owner === player) {
      return ['Vous êtes chez vous'];
    }

    return [''];
  }

  getCost(player: Player): number | null {
    if(this.owner === null) {
      return this.price;
    }

    if(this.owner === player) {
      return null;
    }

    switch(this.owner.getNbStations()) {
      case 1: return this.rents.owned1;
      case 2: return this.rents.owned2;
      case 3: return this.rents.owned3;
      case 4: return this.rents.owned4;
      default: throw 'Invalid numbers of stations';
    }
  }

  execute(player: Player): DisplayObject {
    return {
      title: this.name,
      message: this.getMessage(player),
      owner: this.owner,
      cost: this.getCost(player),
    };
  }
}