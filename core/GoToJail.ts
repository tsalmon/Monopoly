import { Case } from './Case';
import { Player } from './Player';
import { DisplayObject } from './DisplayObject';

export class GoToJail implements Case {
  private name: string = 'Go to Jail';
  
  execute(player: Player): DisplayObject {
    player.setJail(true);

    return {
      title: this.name,
      message: ['Allez en prison'],
    };    
  }
}