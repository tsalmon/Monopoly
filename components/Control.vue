<template>
<div class="container control">
  <InitGame v-if="isInit()" />
  <section class="section" v-else-if="isFinished()">
    <div class="container">
      <h1 class="title">Jeu fini</h1>
      <h2 class="subtitle">
        {{ monopoly.getWinner().getName() }} a gagné ! 
      </h2>
    </div>
  </section>
  <PlayingGame v-else-if="isPlaying()" />
  <div v-else>
    Erreur
  </div>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { GameState } from '@/core/GameState';
import InitGame from '@/components/controls/InitGame.vue';
import PlayingGame from '@/components/controls/PlayingGame.vue';
import MonopolyInitState from '@/core/MonopolyInitState';
import MonopolyFinishedState from '@/core/MonopolyFinishedState';
import MonopolyContext from '@/core/MonopolyContext';

const mp = namespace('monopoly');

@Component({
  components: {
    InitGame,
    PlayingGame,
  },
})
export default class Control extends Vue {
  @mp.Getter getState!: Function;
  @mp.State(state => state.monopoly) monopoly!: MonopolyContext;

  isInit() {
    return this.getState() instanceof MonopolyInitState;
  }

  isFinished() {
    return this.monopoly.gameFinished();
  }

  isPlaying() {
    return !this.isInit() && !this.isFinished() ;
  }
}
</script>
<style scoped>
.control {
  padding: 70px;
}
</style>