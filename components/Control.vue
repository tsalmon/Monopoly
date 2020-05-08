<template>
<div class="container field has-addons has-addons-centered">
  <InitGame v-if="isInit()" />
  <PlayingGame v-if="isPlaying()" />
  <section class="section" v-if="isFinished()">
    <div class="container">
      <h1 class="title">Jeu fini</h1>
      <h2 class="subtitle">
        A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading
      </h2>
    </div>
  </section>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import { GameState } from '@/core/GameState';
import InitGame from '@/components/controls/InitGame.vue';
import PlayingGame from '@/components/controls/PlayingGame.vue';

const mp = namespace('monopoly');

@Component({
  components: {
    InitGame,
    PlayingGame,
  },
})
export default class Control extends Vue {
  @mp.Getter getStatut!: Function;

  isInit() {
    return this.getStatut() === GameState.INIT;
  }

  isPlaying() {
    return this.getStatut() === GameState.PLAYING;
  }

  isFinished() {
    return this.getStatut() === GameState.END;
  }
}
</script>
<style scoped></style>