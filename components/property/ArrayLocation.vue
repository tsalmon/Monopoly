<template>
  <table class="table is-striped">
    <tbody>
      <tr>
        <td>Location avec terrain</td>
        <td>{{ property.rents.rent | devise }}</td>
      </tr>
      <tr>
        <td>Location avec une maison</td>
        <td>{{ property.rents.with1House | devise }}</td>
      </tr>
      <tr>
        <td>Location avec deux maisons</td>
        <td>{{ property.rents.with2Houses | devise }}</td>
      </tr>
      <tr>
        <td>Location avec trois maisons</td>
        <td>{{ property.rents.with3Houses | devise }}</td>
      </tr>
      <tr>
        <td>Location avec quatre maisons</td>
        <td>{{ property.rents.with4Houses | devise }}</td>
      </tr>
      <tr>
        <td>Location avec un hôtel</td>
        <td>{{ property.rents.withHotel | devise }}</td>
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
export default class ArrayLocation extends Vue {
  @Prop() property!: Property
}
</script>