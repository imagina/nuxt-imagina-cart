<template>
	<ClientOnly>
		<div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8">
			<!--cart and products ---> 
			<div class="tw-grid tw-grid-cols-1">			
				<div class="tw-flex">
						<div>
								<!--title -->
								<div class="tw-flex tw-justify-between tw-items-center tw-mb-7">
										<h1 class="tw-text-4xl tw-font-bold">Tu Carrito</h1>
										<!-- currency -->
										<div v-if="showCart">
												<div class="tw-flex tw-items-center">
														<span class="tw-text-xl tw-font-bold">Divisa:&nbsp;</span>
														<template v-for="currencyItem in currencies">                            
																<q-radio v-model="cartState.currency" :val="currencyItem.value" :label="currencyItem.label" />
														</template>
												</div>
										</div>
								</div>
								<!-- products -->
								<div v-if="showCart">
										<ProductsComponent 
												:products="cartState.products"
												:currency="cartState.currency"
												@removeProduct="(product) => removeProduct(product)"
												@subtotal="(val) => subtotal = val"
										/>                            
								</div>
								<div v-else>
									<div>
										<span>Your car is empty</span>
										<p>
												Looks like you have not added anything to your cart. Go ahead & explore our products.
										</p>																
									</div>
									<q-btn
											label="Ir a tienda "
											text-color="black"
											color="amber"
											no-caps							
											unelevated
											class="
												tw-w-2/4
												tw-justify-center
												tw-font-bold
												tw-rounded-lg
												tw-mt-4											
											"							
											@click="() => {
												router.push({ path: getPath('icommerce.products') })
											}"
										/>		
								</div>
						</div>
						<div class="tw-mt-6 tw-p-6" v-if="showCart">
							<div class="card tw-rounded-[20px] tw-px-5 tw-pt-7 tw-pb-5 tw-my-5">
								<div class="tw-flex tw-justify-between tw-items-center">
									<span
										class="
											tw-font-semibold 
											tw-text-[22px] 
											tw-m-0 
											tw-p-0
											tw-leading-5
										"
									>
										subtotal
									</span>
									<span
										class="											
												tw-text-[20px] 
												tw-m-0 
												tw-p-0
												tw-leading-5
											">
										{{  subtotal }} {{ cartState.currency }}
									</span>
							</div>

							<div class="tw-flex tw-justify-between tw-items-center">
								<span class="tw-text-xs tw-text-[#818181]">
									el subtotal aun no incluye impuestos
								</span>
								<span>0 {{ cartState.currency }}</span>
							</div>

							<div class="tw-mt-4">
								<q-btn
									label="Continuar"
									text-color="black"
									color="amber"
									no-caps							
									unelevated
									class="
										tw-w-full
										tw-justify-center
										tw-font-bold
										tw-rounded-lg
									"							
									@click="redirectCheckout()"
								/>
							</div>
						</div>
					</div>
				</div>            
			</div>
		</div>
	</ClientOnly>
</template>
<script setup>
import { useStorage } from '@vueuse/core'
import ProductsComponent from '../components/cart/products.vue'
import productsHelper from '../helpers/products'

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: {}
})
const router = useRouter()

const subtotal = ref(0)

const currencies = productsHelper.getCurrencies()

const showCart = computed(() => cartState.value?.products?.length ||  false)

function removeProduct(product){
    const products = cartState.value.products.filter(obj => obj.id != product.id);
    cartState.value = {products: products}

    if(cartState.value.products.length == 0){
       // router.push({ path: getPath('icommerce.products') })
    }
}

function redirectCheckout(){	
	router.push({ 
		path:  getPath('icommerce.checkout')
	})
}

</script>
