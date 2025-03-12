<template>
	<NuxtLink to="/commerce/checkout">
		<q-btn
			unelevated
			round
			icon="o_shopping_cart"
			:text-color="color"
			@mouseover="isHovered = true"
  			@mouseleave="isHovered = false"
		>
			<q-badge
				v-if="cartState.products.length"
				floating
				rounded
				:class="{ 'hover-active': isHovered }"
			>
					{{ cartState.products.length }}
			</q-badge>
		</q-btn>
	</NuxtLink>

</template>
<script setup>
import { useStorage } from '@vueuse/core'

const props = defineProps({
  color: String
});

const cartState = useStorage('cart', {products: []})


const isHovered = ref(false);


</script>
<style>
.hover-active {
  background-color: #F9BA48 !important;
}
</style>