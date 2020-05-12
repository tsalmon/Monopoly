<template>
  <table class="table is-striped">
    <tbody>
      <tr>
        <td>Prix d'une maison</td>
        <td>{{ property.housePrice | devise }}</td>
      </tr>
      <tr>
        <td>Prix d'un hôtel</td>
        <td>{{ property.hostelPrice | devise }}</td>
      </tr>
      <tr>
        <td>Hypothèque</td>
        <td>{{ property.mortgage | devise }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Property } from '@/core/Property'
import { Prop } from 'vue-property-decorator'

@Component
export default class ArrayPrice extends Vue {
  @Prop() property!: Property
}
</script>
