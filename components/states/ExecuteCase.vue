<template>
<article class="message">
  <div class="message-header">
    <p>{{ title }}</p>
  </div>
  <div class="message-body">
    <p :key="index" v-for="(line, index) of message">
      {{ line }}
    </p>
  </div>
  <footer class="has-text-centered">
    <a class="button" v-bind:class="{ 'is-danger': cost > 0 }" @click="play">
      {{ displayButtonContent() }}
    </a>
  </footer>
</article>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State, namespace } from 'vuex-class'
import { GameState } from '../../core/GameState';
import MonopolyContext from '@/core/MonopolyContext';

const mp = namespace('monopoly');

@Component
export default class ExecuteCase extends Vue {
  @mp.Getter getState!: Function;
  @mp.State(state => state.monopoly) monopoly!: MonopolyContext;

  get title(): string {
    return this.getState().displayObject().title;
  }

  get message(): string {
    return this.getState().displayObject().message;
  }

  get cost(): number {
    return this.getState().displayObject().cost || 0;
  }

  displayButtonContent(): string {
    if(this.cost) {
      return `${this.cost.toString()} €`;
    }

    return 'OK'
  } 

  play() {
    this.monopoly.execute(null);
  }
}
</script>