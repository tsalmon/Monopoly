<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <Jail v-if="jailState()" />
        <Dices v-else-if="diceState()" />
        <Buy v-else-if="buyState()" />
        <Auction v-else-if="auctionState()" />
        <ExecuteCase v-else />
      </div>
      <UserInformations class="column" />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import FieldNumber from '@/components/form/FieldNumber.vue';
import { GameState } from '../../core/GameState';
import { Case } from '../../core/Case';
import { Player } from '../../core/Player';
import UserActions from '@/components/controls/UserActions.vue';
import UserInformations from '@/components/controls/UserInformations.vue';
import Dices from '@/components/states/Dices.vue';
import Buy from '@/components/states/Buy.vue';
import ExecuteCase from '@/components/states/ExecuteCase.vue';
import MonopolyContext from '../../core/MonopolyContext';
import Auction from '@/components/states/Auction.vue';
import Jail from '@/components/states/Jail.vue';

const mp = namespace('monopoly');

@Component({
  components: {
    Auction,
    Buy,
    Dices,
    ExecuteCase,
    FieldNumber,
    Jail,
    UserActions,
    UserInformations,
  },
})
export default class PlayingGame extends Vue {
  @mp.Getter getState!: Function;
  @mp.Getter currentPlayer!: Player;
  @mp.State(state => state.monopoly) monopoly!: MonopolyContext;

  diceState(): boolean {
    return "dice1" in this.getState() && "dice2" in this.getState();
  }

  auctionState(): boolean {
    return "bestBid" in this.getState();
  }

  jailState(): boolean {
    return this.diceState() && this.getState().player.inJail();
  }

  buyState(): boolean {
    if(!this.getState().currentCase){
      return false;
    }

    return this.getState().currentCase.owner === null;
  }

}
</script>