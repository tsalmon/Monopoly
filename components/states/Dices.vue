<template>
  <section class="info-tiles">
    <div class="tile is-ancestor has-text-centered">
      <div class="tile is-parent">
        <a class="tile is-child box" @click="playDice(1)">
          <p v-if="dice1 === null" class="title" >Lancer le dé</p>
          <img v-else :src="`/dice_${dice1}.png`" />
        </a>
      </div>
      <div class="tile is-parent">
        <a class="tile is-child box" @click="playDice(2)">
          <p v-if="dice2 === null" class="title" >Lancer le dé</p>
          <img v-else :src="`/dice_${dice2}.png`" />
        </a>
      </div>
    </div>

    <article v-if="dice1 == dice2 && dice1 !== null" class="message is-info">
      <div class="message-header">
        <p>Double !</p>
      </div>
      <div class="message-body">
        Vous pouvez jouez deux coups !
      </div>
    </article>

    <footer>
      <a :disabled="dice1 === null || dice2 === null" class="button is-fullwidth" @click="play"> 
        OK
      </a>
    </footer>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State, namespace } from 'vuex-class'
import { GameState } from '../../core/GameState';
import MonopolyContext from '@/core/MonopolyContext';

const mp = namespace('monopoly');

@Component
export default class Dices extends Vue {
  @mp.Getter getState!: Function;
  @mp.State(state => state.monopoly) monopoly!: MonopolyContext;
  dice1: number | null = null;
  dice2: number | null = null;

  playDice(dice: number) {
    if(dice === 1) {
      this.dice1 = this.getState().dice1;
    } else {
      this.dice2 = this.getState().dice2;
    }
  }

  play() {
    if(this.dice1 === null || this.dice2 === null){
      return ;
    }

    this.monopoly.execute(null);
  }
}
</script>