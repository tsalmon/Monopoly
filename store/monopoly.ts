import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
//import { Game } from '../core/monopoly';
import { Player } from '../core/Player';
import { Case } from '../core/Case';
import { MonopolyCases } from "@/data/MonopolyCases";
import { GameState } from '~/core/GameState';

@Module({ namespaced: true, name: 'Monopoly' })
export default class Monopoly extends VuexModule {
  private cases: Case[] = MonopolyCases;
  private player: number | null = null;
  private status: GameState  = GameState.INIT;
  private players: Player[] = [];
  dice1: number | null = null;
  dice2: number | null = null;

  get getStatut(): Function {
    return (): GameState => {
      return this.status;
    }
  }

  get getCase(): Function {
    return (caseIndex: number): Case => {
      return this.cases[caseIndex];
    };
  }

  get currentPlayer(): Player {
    if(this.player !== null) {
      return this.players[this.player];
    }

    throw 'player not defined';
  }

  getCaseById(caseIndex: number) {
    if(caseIndex < 0) {
      throw 'case lower than zero'
    }
    if(caseIndex > this.cases.length){
      throw 'case out of array'
    }

    return this.cases[caseIndex];
  }


  @Mutation
  playDice1() {
    if(this.dice1){
      return;
    }

    this.dice1 = Math.floor(Math.random() * 6 + 1);
  }

  @Mutation
  playDice2() {
    if(this.dice2){
      return;
    }

    this.dice2 = Math.floor(Math.random() * 6 + 1);
  }

  @Mutation
  setStatus(status: GameState) {
    this.status = status;
  }

  @Mutation
  setNextPlayer() {
    if(this.player === null){
      this.player = 0;
    } else if (this.player >= this.players.length) {
      this.player = 0;
    } else {
      this.player++;      
    } 
    console.log('setNextPlayer', this.player);
  }

  @Mutation
  addPlayers(nbPlayers: number, isBot: boolean) {
    console.log('addPlayers');
    for(let i = 0; i < nbPlayers; i++) {
      this.players.push(new Player(`player ${i+1}`, isBot));
    }
  }

  @Mutation
  resetPlayer() {
    this.players = [];
  }
}