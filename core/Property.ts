import { RealEstate } from './RealEstate';
import { Player } from './Player';
import { Colors } from './Colors';
import { Rent } from './Rent';
import { DisplayObject } from './DisplayObject';

export class Property implements RealEstate {
  private color: Colors;
  housePrice: number;
  hostelPrice: number;
  nbHouses: number = 0;
  mortgage: number;
  name: string;
  owner: Player | null;
  price: number;
  rents: Rent;
  mortgaged: boolean;

  constructor(
    name: string,
    color: Colors,
    price: number,
    housePrice: number,
    mortgage: number,
    rents: Rent
  ) {
    this.mortgaged = false;
    this.color = color;
    this.housePrice = housePrice;
    this.hostelPrice = Math.floor(housePrice * 1.25) 
    this.mortgage = mortgage;
    this.name = name;
    this.owner = null;
    this.price = price;
    this.rents = rents;
  }

  buy(player: Player): boolean {
    const cost: number | null = this.getCost(player);

    if(cost === null) {
      throw 'Cost undefined';
    }

    if(player.getCash() < cost) {
      return false;
    }

    if(this.owner === player) {
      this.nbHouses++;
    } else {
      if(this.owner) {
        throw 'Property not free';
      }
  
      this.setOwner(player);
      player.addProperty(this);  
    }

    player.removeCash(cost);  

    return true;
  }

  getCost(player: Player): number | null {
    if(this.owner === null){
      return this.price;
    }

    if(this.owner === player) {
      if(!this.canBuildHouse(player)) {
        return null;
      }

      if(this.nbHouses === 4) {
        return this.hostelPrice;
      }

      return this.housePrice;
    }

    switch(this.nbHouses) {
      case 1: return this.rents.with1House;
      case 2: return this.rents.with2Houses;
      case 3: return this.rents.with3Houses;
      case 4: return this.rents.with4Houses;
      case 5: return this.rents.withHotel;
      default: return this.rents.rent;
    }
  }

  canBuildHouse(player: Player): boolean {
    if(this.nbHouses === 5) {
      return false;
    }

    if(!player.hasAllPropertiesByColor(this.color)){
      return false;
    }

    const properties: Property[] = player.getProperties();

    for(let property of properties) {
      if(this.nbHouses + 1 - property.getNbHouses() > 1){
        return false;
      }
    }

    return true;
  }

  getMessage(player: Player): string {
    if(this.owner === null) {
      return 'terrain libre';
    }

    if(this.owner !== player) {
      return "Vous êtes chez quelqu'un, vous devez payer la location !";
    }

    if(!player.hasAllPropertiesByColor(this.color)) {
      return 'Vous devez posséder toute la zone pour construire une maison'
    }
    
    if(this.nbHouses === 5) {
      return `Vous êtes au maximum de constructions possibles pour le quartier ${this.displayColor()}`;
    }

    if(!this.canBuildHouse(player)) {
      return 'Vous devez d\'abord construire sur les autres emplacements avant d\'ajouter une maison ou un hôtel ici';
    }

    if(this.nbHouses === 0) {
      return 'Vous pouvez construire une maison à cet emplacement';
    } else if(this.nbHouses === 4) {
      return 'Vous pouvez construire un hotel à cet emplacement';
    } else {
      return `Vous pouvez construire une ${this.nbHouses + 1}e maison à cet emplacement`;
    }
  }

  displayStateProperty() {
    switch(this.nbHouses){
      case 0: return 'Terrain';
      case 1: return '1 maison';
      case 2:
      case 3:
      case 4:
        return `${this.nbHouses} maisons`;
      case 5: 
        return 'Hôtel';
      default:
        throw "Invalid number of houses and hostels";
    }
  }

  execute(player: Player): DisplayObject {
    return {
      title: (this.owner) ? `${this.name} - ${this.displayStateProperty()}` : this.name,
      message: [this.getMessage(player)],
      owner: this.owner,
      cost: this.getCost(player),
    };
  }

  setMortaged(mortgaged: boolean) {
    this.mortgaged = mortgaged;
  }

  isMortaged(): boolean {
    return this.mortgaged;
  }

  getNbHouses(): number {
    return this.nbHouses;
  }

  setNbHouses(nbHouses: number){
    this.nbHouses == nbHouses;
  }

  getOwner(): Player | null {
    return this.owner;
  }

  setOwner(owner: Player | null) {
    this.owner = owner;
  }

  getColor(): Colors {
    return this.color;
  }

  displayColor(): string {
    switch(this.color) {
      case Colors.BROWN: return 'green';
      case Colors.CYAN: return 'cyan';
      case Colors.PURPLE: return 'purple';
      case Colors.ORANGE: return 'orange';
      case Colors.RED: return 'red';
      case Colors.YELLOW: return '#edfd00';
      case Colors.GREEN: return 'green';
      case Colors.BLUE: return 'blue';
    }
  }

  toString(): string {
    return this.name;
  }

  isProperty = () => true;
  isCompany = () => false;
  isStation = () => false;
}