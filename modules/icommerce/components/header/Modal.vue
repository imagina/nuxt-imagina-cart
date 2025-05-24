<script setup>
import { ref } from 'vue'
import { defineProps } from 'vue'
import completedLogo from "../../assets/img/logo-imagina-completo-white.png";
import CategoriesMobileComponent from '../../components/categoriesMobile';

defineProps( {
  children: {
    type: Boolean
  }
} )

const showModal = ref( false );
</script>

<template>
  

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
              position="left"
              transition-duration="100"
              class="modal-dialog !tw-h-screen tw-max-w-lg"    >
      <q-card class="q-pa-md !tw-overflow-x-hidden tw-w-full !tw-h-screen !tw-max-h-none tw-p-0" >        

        <q-card-section class="tw-mb-8 tw-border-b tw-border-b-gray-300 tw-pt-2 !px-0 tw-bg-secondary tw-flex tw-justify-between tw-items-center">

          <!--        Render image  -->
          <q-card-section>
               <div class=" tw-flex tw-justify-center tw-items-center">
           <img :src="completedLogo" :alt="completedLogo" class="tw-w-52" />
         </div>
          </q-card-section>

          <!--  Btn Close   -->
          <q-card-actions align="right" >
            <q-btn
                flat
                color="white"
                label="Cerrar"
                icon="close"
                size="md"
                class="tw-font-semibold"
                @click="showModal = false"
            />

          </q-card-actions>

        </q-card-section>

        <q-card-section class="q-pt-none">

          <!--  Render Children   -->
          <slot></slot>

        </q-card-section>

        <q-card-section>
          <CategoriesMobileComponent/>
        </q-card-section>

      </q-card>
    </q-dialog>
  
</template>

<style>
    .modal-dialog .q-dialog__inner {
      padding: 0;
    }

    .close i.q-icon, .open i.q-icon{
       font-size: 24px !important;
    }
</style>