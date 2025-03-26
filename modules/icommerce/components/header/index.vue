<template>
  <header 
    :class="[
      'tw-sticky tw-top-0 tw-z-50 tw-border-b tw-border-gray-200',
      isScrolled ? 'tw-bg-[#101923] tw-text-white' : 'tw-bg-white'
    ]"
  >
    <div 
      class="
        
        tw-min-h-[60px] 
        tw-mx-auto 
        tw-px-4 
        tw-py-3 
        tw-flex 
        tw-items-center 
        tw-justify-between
      "
    >
      <!-- LOGO -->
      <img
        :src="logoSrc" 
        alt="Logo" 
        class="tw-w-[38px]"
      />

      <!-- MENÚ DE NAVEGACIÓN -->
      <Navbar :nav-items="navItems" :is-scrolled="isScrolled" />

      <!-- BOTONES DE CUENTA, CARRITO, THEME TOGGLE -->
      <section class="tw-flex tw-items-center">
        <div 
          class="
            tw-flex 
            tw-flex-col 
            tw-items-start
            tw-pr-4
            tw-border-r
            tw-border-[#10192333]
            hover:tw-text-[#DC3545]
          "
          :class="{
            'hover:tw-text-[#DC3545]': !isScrolled,
            'hover:tw-text-[#F9BA48]': isScrolled
          }"
        >

          <!-- loggin -->
          <q-btn-dropdown 
            v-if="authStore.isLogged()"
            :label="user.fullName"
            flat
            no-caps
            padding="0"
            dropdown-icon="fa-solid fa-angle-down"
            class="
              dropdown-sign-in
              tw-text-[15px]
            "
          >
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>
                    <NuxtLink           
                      :to="{ path: getPath('iauth.logout'), query: {redirectTo: 'icommerce.products'} }"
                      class="dropdown-sign-in tw-text-[15px]"
                    >
                    Cerrar sesion 
                    </NuxtLink>                  
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>


          <NuxtLink
            v-if="!authStore.isLogged()"
            :to="{ path: getPath('iauth.login'), query: {redirectTo: 'icommerce.products'} }"
            class="dropdown-sign-in tw-text-[15px]"
          >
            Iniciar sesión
          </NuxtLink>
          <!-- /loggin -->

        </div>
        <div class="tw-pl-4">
          <NuxtLink 
            :to="getPath('icommerce.products')"
            class="
              tw-text-[15px]
              tw-cursor-pointer
            "
            :class="{
              'hover:tw-text-[#DC3545]': !isScrolled,
              'hover:tw-text-[#F9BA48]': isScrolled
            }"
          >
            Ir a Tienda
          </NuxtLink>
          <cartComponent 
            :color="isScrolled ? 'white' : 'black'"
          />
        </div>
      </section>
    </div>
  </header>
</template>

<script setup>
import {ref, computed} from 'vue'
import Navbar from './Navbar.vue'
import cartComponent from '../cart'
import whiteLogo from '../../assets/img/white-logo-imagina.png'
import redLogo from '../../assets/img/red-logo-imagina.png'

const authStore = useAuthStore()

const user = computed(() => authStore.user)

const props = defineProps({
  scrollPosition: Object
});

const isScrolled = computed(() => props.scrollPosition?.position > 0);
const logoSrc = computed(() => 
  isScrolled.value 
    ? whiteLogo 
    : redLogo
);

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