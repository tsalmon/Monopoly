<template>
<div>
  <Modal />
  <!-- top -->
  <div class="columns is-gapless is-marginless">
    <!-- TOP West corner -->
    <Corner class="column is-gapless" :properties="getCase(20)" :imgPath='"/parking.png"' />

    <div class="column is-gapless is-four-fifths">
      <div class="columns is-gapless">
        <Property class="column" :properties="getCase(21)" />
        <Luck class="column" />
        <Property class="column" :properties="getCase(23)" />
        <Property class="column" :properties="getCase(24)" />
        <Station class="column" />
        <Property class="column" :properties="getCase(26)" />
        <Property class="column" :properties="getCase(27)" />
        <Compagny class="column" :imgPath='"/fire-hydrant-firefighting.jpg"' />
        <Property class="column" :properties="getCase(28)" />
      </div>
    </div>
    <!-- TOP EAST corner -->
    <Corner class="column is-gapless" :properties="getCase(29)" :imgPath='"/go-to-jail.png"' />
  </div>

  <!-- center -->
  <div class="columns is-marginless is-gapless">
    <div class="column is-gapless">
      <div class="columns is-gapless is-multiline">
        <Property class="column is-full" :properties="getCase(19)" />
        <Property class="column is-full" :properties="getCase(18)" />
        <Community class="column is-full" />
        <Property class="column is-full" :properties="getCase(16)" />
        <Station class="column is-full" />
        <Property class="column is-full" :properties="getCase(14)" />
        <Property class="column is-full" :properties="getCase(13)" />
        <Compagny class="column is-full" :imgPath='"/electricity.jpeg"' />
        <Property class="column is-full" :properties="getCase(11)" />
      </div>
    </div>
    <div class="column is-four-fifths is-gapless">
      <Control />
    </div>
    <div class="column is-gapless">
      <div class="columns is-gapless is-multiline">
        <Property class="column is-full" :properties="getCase(30)" />
        <Property class="column is-full" :properties="getCase(31)" />
        <Community class="column is-full" />
        <Property class="column is-full" :properties="getCase(33)" />
        <Station class="column is-full" />
        <Luck class="column is-full" />
        <Property class="column is-full" :properties="getCase(36)" />
        <Tax class="column is-full" :imgPath='"/luxurytax.jpeg"' />
        <Property class="column is-full" :properties="getCase(38)" />
      </div>
    </div>
  </div>

  <!-- south -->
  <div class="columns is-gapless">
    <Corner class="column is-gapless" :properties="getCase(10)" :jail="true" :imgPath='"/jail.png"' />
    <div class="column is-four-fifths">
      <div class="columns is-gapless">
        <Property class="column" :properties="getCase(9)" />
        <Property class="column" :properties="getCase(8)" />
        <Luck class="column" />
        <Property class="column" :properties="getCase(6)" />
        <Station class="column" />
        <Tax class="column" :imgPath='"/dollars.png"' />
        <Property class="column" :properties="getCase(3)" />
        <Community class="column" />
        <Property class="column" :properties="getCase(1)" />
      </div>
    </div>
    <Corner class="column is-gapless" :properties="getCase(0)" :imgPath='"/arrow.png"' />
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
import Community from '@/components/Community.vue';
import Compagny from '@/components/Compagny.vue';
import Corner from '@/components/Corner.vue';
import Luck from '@/components/Luck.vue';
import Property from '@/components/Property.vue';
import Station from '@/components/Station.vue';
import Tax from '@/components/Tax.vue';
import Control from '@/components/Control.vue';
import { Player } from '@/core/Player';
import Modal from '@/components/controls/Modal.vue';

const mp = namespace('monopoly');

@Component({
	components: {
    Community,
    Compagny,
    Control,
    Corner,
    Luck,
    Modal,
    Property,
    Station,
    Tax,
	},
  filters: {
    displayName(player: Player) {
      if(!player) {
        return 'no player'
      }
      return player.getName();
    }
  }
})
export default class Index extends Vue {
  @mp.State player!: string;
  @mp.Mutation finish!: Function;
  @mp.Getter getCase!: Function;
}
</script>

<style lang="scss">
.column {
  display:table-row;
} 
.columns {
  display: table;
  border-collapse: collapse;
}

.is-gapless {
  margin-bottom: 10px;
}
</style>
