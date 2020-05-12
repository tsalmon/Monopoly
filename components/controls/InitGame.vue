<template>
    <section class="section">
    <div class="container">
      <h1 class="title">Initialisation du jeu</h1>
      <h2 class="subtitle">
        Définissez le nombre de participants
      </h2>
      <FieldNumber
        placeholder="Nombre de joueurs"
        :minValue="1"
        :maxValue="2"
        :addCallback="watchPlayer"
        :removeCallback="watchPlayer"
      />
    </div>
    <hr />
    <div class="container">
      <div>
        <a class="button" @click="start" :disabled="nbPlayers + nbBots < 2">
          Commencer
        </a>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import FieldNumber from '@/components/form/FieldNumber.vue';
import { GameState } from '../../core/GameState';

const mp = namespace('monopoly');

@Component({
  components: {
    FieldNumber,
  },
})
export default class InitGame extends Vue {
  @mp.Mutation addPlayers!: Function;
  @mp.Mutation setNextPlayer!: Function;
  @mp.Mutation setStatus!: Function;

  nbPlayers: number = 1;
  nbBots: number = 0;

  start() {
    if(this.nbPlayers + this.nbBots < 2){
      return;
    }
    this.addPlayers(this.nbPlayers, this.nbBots);
  }

  watchPlayer(nbPlayers: number) {
    this.nbPlayers = nbPlayers;
  }

  watchBot(nbBots: number) {
    this.nbBots = nbBots;
  }
}
</script>