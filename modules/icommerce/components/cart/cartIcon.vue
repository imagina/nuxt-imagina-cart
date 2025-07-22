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
					v-if="showCart"
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

const props = defineProps({
  color: String
});

const cartState = useState('icommerce.cart', () => {
	return {
		products: [],
		currency: 'COP'
	}
})
const isHovered = ref(false);
const showCart = computed(() => cartState.value.products.length || false)

</script>
<style>
.hover-active {
  background-color: #F9BA48 !important;
}
</style>