<template>
<div class="card">
  <img src="~/static/question.jpg">
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Luck extends Vue {
  name: string = 'Chance';
  price: number = 200;
}
</script>
<style scoped>
.card {
  display: table-cell;
  border: solid black 1px;
  height: 150px;
}
</style>