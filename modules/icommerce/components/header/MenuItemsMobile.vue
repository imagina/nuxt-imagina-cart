<script setup>
import { defineProps } from "vue";

defineProps( {
  items: {
    type: Object,
    required: true
  }
} );
</script>

<template>
  <q-expansion-item
      v-for="item in items"
      class="expansion-item tw-ml-3 tw-max-w-md tw-my-3 tw-text-[15px]"
      :label="item.label"
      :expand-icon="item.items? 'fa-solid fa-angle-down' : 'null' "
      dense
      :href="item.to"
  >

    <!--    Call Recursive Component if has children items     -->
    <MenuItemsMobile
        v-if="item.items"
        :items="item.items"
    />

  </q-expansion-item>
</template>

<style>
    .modal-dialog .q-expansion-item .q-icon{
      display: block;
      font-size: 19px;
    }

    .q-expansion-item__toggle-icon--rotated{
      color: #dc3545;
    }
</style>