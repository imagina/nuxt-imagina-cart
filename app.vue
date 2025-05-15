<script setup lang="ts">

import Clarity from '@microsoft/clarity';

const projectId = "rk16tnm12v"

onBeforeMount(() => {
  Clarity.init(projectId);
})



useSeoMeta({
  title: 'Páginas Web - Hosting y Registro de Dominios',
  description: 'Lideres en Hosting y registro de Dominios en Colombia. Mayor rendimiento al mejor precio. 15 años de experiencia más de 10.000 clientes confían en nosotros. Asesores en Bogotá, Ibagué  y Medellín.',  
  ogTitle: 'Páginas Web - Hosting y Registro de Dominios | Imagina Colombia',  
  ogDescription: 'Lideres en Hosting y registro de Dominios en Colombia. Mayor rendimiento al mejor precio. 15 años de experiencia más de 10.000 clientes confían en nosotros. Asesores en Bogotá, Ibagué  y Medellín.',
  ogImage: 'https://www.imaginacolombia.com',
  twitterCard: 'summary_large_image',
})
</script>
<template>
	<NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
