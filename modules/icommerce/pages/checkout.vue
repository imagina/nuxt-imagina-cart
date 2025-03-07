<template>
        <div class="tw-flex">

            <div v-for="product in cartState.products" >
                <q-btn
                    :label="product.id"
                    @click="removeProduct(product)"
                />


            </div>

        </div>

</template>
<script setup>

import { useStorage } from '@vueuse/core'

const cartState = useStorage('cart', {products: []})
const router = useRouter()

function removeProduct(product){
    const products = cartState.value.products.filter(obj => obj.id != product.id);
    cartState.value = {products: products}

    if(cartState.value.products.length == 0){
        router.push({ path: '/commerce/products'})
    }
}


</script>