<template>    
    <div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8">
        <div class="tw-grid tw-grid-cols-1">
            <div>
                <!--title -->
                <div class="tw-flex tw-justify-between tw-items-center tw-mb-7">
                    <h1 class="tw-text-4xl tw-font-bold">Tu Carrito</h1>
                    <!-- currency -->
                    <div>
                        <div class="tw-flex tw-items-center">
                            <span>Currency:&nbsp;</span>
                            <q-radio v-model="currency" val="cop" label="Colombian peso" />
                            <q-radio v-model="currency" val="usd" label="USD" />
                        </div>
                    </div>
                </div>
                <!-- products -->
                <div v-if="showCart">
                    <ProductsComponent 
                        :products="cartState.products"
                        @removeProduct="(product) => removeProduct(product)"
                    />                            
                </div>
                <div v-else>
                    <span>
                        <span>Your car is empty</span>
                        <p>
                            Looks like you have not added anything to your cart. Go ahead & explore our products.
                        </p>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStorage } from '@vueuse/core'
import ProductsComponent from '../components/checkout/products.vue'

const cartState = useStorage('cart', {products: []})
const router = useRouter()

const currency = ref()

const showCart = computed(() => cartState.value?.products?.length ||  false)

onMounted(() => {
    init()
})

function init(){}

function removeProduct(product){
    const products = cartState.value.products.filter(obj => obj.id != product.id);
    cartState.value = {products: products}

    if(cartState.value.products.length == 0){
        router.push({ path: getPath('icommerce.products') })
    }
}


</script>