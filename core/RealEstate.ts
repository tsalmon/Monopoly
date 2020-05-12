import { Case } from './Case';
import { Player } from './Player';

export interface RealEstate extends Case {
  name: string;
  price: number;
  owner: Player | null;
  mortgage: number;

  isProperty(): boolean;
  isStation(): boolean;
  isCompany(): boolean;
  getCost(player: Player): number | null;
  buy(player: Player): boolean;
}