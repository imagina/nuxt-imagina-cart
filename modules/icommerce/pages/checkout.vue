<template>    
        <div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8">

                <div class="tw-grid tw-grid-cols-2">
                    <div>
                        <!--title -->
                        <div>
                            <span>Tu Carrito</span>
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

                    <!-- currency -->
                    <div>
                        
                        <div class="tw-flex tw-items-center">
                            <span>Currency:&nbsp;</span>
                            <q-radio v-model="currency" val="cop" label="Colombian peso" />
                            <q-radio v-model="currency" val="usd" label="USD" />
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