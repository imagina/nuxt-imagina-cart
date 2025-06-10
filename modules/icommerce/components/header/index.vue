<template>  
  <header
      :class="[
      'tw-sticky tw-top-0 tw-z-50 tw-border-b tw-border-gray-200',
      isScrolled ? 'tw-bg-[#101923] tw-text-white' : 'tw-bg-white'
    ]"
  >
    <div class="
        tw-min-h-[60px] 2xl:tw-px-20 xl:tw-px-4 sm:tw-px-2
        tw-px-2 tw-flex tw-items-center tw-justify-between relative
      ">

      <!-- LOGO -->
      <div class="lg:tw-w-1/12 tw-relative tw-order-1">
        <NuxtLink to="https://www.imaginacolombia.com/"
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
        tw-flex justify-end lg:tw-justify-center tw-w-full tw-pl-4 xl:tw-px-5
        tw-relative tw-order-1
      ">
      
        
        <Navbar :nav-items="navItems" :is-scrolled="isScrolled" />      
      </div>

      <!-- BOTONES DE CUENTA, CARRITO, THEME TOGGLE -->
      <section class="
        tw-flex tw-items-center tw-justify-end lg:tw-w-3/12 xl:tw-w-3/12
        tw-min-w-max tw-relative tw-order-2
      ">
      <div class="tw-mx-4">
        <LocaleSelector 
         :dark="isScrolled"
        />
      </div>

      <!--       Buttons Group-->
        
        <NavbarButtons :scroll-position="scrollPosition" :is-scrolled="isScrolled"/>
        

        <!--    Cart Component -->
        <div class="tw-pl-1 tw-relative tw-order-3">
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
import cartComponent from '../cart/cartIcon'
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
        to: 'https://www.imaginacolombia.com/empresa/sobre-nosotros' 
      },
      { 
        label: 'Historia', 
        to: 'https://www.imaginacolombia.com/empresa' 
      },
      { 
        label: 'Únete a nuestro equipo', 
        to: 'https://www.imaginacolombia.com/empresa/trabaja-con-nosotros' 
      },
      { 
        label: 'Trabajos realizados', 
        to: 'https://www.imaginacolombia.com/trabajos-realizados' 
      }
    ]
  },
  {
    label: 'Hosting',
    items: [
      { 
        label: 'Hosting Linux / PHP - iPanel', 
        to: "https://www.imaginacolombia.com/hosting-linux-php",
      },
      { 
        label: 'Hosting cPanel', 
        to: "https://www.imaginacolombia.com/hosting-cpanel",
      },
      { 
        label: 'CDN premium', 
        to: "https://www.imaginacolombia.com/cdn-premium",
      },
      { 
        label: 'S3 Wasabi', 
        to: "https://www.imaginacolombia.com/s3-wasabi",
      },
      { 
        label: 'Hosting Windows / ASP', 
        to: "https://www.imaginacolombia.com/hosting-windows-asp",
      },
      { 
        label: 'Hosting Laravel', 
        to: "https://www.imaginacolombia.com/hosting-laravel",
      },
      { 
        label: 'Aplicaciones', 
        items: [
          {
            label: 'Hosting Wordpress', 
            to: "https://www.imaginacolombia.com/hosting-wordpress",
          },
          {
            label: 'Hosting Moodle', 
            to: "https://www.imaginacolombia.com/hosting-moodle",
          },
          {
            label: 'Hosting PHP 8', 
            to: "https://www.imaginacolombia.com/hosting-php-8",
          },
          {
            label: 'Hosting Magento', 
            to: "https://www.imaginacolombia.com/hosting-magento",
          }
        ]
      },
      { 
        label: 'Hosting Revendedores', 
        to: "https://www.imaginacolombia.com/planes-revendedores",
      },
      { 
        label: 'Servidores Privados VPS', 
        items: [
          {
            label: 'Servidores VPS SSD', 
            to: "https://www.imaginacolombia.com/servidores-virtuales-privados/vps-ssd",
          },
          {
            label: 'Servidores VPS Cloud', 
            to: "https://www.imaginacolombia.com/servidores-virtuales-privados/vps-cloud-ceph",
          }
        ]
      },
      { 
        label: 'Servidores Dedicados', 
        to: "https://www.imaginacolombia.com/servidores-dedicados",
      },
      { 
        label: 'Streaming de audio en vivo', 
        to: "https://www.imaginacolombia.com/streaming-de-audio-en-vivo",
      },
      { 
        label: 'Email', 
        items: [
          {
            label: 'Google Workspace - GSuite', 
            to: "https://www.imaginacolombia.com/gsuite",
          },
          {
            label: 'Correos corporativos Office 365', 
            to: "https://www.imaginacolombia.com/correos-corporativos-office-365",
          }
        ]
      },
    ]
  },
  { 
    label: 'Dominios', 
    to: 'https://www.imaginacolombia.com/dominios'
  },
  { 
    label: 'Seguridad', 
    items: [
      {
        label: 'Certificados SSL',
        to: 'https://www.imaginacolombia.com/certificados-ssl'
      },
      {
        label: 'SiteLock Escáner de seguridad',
        to: 'https://www.imaginacolombia.com/seguridad-web/sitelock-detector-de-malware-certificado'
      }
      
    ] 
  },
  { 
    label: 'Soluciones Web', 
    items: [
      {
        label: 'Marketing Digital',
        items: [
          {
            label: 'Community Manager',
            to: "https://www.imaginacolombia.com/marketing-digital/community-manager",
          },
          {
            to: "https://www.imaginacolombia.com/marketing-digital/google-adwords",
            label: "Google / YouTube Adwords"
          },
          {
            to: "https://www.imaginacolombia.com/marketing-digital/facebook-ads",
            label: "Facebook Instagram Ads"
          },
          {
            to: "https://www.imaginacolombia.com/marketing-digital/posicionamiento-natural-seo",
            label: "Posicionamiento Natural Seo"
          },
        ]
      },
      {
        label: 'Páginas web', 
        items: [
          {
            to: "https://www.imaginacolombia.com/paginas-web/empresas",
              label: "Planes Para Empresas / Corporativo"
            },
          {
            to: "https://www.imaginacolombia.com/paginas-web/negocios",
            label: "Planes Para Negocios"
          },
        ]
      },
      {
        to: "https://www.imaginacolombia.com/apps",
        label: "Apps"
      },
      {
        to: "https://www.imaginacolombia.com/paginas-web/tiendas-virtuales",
        label: "Tiendas virtuales"
      },
      {
        to: "https://www.imaginacolombia.com/soluciones-web/planes-de-administracion-de-contenidos",
        label: "Administrador de Contenido"
      },
    ] 
  },
  { 
    label: 'Diseño', 
    items: [
      {
        to: "https://www.imaginacolombia.com/identidad-visual",
        label: "Identidad visual"
      },
      {
        to: "https://www.imaginacolombia.com/diseno-grafico",
        label: "Diseño Gráfico"
      },
    ]
   },
  {
    to: "https://www.imaginacolombia.com/contacto",
    label: "Contacto"
  },
  { 
    label: 'Clientes', 
    items: [
      {
        to: "https://clientes.imaginacolombia.com/",
        label: "Panel de control"
      },
      {
        to: "https://www.imaginacolombia.com/guias-de-usuario",
        label: "Guias de usuario"
      },
      {
        to: "https://www.imaginacolombia.com/afiliados",
        label: "Programa de Afiliados"
      },
      {
        to: "https://www.imaginacolombia.com/formas-de-pago",
        label: "Formas de Pago"
      },
    ]
   },
  { label: 'Blog', 
    to: "https://www.imaginacolombia.com/blog"
  },
])
</script>
<style>
.dropdown-sign-in > span > i {
  font-size: 11px !important;
}
</style>