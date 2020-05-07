<template>
  <div>
    {{ placeholder }}
    <div class="field has-addons">
      <p class="control"><a class="button is-info" @click="add">+</a></p>
      <p class="control"><input class="input" disabled type="text" :value="value"></p>
      <p class="control"><a class="button is-info" @click="remove">-</a></p>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class FieldNumber extends Vue {
  @Prop() minValue!: number;
  @Prop() maxValue!: number;
  @Prop() addCallback!: Function;
  @Prop() removeCallback!: Function;
  @Prop() placeholder!: string;

  value: number = this.minValue | 0;

  add() {
    if(this.value >= this.maxValue) {
      this.value = this.maxValue;
    } else {
      this.value++;
    }

    if(this.addCallback) {
      this.addCallback(this.value);
    }
  }

  remove() {
    if(this.value <= this.minValue) {
      this.value = this.minValue;
    } else {
      this.value--;
    }

    if(this.removeCallback) {
      this.removeCallback(this.value);
    }
  }
}
</script>