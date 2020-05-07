import { RealEstate } from './RealEstate';
import { Player } from './Player';
import { Colors } from './Colors';
import { Rent } from './Rent';

export class Property implements RealEstate {
  private color: Colors;
  housePrice: number;
  mortgage: number;
  name: string;
  owner: Player | null;
  price: number;
  rents: Rent;

  constructor(
    name: string,
    color: Colors,
    price: number,
    housePrice: number,
    mortgage: number,
    rents: Rent) 
  {
    this.color = color;
    this.housePrice = housePrice;
    this.mortgage = mortgage;
    this.name = name;
    this.owner = null;
    this.price = price;
    this.rents = rents;
  }

  getColor() {
    switch(this.color) {
      case Colors.BROWN: return 'green';
      case Colors.CYAN: return 'cyan';
      case Colors.PURPLE: return 'purple';
      case Colors.ORANGE: return 'orange';
      case Colors.RED: return 'red';
      case Colors.YELLOW: return 'yellow';
      case Colors.GREEN: return 'green';
      case Colors.BLUE: return 'blue';
    }
  }

  execute(player: Player): void {

  }
}