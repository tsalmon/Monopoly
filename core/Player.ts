import { RealEstate } from './RealEstate';

export class Player {
  private bot: boolean;
  private jail: boolean;
  private name: string;
  private nbDicesDoubles: number;
  private position: number;
  private properties: RealEstate[];
  private turnInJail: number;
  private insolvency: boolean;
  private cash: number;

  constructor(name: string, bot: boolean) {
    this.cash = 1000;
    this.bot = bot;
    this.name = name;
    this.nbDicesDoubles = 0;
    this.position = 0;
    this.properties = [];
    this.turnInJail = 0;
    this.jail = false;
    this.insolvency = false;
  }

  inJail(): boolean {
    return this.jail;
  }

  isInsolvable(): boolean{
    return this.insolvency;
  }

  display(): string {
    return this.name;
  }
}