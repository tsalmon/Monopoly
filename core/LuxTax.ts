import { TaxCase } from './TaxCase';
import { Player } from './Player';
import { DisplayObject } from './DisplayObject';

export class LuxTax implements TaxCase {
  cost: number = 125;

  execute(player: Player): DisplayObject {
    return {
      title: 'Taxe de luxe',
      message: [`Vous devez payer la taxe. ${ this.cost }`],
      cost: this.cost,
    };
  }

  getTaxCost(): number {
    return this.cost;
  }

  toString() {
    return 'Taxe de Luxe'
  }
}