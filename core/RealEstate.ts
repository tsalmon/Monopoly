import { Case } from './Case';
import { Player } from './Player';
import { Rent } from './Rent';

export interface RealEstate extends Case {
  name: string;
  price: number;
  owner: Player | null;
  mortgage: number;
}