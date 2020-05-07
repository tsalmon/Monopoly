import { Case } from './Case';
import { Player } from './Player';

export class Start implements Case {
  private name: string = 'Départ';

  execute(player: Player) {
    
  }

  get getName(): string {
    return this.name;
  }
}