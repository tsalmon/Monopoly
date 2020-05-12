import { RealEstate } from './RealEstate';
import { Colors } from './Colors';
import { Property } from './Property';
import { Company } from './Company';
import { Station } from './Station';
import { DisplayPlayer } from './DisplayPlayer';

export class Player {
  private id: number;
  private bot: boolean;
  private jail: boolean;
  private name: string;
  private nbDEqualsDice: number = 0;
  private position: number;
  private properties: Property[];
  private compagnies: Company[];
  private stations: Station[];
  private turnInJail: number;
  private insolvency: boolean;
  private cash: number;
  private jailCards: number;

  constructor(id: number, name: string, bot: boolean) {
    this.id = id;
    this.bot = bot;
    this.name = name;
    this.position = 0;
    this.cash = 1000;

    this.properties = [];
    this.stations = [];
    this.compagnies = [];

    this.nbDEqualsDice = 0;
    this.turnInJail = 0;
    this.jail = false;
    this.jailCards = 0;

    this.insolvency = false;
  }

  setId(id: number) {
    this.id = id;
  }

  addJailCard() {
    this.jailCards++;
  }

  /* PROPERTIES */

  hasCompany(company: Company): boolean {
    for(let companyUser of this.compagnies) {
      if(companyUser === company){
        return true;
      }
    }

    return false;
  }

  hasStation(station: Station): boolean {
    for(let stationUser of this.stations) {
      if(stationUser === station){
        return true;
      }
    }

    return false;
  }

  hasProperty(property: Property): boolean {
    for(let propertyUser of this.properties) {
      if(propertyUser === property){
        return true;
      }
    }

    return false;
  }

  addCompany(company: Company): void {
    if(this.hasCompany(company)) {
      throw 'User has already company';
    }

    this.compagnies.push(company);
  }

  addStation(station: Station): void {
    if(this.hasStation(station)) {
      throw 'User has already station';
    }

    this.stations.push(station);
  }

  addHouse(property: Property) {
    if(property.nbHouses === 5) {
      throw 'User can\'t build more';
    }

    property.nbHouses++;
  }

  addProperty(property: Property): void {
    if(this.hasProperty(property)) {
      throw 'User has already property';
    }

    this.properties.push(property);
  }

  getCompagnies(): Company[] {
    return this.compagnies;
  }

  getStations(): Station[] {
    return this.stations;
  }

  getProperties(): Property[] {
    return this.properties;
  }

  getNbStations(): number {
    return this.stations.length;
  }

  hasAllCompanies(): boolean {
    return this.compagnies.length === 2;
  }

  hasAllPropertiesByColor(color: Colors): boolean {
    let length = 0;

    if(color === Colors.BROWN || color === Colors.BLUE) {
      length = 2;
    } else {
      length = 3;
    }

    for(let property of this.properties) {
      if(property.getColor() === color) {
        length--;
      }

      if(length === 0) {
        return true;
      }
    }

    return false;
  }

  /* EQUALS DICES */

  incNbEqualsDice() {
    this.nbDEqualsDice++;
  }

  getNbDEqualsDice(): number {
    return this.nbDEqualsDice;
  }

  setNbDEqualsDice(nbDEqualsDice: number) {
    this.nbDEqualsDice = nbDEqualsDice;
  }

  /* CASH */
 
  pay(player: Player, sum: number) {
    if(sum > this.cash) {
      this.insolvency = true;
      player.addCash(this.cash)
    } else {
      this.removeCash(sum);
      player.addCash(sum);
    }
  }
  
  addCash(cash: number) {
    if(cash < 0) {
      throw "Can't add negative cash"
    }
    this.cash += cash;
  }

  removeCash(cash: number) {
    if(cash < 0) {
      throw "Can't remove negative cash"
    }

    this.cash -= cash;

    if(this.cash <= 0) {
      this.insolvency = true;
    }
  }

  isInsolvable(): boolean{
    return this.insolvency;
  }

  getCash(): number {
    return this.cash;
  }

  /* JAIL */

  setJail(jail: boolean) {
    this.jail = jail;

    if(jail === false) {
      this.nbDEqualsDice = 0;
    }
  }

  inJail(): boolean {
    return this.jail;
  }

  getTurnInJail(): number {
    return this.turnInJail;
  }

  resetTurnInJail() {
    this.turnInJail = 0;
  }

  /* POSITION */

  setPosition(position: number) {
    this.position = position;
  }

  getPosition(): number {
    return this.position;
  }

  /* INFORMATIONS */

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  display(): DisplayPlayer {
    return {
      name: this.name,
      properties: this.properties,
      cash: this.cash,
      jail: this.jail,
    }
  }

  toString(): string {
    return `${this.name} - ${this.cash}`;
  }
}