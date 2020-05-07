import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { Game } from '../core/monopoly';
import { Player } from '../core/Player';
import { Case } from '../core/Case';
import { GameState } from '~/core/GameState';

@Module({ namespaced: true, name: 'Monopoly' })
export default class Monopoly extends VuexModule {
  private game = Game;
  currentPlayer: Player | null = null;

  get getStatut() {
    return () => {
      return this.game.getStatus();
    }
  }

  get getCase(): Function {
    return (caseIndex: number): Case => {
      return this.game.getCase(caseIndex);
    };
  }
  
  @Action
  next() {
    console.log('next turn');
    this.game.setNextPlayer();
    this.setCurrentPlayer();
  }


  getCaseById(caseIndex: number) {
    return this.game.getCase(caseIndex);
  }

  @Mutation
  setStatus(status: GameState) {
    this.game.setStatus(status);
  }

  @Mutation
  setNextPlayer() {
    this.game.setNextPlayer();
  }


  @Mutation
  setCurrentPlayer() {
    this.currentPlayer = this.game.getPlayer();
  }

  @Mutation 
  setPlayers(nbPlayers: number, isBot: boolean) {
    console.log('set player');
    /*
    const players: Player[] = [];

    for(let i = 0; i < nbPlayers; i++) {
      players.push(new Player(`player ${i+1}`, isBot));
    }

    this.game.setPlayers(players);
    */
  } 
}