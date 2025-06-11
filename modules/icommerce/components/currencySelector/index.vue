<template>    
	<q-select
        v-if="showCurrencies()"
        :label="$t('icommerce.cart.currency')"        
        class="md:tw-w-[240px] tw-bg-white"
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

/*
 const cartState = useState('icommerce.shoppingCart', () => {
  return {
    products: [],
	  currency: 'COP'
  }
})
  */
 const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})

const currencies = computed(() => productsHelper.getCurrencies())  

function showCurrencies() {
    const usd = productsHelper.getTrm('COP')
    if(!usd){
        cartState.value.currency = 'COP'
        return false
    }
    return true 
}




</script>
