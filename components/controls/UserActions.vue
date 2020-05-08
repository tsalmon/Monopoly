<template>
  <section class="section">
    <div class="columns">
      <a class="column button" :disabled="dice1" @click="playDice1">Dés 1 {{ dice1 | showDice }} </a>
      <a class="column button" :disabled="dice2" @click="playDice2">Dés 2 {{ dice2 | showDice }} </a>
    </div>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'
import FieldNumber from '@/components/form/FieldNumber.vue';
import { GameState } from '../../core/GameState';
import { Case } from '../../core/Case';
import { Player } from '../../core/Player';

const mp = namespace('monopoly');

@Component({
  components: {
    FieldNumber,
  },
  filters: {
    showDice(dice: number): string {
      if(!dice){
        return '';
      }
      return `: ${dice}`
    }
  }
})
export default class UserActions extends Vue {
  @State(state => state.monopoly.dice1) dice1!: number;
  @State(state => state.monopoly.dice2) dice2!: number;
  @mp.Getter currentPlayer!: Player;
  @mp.Mutation playDice1!: Function;
  @mp.Mutation playDice2!: Function;


  created() {
  }
}
</script>