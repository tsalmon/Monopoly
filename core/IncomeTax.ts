import { TaxCase } from './TaxCase';
import { Player } from './Player';
import { DisplayObject } from './DisplayObject';

export class IncomeTax implements TaxCase {
  cost: number = 75;

  execute(player: Player): DisplayObject {
    return {
      title: 'Taxe sur le revenu',
      message: ['Vous devez payer la taxe.'],
      cost: this.cost,
    };
  }

  getTaxCost(): number {
    return this.cost;
  }

  toString() {
    return 'Taxe sur le revenu';
  }
}