<template>
	<ClientOnly>
		<div class="tw-flex tw-flex-wrap md:tw-justify-center tw-py-4">
			<!--cart and products --->
			<div>
				<!--title -->
				<div class="tw-flex tw-justify-between tw-items-center">
					<h1 class="tw-text-[35px] tw-font-[700]">Tu Carrito</h1>
					<!-- currency -->
					<div v-if="showCart">
						<div class="tw-flex tw-items-center">
							<span class="tw-text-xl tw-font-bold">Divisa:&nbsp;</span>
							<template v-for="currencyItem in currencies">
								<q-radio v-model="cartState.currency" :val="currencyItem.value"
									:label="currencyItem.label" />
							</template>
						</div>
					</div>
				</div>
				<!-- products -->
				<div v-if="showCart">
					<ProductsComponent :products="cartState.products" :currency="cartState.currency"
						@removeProduct="(product) => removeProduct(product)" @subtotal="(val) => subtotal = val" />
				</div>
				<div v-else>
					<div>
						<span>Your car is empty</span>
						<p>
							Looks like you have not added anything to your cart. Go ahead & explore our products.
						</p>
					</div>
					<q-btn label="Ir a tienda " text-color="black" color="amber" no-caps unelevated class="
								tw-w-2/4
								tw-justify-center
								tw-font-bold
								tw-rounded-lg
								tw-mt-4											
							" @click="() => {
								router.push({ path: getPath('icommerce.products') })
							}" />
				</div>
			</div>

			<!-- cart-->

			<div class="md:tw-mt-[96px] tw-px-8" v-if="showCart">
				<div class="card tw-rounded-[20px] tw-w-[400px] tw-px-5 tw-pt-7 tw-pb-5 tw-my-5">
					<div class="tw-flex tw-justify-between tw-items-center">
						<span class="
											tw-font-semibold 
											tw-text-[22px] 
											tw-m-0 
											tw-p-0
											tw-leading-5
										">
							Subtotal
						</span>
						<span class="											
												tw-text-[18px] 
												tw-font-[400]
												tw-m-0 
												tw-p-0
												tw-leading-5
											">
							{{ productsHelper.priceWithSymbol(subtotal, cartState.currency) }}
						</span>
					</div>

					<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
						<span class="tw-text-[12px] tw-font-[400] tw-text-[#818181]">
							el subtotal aun no incluye impuestos
						</span>
						<span class="tw-text-[18px] tw-font-[600]">
							{{ productsHelper.priceWithSymbol(0, cartState.currency) }}
						</span>
					</div>

					<!-- discount -->
					<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
						<span class="tw-text-[14px] tw-font-[500] tw-text-[#818181]">
							Descuento 00%
						</span>
						<span class="tw-text-[14px] tw-font-[600] tw-text-[#66BB6A]">
							{{ productsHelper.priceWithSymbol(0, cartState.currency) }}
						</span>
					</div>

					<!--coupon -->
					<div>
						<div>
							<q-btn label="¿Tienes código de cupón?"
								class="q-p-0 tw-text-[14px] tw-font-[600] tw-text-[#03A9F4]" flat no-caps dense
								@click="showCouponInput = !showCouponInput" />
						</div>
						<div v-if="showCouponInput || form.coupon" class="tw-py-4">
							<q-input v-model="form.coupon" dense outlined />
						</div>
					</div>





					<div class="tw-mt-4">
						<q-btn label="Continuar" text-color="black" color="amber" no-caps unelevated class="
										tw-w-full
										tw-justify-center
										tw-font-bold
										tw-rounded-lg
									" @click="redirectCheckout()" />
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
	currency: ''
})

const form = useStorage('shoppingCheckoutForm', {
	coupon: null,
	email: null,
	firstName: null,
	lastName: null,
	identification: null,
	mobilePhone: null,
	country: null,
	address: null,
	city: null,
	region: null,
	zipCode: null
})

const router = useRouter()

const subtotal = ref(0)

const showCouponInput = ref(false)


const currencies = productsHelper.getCurrencies()

const showCart = computed(() => cartState.value?.products?.length || false)

function removeProduct(product) {
	const products = cartState.value.products.filter(obj => obj.id != product.id);
	cartState.value = { products: products, currency: cartState.value.currency }

	if (cartState.value.products.length == 0) {
		// router.push({ path: getPath('icommerce.products') })
	}
}

function redirectCheckout() {
	router.push({
		path: getPath('icommerce.checkout')
	})
}

</script>
