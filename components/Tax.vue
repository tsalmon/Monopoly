<template>
<div class="card">
  <img :src="imgPath" >
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Luck extends Vue {
  @Prop() imgPath!: string;
}
</script>
<style scoped>
.card {
  display: table-cell;
  border: solid black 1px;
  height: 150px;
}

.jail {
  height: 100px;
  float: right;
}
</style>