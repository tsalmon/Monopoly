import { Case } from './Case';
import { Player } from './Player';
import { DisplayObject } from './DisplayObject';

export class Park implements Case {
  private name: string = 'Park';
  
  execute(player: Player): DisplayObject{
    return {
      title: 'Parc',
      message: ['Rien à faire...'],
    };
  }

  toString() {
    return 'Taxe de Luxe'
  }

}