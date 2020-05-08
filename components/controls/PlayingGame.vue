<template>
    <section class="section">
    <div class="container">
      <h1 class="title">Joueur actuel: {{ currentPlayer.getName() }}  </h1>
      <div class="columns">
        <UserActions class="column" />
        <UserInformations class="column" />
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
import { Case } from '../../core/Case';
import { Player } from '../../core/Player';
import UserActions from '@/components/controls/UserActions.vue';
import UserInformations from '@/components/controls/UserInformations.vue';

const mp = namespace('monopoly');

@Component({
  components: {
    FieldNumber,
    UserInformations,
    UserActions,
  },
})
export default class PlayingGame extends Vue {
  @mp.Getter currentPlayer!: Player;
  @mp.State dice1!: number;
  @mp.State dice2!: number;

  created() {
    console.log('CREATED');
    console.log(this.currentPlayer);
  }
}
</script>