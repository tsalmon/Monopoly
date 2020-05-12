<template>
<div class="card">
  <div class="card-header">
    <p class="card-header-title">
      {{ displayObject.title }}
    </p>
  </div>
  <div class="card-content">
    <div v-if="dicesPlayed()">
      <p :key="index" v-for="(line, index) of displayObject.message">
        {{ line }}
      </p>
    </div>
    <div v-else>
      <p>
        Vous avez trois tours pour faire un double avec les dés ou payez l'amende
      </p>        
    </div>
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
    </section>

  </div>
  <footer class="card-footer">
    <a v-if="dicesPlayed()" href="#" class="card-footer-item" @click="play(false)">Passer</a>
    <a href="#" class="card-footer-item" @click="play(true)">Payer l'amende de 50 €</a>
  </footer>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State, namespace } from 'vuex-class'
import { GameState } from '@/core/GameState';
import MonopolyContext from '@/core/MonopolyContext';
import { Station as StationType } from '@/core/Station';
import { Company as CompanyType } from '@/core/Company';
import { Property as PropertyType } from '@/core/Property';
import StationCase from '@/components/Station.vue';
import CompagnyCase from '@/components/Compagny.vue';
import PropertyCase from '@/components/Property.vue';
import { DisplayObject } from '@/core/DisplayObject';
import { Case } from '@/core/Case';

const mp = namespace('monopoly');

@Component({
  components: {
    CompagnyCase,
    PropertyCase,
    StationCase,
  },
})
export default class Jail extends Vue {
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

  dicesPlayed(): boolean {
    return this.dice1 !== null && this.dice2 !== null;
  }

  get displayObject(): DisplayObject {
    return this.getState().displayObject();
  }

  play(response: boolean) {
    this.dice1 = null;
    this.dice2 = null;
    this.monopoly.execute(response);
  }
}
</script>