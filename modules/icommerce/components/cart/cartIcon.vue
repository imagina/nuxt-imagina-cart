<template>
	<NuxtLink to="/cart">
		<q-btn
			unelevated
			round
			icon="o_shopping_cart"
			:text-color="color"
			@mouseover="isHovered = true"
  			@mouseleave="isHovered = false"
		>
			<ClientOnly>
				<q-badge
					v-if="cartState?.products.length || false"
					floating
					rounded
					:class="{ 'hover-active': isHovered }"
				>
						{{ cartState.products.length }}
				</q-badge>
			</ClientOnly>
		</q-btn>
	</NuxtLink>

</template>
<script setup>
import { useStorage } from '@vueuse/core'

const props = defineProps({
  color: String
});

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})
const isHovered = ref(false);

</script>
<style>
.hover-active {
  background-color: #F9BA48 !important;
}
</style>