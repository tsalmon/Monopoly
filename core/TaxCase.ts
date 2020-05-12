import { Case } from './Case';

export interface TaxCase extends Case {
  readonly cost: number,
  getTaxCost(): number,
}