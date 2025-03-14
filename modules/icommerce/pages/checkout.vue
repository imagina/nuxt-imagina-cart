<template>    
	<div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8">
		<div class="tw-grid tw-grid-cols-1">
			<div>
				logged : 
				<span v-if="authStore.isLogged()">
					 {{ authStore?.user?.fullName }}
					
				</span>
			</div>
			<div class="tw-flex">
					<div>
							<!--title -->
							<div class="tw-flex tw-justify-between tw-items-center tw-mb-7">
									<h1 class="tw-text-4xl tw-font-bold">Tu Carrito</h1>
									<!-- currency -->
									<div v-if="showCart">
											<div class="tw-flex tw-items-center">

													<span>Currency:&nbsp;</span>
													<template v-for="currencyItem in currencies">                            
															<q-radio v-model="currency" :val="currencyItem.value" :label="currencyItem.label" />
													</template>
											</div>
									</div>
							</div>
							<!-- products -->
							<div v-if="showCart">
									<ProductsComponent 
											:products="cartState.products"
											:currency="currency"
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
									{{  subtotal }} cop
								</span>
						</div>

						<div class="tw-flex tw-justify-between tw-items-center">
							<span class="tw-text-xs tw-text-[#818181]">
								el subtotal aun no incluye impuestos
							</span>
							<span>0cop</span>
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
								@click="() => {
									router.push({ 
										path: '/auth/login', 
										query: {
											redirectUrl: 'icommerce.checkout'
										}
									})
								}"
							/>
						</div>
					</div>
				</div>
			</div>            
		</div>			
	</div>
</template>
<script setup>
import { useStorage } from '@vueuse/core'
import ProductsComponent from '../components/checkout/products.vue'

const authStore = useAuthStore()

const cartState = useStorage('cart', {products: []})
const router = useRouter()

const subtotal = ref(0)

const currencies = [
    { value:'COP',  label:'Colombian peso', symbol: '$' }, 
    { value: 'USD', label: 'United States dollar', symbol: '$'}
];

const currency = ref(currencies[0].value)

const showCart = computed(() => cartState.value?.products?.length ||  false)

onMounted(() => {
    init()
})

function init(){}

function removeProduct(product){
    const products = cartState.value.products.filter(obj => obj.id != product.id);
    cartState.value = {products: products}

    if(cartState.value.products.length == 0){
       // router.push({ path: getPath('icommerce.products') })
    }
}

</script>
