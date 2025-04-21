<template>
	<q-select
        :label="$t('icommerce.cart.currency')"
        class="tw-w-[240px] tw-bg-white"
        v-model="cartState.currency"
        :options="currencies"
        emit-value
        map-options									
        outlined
        dense								
    />
</template>
<script setup>
import { useStorage } from '@vueuse/core'
import productsHelper from '../../helpers/products'

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})

const currencies = computed(() => productsHelper.getCurrencies())  

</script>
