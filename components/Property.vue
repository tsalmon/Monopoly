<template>
<div class="card">
  <header class="card-header" v-bind:style="{ 'background': getColor() }">
  </header>
  <div class="card-content">
    <p class="title is-7">{{ properties.name }}</p>
    <div class="columns list-players is-gapless is-multiline is-mobile">
    </div>

  </div>
  <footer class="card-footer">
    <div class="card-footer-item tag">{{ properties.price }}</div>
  </footer>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Property as PropertyMonopoly } from '../core/Property';

@Component
export default class Property extends Vue {
  @Prop() properties!: PropertyMonopoly;

  name: string = 'Boulevard de Belleville';
  price: number = 200;

  getColor() {
    if(this.properties.getColor == null) {
      return 'indefini';
    } else {
      return this.properties.getColor();
    }
  }
}
</script>
<style scoped>
.card {
  display: table-cell;
  border: solid black 1px;
  height: 150px;
}

.card-header {
  height: 30px;
}

.card-content {
  text-align: center;
  padding: 0.5rem;
}

.card-footer {
  border-top: none;
  position: absolute;
  text-align: center;
  bottom: 0;
  width: 100%;
}
</style>