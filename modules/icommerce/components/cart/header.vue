<template>  
  <div
    class="
        tw-bg-[#101923] 
        tw-text-white
        tw-bg-white
    "
  >
    <div class="
        tw-min-h-[60px] 2xl:tw-px-20 xl:tw-px-4 sm:tw-px-2
        tw-px-4 tw-flex tw-items-center tw-justify-between relative
      ">

      <!-- LOGO -->
      <div class="lg:tw-w-1/12 tw-relative tw-order-1">
        <NuxtLink to="https://www.imaginacolombia.com/"
        >
          <img
              :src="redLogo"
              alt="Logo"
              class="tw-w-10 tw-min-w-10 tw-cursor-pointer"
          />
        </ NuxtLink>
      </div>

      <!-- BOTONES DE CUENTA, CARRITO, THEME TOGGLE -->
      <section class="
        tw-flex tw-items-center tw-justify-end lg:tw-w-3/12 xl:tw-w-3/12
        tw-min-w-max tw-relative tw-order-2
      ">

      <!-- Buttons Group-->        
      <headerButtons />        
      </section>

    </div>
</div>

</template>

<script setup>

import redLogo from '../../assets/img/red-logo-imagina.png'
import headerButtons from "./headerButtons.vue";

</script>
<style>
.dropdown-sign-in > span > i {
  font-size: 11px !important;
}
</style>