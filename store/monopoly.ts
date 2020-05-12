import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import MonopolyContext from '../core/MonopolyContext';
import { Case } from '../core/Case';
import { GameState } from '~/core/GameState';
import { Player } from '~/core/Player';

@Module({ namespaced: true, name: 'Monopoly' })
export default class MonopolyStore extends VuexModule {
  monopoly: MonopolyContext = new MonopolyContext();

  get getCase(): Function {
    return (caseIndex: number): Case => {
      return this.monopoly.getCaseById(caseIndex);
    }
  }

  get getState(): Function {
    return (): GameState => {
      return this.monopoly.getState();
    }
  }

  get currentPlayer(): Player | undefined {
    return this.monopoly.getState().player;
  }

  @Mutation
  addPlayers(nbPlayers: number, nbBots: number) {
    this.monopoly.init(nbPlayers, nbBots)
  }
}