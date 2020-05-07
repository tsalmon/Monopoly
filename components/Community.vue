<template>
<div class="card">
  <img src="/community-chest.png">
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class Community extends Vue {
  @Prop() imgPath!: string;
}
</script>
<style scoped>
.card {
  display: table-cell;
  border: solid black 1px;
  height: 150px;
}
</style>