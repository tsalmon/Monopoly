<template>
  <div class="modal" :class="{ 'is-active': isActive() }">
    <div class="modal-background"></div>
    <div v-if="isActive()" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ getCaseById(currentPlayer.position) }}</p>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>  
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from "vuex";
import Component from 'vue-class-component';
import {
  Action,
  Getter,
  Mutation,
  namespace,
  State,
} from 'vuex-class'
import { Player } from '@/core/Player';

const mp = namespace('monopoly');

@Component
export default class Modal extends Vue {
  @mp.Getter currentPlayer!: Player;
  @mp.Getter getCaseById!: Function;
  @State(state => state.monopoly.dice1) dice1!: number;
  @State(state => state.monopoly.dice2) dice2!: number;

  isActive() {
    return this.dice1 > 0 && this.dice2 > 0;
  }
}
</script>