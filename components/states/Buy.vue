<template>
<div class="card">
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure v-if="isProperty()" class="image is-48x48" v-bind:style="{ 'background': currentCase.displayColor()}">
        </figure>
        <figure v-else class="image is-48x48">
          <img v-if="isStation()" src="/station.png" alt="station image">
          <img v-else src="/compagny.png" alt="compagny image">
        </figure>

      </div>
      <div class="media-content">
        <p class="title is-4">{{ title }}</p>
        <p class="subtitle is-6" :key="index" v-for="(line, index) of message">{{ line }}</p>
      </div>
    </div>

    <div v-if="isProperty()" class="content">
      <div class="box">
        <table class="table is-striped">
          <tbody>
            <tr>
              <td>Prix d'une maison</td>
              <td>{{ currentCase.housePrice | devise }}</td>
            </tr>
            <tr>
              <td>Prix d'un hôtel</td>
              <td>{{ currentCase.hostelPrice | devise }}</td>
            </tr>
            <tr>
              <td>Hypothèque</td>
              <td>{{ currentCase.mortgage | devise }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="box">
        <table class="table is-striped">
          <tbody>
            <tr>
              <td>Location avec terrain</td>
              <td>{{ currentCase.housePrice | devise }}</td>
            </tr>
            <tr>
              <td>Location avec une maison</td>
              <td>{{ currentCase.rents.with1House | devise }}</td>
            </tr>
            <tr>
              <td>Location avec deux maisons</td>
              <td>{{ currentCase.rents.with2Houses | devise }}</td>
            </tr>
            <tr>
              <td>Location avec trois maisons</td>
              <td>{{ currentCase.rents.with3Houses | devise }}</td>
            </tr>
            <tr>
              <td>Location avec quatre maisons</td>
              <td>{{ currentCase.rents.with4Houses | devise }}</td>
            </tr>
            <tr>
              <td>Location avec un hôtel</td>
              <td>{{ currentCase.rents.withHotel | devise }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isStation()" class="content">
    </div>

    <div v-if="isCompany()" class="content">
    </div>

  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item" @click="play(true)">Acheter ({{ price | devise }})</a>
    <a href="#" class="card-footer-item" @click="play(false)">Passer</a>
  </footer>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { State, namespace } from 'vuex-class'
import { GameState } from '@/core/GameState';
import MonopolyContext from '@/core/MonopolyContext';
import { Station as StationType } from '@/core/Station';
import { Company as CompanyType } from '@/core/Company';
import { Property as PropertyType } from '@/core/Property';
import StationCase from '@/components/Station.vue';
import CompagnyCase from '@/components/Compagny.vue';
import PropertyCase from '@/components/Property.vue';
import { DisplayObject } from '@/core/DisplayObject';
import { Case } from '@/core/Case';

const mp = namespace('monopoly');

@Component({
  components: {
    CompagnyCase,
    PropertyCase,
    StationCase,
  },
  filters: {
    devise: (price: number) => {
      return `${price} €`;
    }
  }
})
export default class Buy extends Vue {
  @mp.Getter getState!: Function;
  @mp.State(state => state.monopoly) monopoly!: MonopolyContext;

  get display(): DisplayObject {
    return this.getState().displayObject();
  }
  
  get title(): string {
    return this.getState().currentCase.name;
  }

  get message(): string {
    return this.getState().displayObject().message;
  }

  get price(): number {
    return this.getState().displayObject().cost || 0;
  }

  get currentCase(): Case {
    return this.getState().currentCase;
  } 

  isStation(): boolean {
    return (this.getState().currentCase instanceof StationType);
  }

  isCompany(): boolean {
    return (this.getState().currentCase instanceof CompanyType);
  }

  isProperty(): boolean {
    return (this.getState().currentCase instanceof PropertyType);
  }

  play(response: boolean) {
    this.monopoly.execute(response);
  }
}
</script>