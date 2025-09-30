<template>    
    <div >
	<ClientOnly>
		<bitrixSupportButton />
		<googleTag />
	</ClientOnly>	
    
    <q-layout view="hHh lpR fFf" @scroll="handleScroll">
        <div  class="tw-flex tw-flex-col tw-h-screen">
            <headerComponent :scroll-position="scrollPosition" />
            <slot />
        </div>
    </q-layout>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import bitrixSupportButton from '~/components/bitrixSupportButton.vue';
import googleTag from '~/components/googleTag.vue';
import headerComponent from '../components/cart/header.vue';


const scrollPosition = ref(null);

function handleScroll(position) {
	if(position.position != scrollPosition.value){
		scrollPosition.value = position;
	}  
} 

</script>