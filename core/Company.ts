import { RealEstate } from './RealEstate';
import { Player } from './Player';

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

  execute(player: Player): void {

  }
}