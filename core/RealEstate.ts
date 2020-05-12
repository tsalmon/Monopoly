import { Case } from './Case';
import { Player } from './Player';

export interface RealEstate extends Case {
  name: string;
  price: number;
  owner: Player | null;
  mortgage: number;

  getCost(player: Player): number | null;
  buy(player: Player): boolean;
}