import { RealEstate } from './RealEstate';
import { Player } from './Player';

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

  execute(player: Player): void {

  }
}