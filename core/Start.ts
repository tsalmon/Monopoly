import { Case } from './Case';
import { Player } from './Player';
import { DisplayObject } from './DisplayObject';
import { START_CASH } from './constants';

export class Start implements Case {
  execute(player: Player): DisplayObject {
    return {
      title: 'Case départ',
      message: [`Touchez ${ START_CASH } euro`],
    };
  }
}