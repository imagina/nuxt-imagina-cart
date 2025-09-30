<template>      
<client-only>
    <q-select
          v-if="showCurrencies()"
          :label="$t('icommerce.cart.currency')"        
          class="md:tw-w-[240px] tw-bg-white tw-bg-white
        tw-border-[1px]
        tw-rounded-[14px]
        tw-border-[#d8dae0]
        "
          v-model="cartState.currency"
          :options="currencies"
          emit-value
          map-options									
          outlined
          dense								
      />     
      </client-only> 
</template>
<script setup>
import productsHelper from '../../helpers/products'

 const cartState = useState('icommerce.cart')

const currencies = productsHelper.getCurrencies() 

function showCurrencies() {
    const usd = productsHelper.getTrm('COP')
    if(!usd){
        cartState.value.currency = 'COP'
        return false
    }
    return true 
}






</script>
