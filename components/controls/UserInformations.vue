<template>
  <nav class="panel" id="userinformations">
    <p class="panel-heading">
      {{ currentPlayer.name }}
    </p>
    <p class="panel-tabs">
      <a @click="selectallList" v-if="!listsIsEmpty()">Tout</a>
      <a @click="selectPropertiesList" v-if="!listIsEmpty(properties)">Propriétés</a>
      <a @click="selectStationsList" v-if="!listIsEmpty(stations)">Gares</a>
      <a @click="selectCompagniesList" v-if="!listIsEmpty(compagnies)">Entreprise</a>
    </p>
    <a class="panel-block is-active">
      <a class="panel-icon icon is-large">
        <font-awesome-icon :class="`icon is-large`" :icon="['fa', 'money-bill-wave']" />
      </a>
      {{ cash }} €
    </a>
    <a v-for="(realEstate, index) of list" :key="index" class="card">
      <div class="card-image">
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure v-if="realEstate.isProperty()" class="image is-48x48" v-bind:style="{ 'background': realEstate.displayColor()}">
            </figure>
            <figure v-else class="image is-48x48">
              <img v-if="realEstate.isStation()" src="/station.png" alt="station image">
              <img v-else src="/compagny.png" alt="compagny image">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{{ realEstate.name }}</p>
            <p class="subtitle is-6"> {{ realEstate.displayStateProperty() }} </p>
          </div>
        </div>
        <div v-if="realEstate.isProperty()" class="content">
          <div class="box">
            <ArrayPrice :property="realEstate" />
          </div>
          <div class="box">
            <ArrayLocation :property="realEstate" />
          </div>
        </div>

        <div v-if="realEstate.isStation()" class="content">
        </div>

        <div v-if="realEstate.isCompany()" class="content">
        </div>

      </div>
    </a>
  </nav>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'

import { GameState } from '@/core/GameState';
import { Case } from '@/core/Case';
import { Player } from '@/core/Player';
import { RealEstate } from '@/core/RealEstate';

import FieldNumber from '@/components/form/FieldNumber.vue';
import ArrayLocation from '@/components/property/ArrayLocation.vue';
import ArrayPrice from '@/components/property/ArrayPrice.vue';

const mp = namespace('monopoly');

@Component({
  components: {
    FieldNumber,
    ArrayLocation,
    ArrayPrice,
  },
})
export default class UserInformations extends Vue {
  @mp.Getter currentPlayer!: Player;
  list: RealEstate[] = [];

  listIsEmpty(listRealEstate: RealEstate[]): boolean {
    return listRealEstate.length === 0;
  }

  get properties() {
    return this.currentPlayer.getProperties();
  }

  get stations() {
    return this.currentPlayer.getStations();
  }

  get compagnies() {
    return this.currentPlayer.getCompagnies();
  }

  get cash() {
    return this.currentPlayer.getCash();
  }

  listsIsEmpty() {
    return this.listIsEmpty(this.properties)
      && this.listIsEmpty(this.compagnies)
      && this.listIsEmpty(this.stations);
  }

  selectallList() {
    this.list = [];

    for(let property of this.properties) {
      this.list.push(property);
    }

    for(let compagny of this.compagnies) {
      this.list.push(compagny);
    }

    for(let station of this.stations) {
      this.list.push(station);
    }
  }

  selectPropertiesList() {
    this.list = this.properties;
  }

  selectStationsList() {
    this.list = this.stations;
  }

  selectCompagniesList() {
    this.list = this.compagnies;
  }
}
</script>
<style scoped>
.panel {
  max-height: 1200px;
  overflow-y: auto;
}
</style>