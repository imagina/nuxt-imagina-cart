<template>
  
  
    <component
      v-if="getBannerComponent(category)"
      :is="getBannerComponent(category)?.component">
    </component>
 
</template>
<script setup>

import hostingWindowsAsp from './categories/hostingWindowsAsp.vue';
import hostingIpanelPhp from './categories/hostingIpanelPhp.vue';
import hostingCpanel from './categories/hostingCpanel.vue';
import hostingCpanelFree from './categories/hostingCpanelFree.vue';
import resellerHosting from './categories/resellerHosting.vue';
 

const props = defineProps( {
  category: {
    type: Object
  }
} )

const banners = [
  {
    //hosting-cpanel => Hosting Cpanel (PHP)
    id: 1, component: hostingCpanel
  },
  {
    //hosting-con-dominio-gratuito => Hosting Cpanel (PHP)
    id: 32, component: hostingCpanelFree
  },
  {
    //hosting-linux-php => Hosting Ipanel PHP
    id: 49, component: hostingIpanelPhp
  },
  {
    //hosting-windows-asp
    id: 2, component: hostingWindowsAsp
  },
  {
    //hosting-multi-dominio-para-revendedores-disenadores
    id: 4, component: resellerHosting
  }

]



function getBannerComponent(category){
  return banners.find(x => x.id == category.id) || false
}

</script>
<style>
.banner-page-hosting {
  background-color: #f5f5f5;
  background-size: cover;
  position: relative;
}

.banner-page-hosting::after, .banner-page-hosting::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
}

.banner-page-hosting::before {
	border-radius: 20px;
	background-clip: border-box;
	-webkit-background-clip: padding-box;
  background: linear-gradient(90deg,#212023 20%,hsla(0,0%,100%,0));
  z-index: 1;
}
</style>