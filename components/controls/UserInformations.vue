<template>
  <section class="section">
    UserInformations
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import FieldNumber from '@/components/form/FieldNumber.vue';
import { GameState } from '../../core/GameState';
import { Case } from '../../core/Case';
import { Player } from '../../core/Player';

const mp = namespace('monopoly');

@Component({
  components: {
    FieldNumber,
  },
})
export default class UserInformations extends Vue {
  @mp.Getter currentPlayer!: Player;
}
</script>