import { Player } from './Player';

export interface DisplayObject {
  title: string,
  message: string[],
  owner?: Player | null,
  cost?: number | null,
};
