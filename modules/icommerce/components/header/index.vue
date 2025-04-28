<template>
  <ClientOnly>
  <header
      :class="[
      'tw-sticky tw-top-0 tw-z-50 tw-border-b tw-border-gray-200',
      isScrolled ? 'tw-bg-[#101923] tw-text-white' : 'tw-bg-white'
    ]"
  >
    <div class="
        tw-min-h-[60px] tw-mx-auto 2xl:tw-px-20 xl:tw-px-10 sm:tw-px-5
        tw-px-2 tw-py-3 tw-flex tw-items-center tw-justify-between relative
      ">

      <!-- LOGO -->
      <div class="lg:tw-w-1/12 2xl:tw-w-3/12 tw-relative tw-order-1">
        <NuxtLink to="/"
        >
          <img
              :src="logoSrc"
              alt="Logo"
              class="tw-w-10 tw-min-w-10 tw-cursor-pointer"
          />
        </ NuxtLink>
      </div>

      <!-- MENÚ DE NAVEGACIÓN -->
      <div class="
        tw-flex justify-end lg:tw-justify-center tw-w-full tw-pl-4 lg:tw-px-5
        tw-relative tw-order-1
      ">
        <Navbar v-model="isMobile" :nav-items="navItems" :is-scrolled="isScrolled" />
      </div>

      <!-- BOTONES DE CUENTA, CARRITO, THEME TOGGLE -->
      <section class="
        tw-flex tw-items-center tw-justify-end lg:tw-w-3/12 xl:tw-w-4/12
        tw-min-w-max tw-relative tw-order-2
      ">
      <div class="tw-mx-4">
        <LocaleSelector 
         :dark="isScrolled"
        />
      </div>

      <!--       Buttons Group-->
        <NavbarButtons v-if="!isMobile" :scroll-position="scrollPosition" :is-scrolled="isScrolled"/>

        <!--    Cart Component -->
        <div class="tw-pl-1 tw-relative tw-order-3">
          <cartComponent
              :color="isScrolled ? 'white' : 'black'"
          />
        </div>

      </section>

    </div>
  </header>
</ClientOnly>
</template>

<script setup>
import {ref, computed} from 'vue'
import Navbar from './Navbar.vue'
import cartComponent from '../cart'
import whiteLogo from '../../assets/img/white-logo-imagina.png'
import redLogo from '../../assets/img/red-logo-imagina.png'
import NavbarButtons from "./NavbarButtons.vue";

const props = defineProps( {
  scrollPosition: Object
} );

const isScrolled = computed( () => props.scrollPosition?.position > 0 );
const logoSrc = computed( () =>
    isScrolled.value
        ? whiteLogo
        : redLogo
);

const isMobile = ref(false);

const navItems = ref([
  { 
    label: 'Imagina', 
    items: [
      { 
        label: 'Conócenos', 
        to: '/conocenos' 
      },
      { 
        label: 'Historia', 
        to: '/historia' 
      },
      { 
        label: 'Únete a nuestro equipo', 
        to: '/trabaja-con-nosotros' 
      },
      { 
        label: 'Trabajos realizados', 
        to: '/trabajos-realizados' 
      }
    ]
  },
  {
    label: 'Hosting',
    items: [
      { 
        label: 'Hosting Linux / PHP - iPanel', 
        to: '/servicios/servicio-1' 
      },
      { 
        label: 'Hosting cPanel', 
        to: 'commerce/products' 
      },
      { 
        label: 'CDN premium', 
        to: 'commerce/products' 
      },
      { 
        label: 'S3 Wasabi', 
        to: 'commerce/products' 
      },
      { 
        label: 'Hosting Windows / ASP', 
        to: 'commerce/products' 
      },
      { 
        label: 'Hosting Laravel', 
        to: 'commerce/products' 
      },
      { 
        label: 'Aplicaciones', 
        items: [
          {
            label: 'Hosting Wordpress', 
            to: 'commerce/products' 
          },
          {
            label: 'Hosting Moodle', 
            to: 'commerce/products' 
          },
          {
            label: 'Hosting PHP 8', 
            to: 'commerce/products' 
          },
          {
            label: 'Hosting Magento', 
            to: 'commerce/products'
          }
        ]
      },
      { 
        label: 'Hosting Revendedores', 
        to: 'commerce/products' 
      },
      { 
        label: 'Servidores Privados VPS', 
        items: [
          {
            label: 'Servidores VPS SSD', 
            to: 'commerce/products' 
          },
          {
            label: 'Servidores VPS Cloud', 
            to: 'commerce/products'
          }
        ]
      },
      { 
        label: 'Servidores Dedicados', 
        to: 'commerce/products' 
      },
      { 
        label: 'Streaming de audio en vivo', 
        to: 'commerce/products' 
      },
      { 
        label: 'Email', 
        items: [
          {
            label: 'Google Workspace - GSuite', 
            to: 'commerce/products' 
          },
          {
            label: 'Correos corporativos Office', 
            to: 'commerce/products' 
          }
        ]
      },
    ]
  },
  { label: 'Dominios', to: '/' },
  { label: 'Seguridad', to: '/' },
  { label: 'Soluciones Web', to: '/' },
  { label: 'Diseño', to: '/' },
  { label: '', to: '/' },
  { label: 'Clientes', to: '/' },
  { label: 'Blog', to: '/' },
])
</script>
<style>
.dropdown-sign-in > span > i {
  font-size: 11px !important;
}
</style>