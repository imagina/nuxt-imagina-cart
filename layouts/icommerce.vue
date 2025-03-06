<template>
    <q-layout view="hHh lpR fFf" @scroll="handleScroll">
			<q-page-container>
          <HeaderApp :scroll-position="scrollPosition" />
					<slot />
			</q-page-container>
    </q-layout>
</template>
<script setup>
import { ref } from 'vue';
import HeaderApp from '../modules/icommerce/components/header/index.vue';

const scrollPosition = ref(null);

function handleScroll(position) {
  scrollPosition.value = position;
}
</script>