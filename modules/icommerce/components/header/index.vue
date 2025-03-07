<template>
  <header :class="[
      'tw-sticky tw-top-0 tw-z-50 tw-border-b tw-border-gray-200',
      isScrolled ? 'tw-bg-gray-900' : 'tw-bg-white'
      ]">
    <div class="tw-max-w-7xl tw-min-h-[60px] tw-mx-auto tw-px-4 tw-py-3 tw-flex tw-items-center tw-justify-between">

      <!-- LOGO -->
      <div>logo</div>

      <!-- MENÚ DE NAVEGACIÓN -->
      <Navbar :menu-items="navItems"/>


      <!-- BOTONES DE CUENTA, CARRITO, THEME TOGGLE -->
      <div class="tw-flex tw-items-center tw-space-x-4">
        Login
      </div>
      <cartComponent 
        :color="isScrolled ? 'white' : 'black'"
      />

    </div>
  </header>
</template>

<script setup>
import {ref, computed} from 'vue'
import Navbar from './Navbar.vue'
import cartComponent from '../cart'

const props = defineProps({
  scrollPosition: Object
});

const isScrolled = computed(() => props.scrollPosition?.position > 0);

const navItems = ref([
  {label: 'Inicio', to: '/'},
  {
    label: 'Servicios',
    items: [
      {label: 'Servicio 1', to: '/servicios/servicio-1'},
      {
        label: 'Servicio 2',
        items: [
          {label: 'Sub Servicio 2.1', to: '/servicios/servicio-2/sub1'}
        ]
      }
    ]
  },
  {label: 'Contacto', to: '/contacto'}
])
</script>