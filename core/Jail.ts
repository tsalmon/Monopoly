import { Case } from './Case';
import { Player } from './Player';
import { DisplayObject } from './DisplayObject';

export class Jail implements Case {
  private name: string = 'Jail';
  private cost = 50;

  execute(player: Player): DisplayObject {
    if(player.inJail()) {
      return {
        title: 'Prison',
        message: ['Lancez les dès pour faire un double ou payer l\'amende'],
        cost: this.cost,
      };
    } else {
      return {
        title: 'Prison',
        message: ['(juste en visite)'],
      };   
    }
  }
}