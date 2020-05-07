import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Game } from '../core/monopoly';
import { Player } from '../core/Player';
import { Case } from '../core/Case';

@Module
export default class Monopoly extends VuexModule {
  game = Game;
  player: Player | null = null;
  
  
  count: number = 0;

  @Mutation
  finish() {
    console.log('finish');
    this.game.setNextPlayer();
    this.player = this.game.getPlayer();
  }

  getCaseById(caseIndex: number) {
    return this.game.getCase(caseIndex);
  }

  get getCase() {
    return (caseIndex: number) => {
      return this.game.getCase(caseIndex);
    };
  }


  @Mutation
  increment(delta: number) {
    this.count += delta
  }
  @Mutation
  decrement(delta: number) {
    this.count -= delta
  }

  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  incr() {
    return 5
  }
  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action({ commit: 'decrement' })
  decr() {
    return 5
  }
}