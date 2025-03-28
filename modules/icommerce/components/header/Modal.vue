<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'

defineProps( {
  children: {
    type: Boolean
  }
} )

const showModal = ref( false );
</script>

<template>
  <q-layout-header class="tw-h-auto tw-max-h-min">

    <!--    Btn to open-->
    <q-btn
        flat
        round
        dense
        class="open"
        icon="menu"
        @click="showModal = true"
    />

    <!--Modal -->
    <q-dialog v-model="showModal"
              position="fixed"
              transition-show="slide-right"
              transition-hide="slide-left"
              :transition-duration="500"
              class="modal-dialog !tw-h-screen tw-max-w-lg tw-animate-fade-in"
    >
      <q-card class="q-pa-md !tw-overflow-x-hidden tw-w-full !tw-h-screen !tw-max-h-none tw-p-0" >

        <q-card-actions align="right" class="tw-mb-10 tw-border-b tw-border-b-gray-300 tw-px-5 tw-pt-5">

          <!--  Btn Close   -->
          <q-btn
              round
              dense
              color="primary"
              icon="close"
              size="sm"
              outline
              @click="showModal = false"
          />
        </q-card-actions>

        <q-card-section class="q-pt-none">

          <!--  Render Children   -->
          <slot></slot>

        </q-card-section>

      </q-card>
    </q-dialog>
  </q-layout-header>
</template>

<style>
    .modal-dialog .q-dialog__inner {
      padding: 0;
    }

    .close i.q-icon, .open i.q-icon{
       font-size: 24px !important;
    }
</style>