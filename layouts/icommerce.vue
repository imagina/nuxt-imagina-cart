<template>
    <q-layout view="hHh lpR fFf" @scroll="handleScroll">
			<q-page-container>
						<HeaderApp :scroll-position="scrollPosition" />
						<BreadCrumb />
						<slot />
						<FooterApp />
			</q-page-container>
    </q-layout>
</template>
<script setup>
import { ref } from 'vue';
import HeaderApp from '../modules/icommerce/components/header';
import FooterApp from '../modules/icommerce/components/footer';
import BreadCrumb from '../modules/icommerce/components/breadcrumb';

const scrollPosition = ref(null);

function handleScroll(position) {
  scrollPosition.value = position;
}
</script>