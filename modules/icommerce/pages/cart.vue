<template>
	<ClientOnly>
		<div class="
			lg:tw-flex
			tw-flex-wrap
			tw-justify-center
			tw-p-4
			tw-h-full
		"
		style="background-color:  #FAFAFA;"
		>
			<!--cart and products --->
			<div class="
			tw-w-full
			lg:tw-w-[800px]
			lg:tw-mb-4
			">
				<div v-if="showCart" class="tw-mb-[40px]">
					<!--title -->
					<div class="tw-flex tw-justify-between tw-items-center">
						<div>
							<h1 class="tw-text-[35px] tw-font-[700]">{{ $t('icommerce.cart.yourCart') }}</h1>
						</div>
						
						<!-- currency -->
						<div>
							<q-select
								:label="$t('icommerce.cart.currency')"
								class="tw-w-[120px] tw-bg-white"
								v-model="cartState.currency"
								:options="currencies"
								emit-value
								map-options									
								outlined
								dense								
							/>
						</div>
						<div v-if="false">
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
					<ProductsComponent
						:products="cartState.products"
						:currency="cartState.currency"
						@removeProduct="(product) => removeProduct(product)"
						@subtotal="(val) => subtotal = val"
					/>

					<!--aditional cards -->

					<div>
						<span class="tw-text-xl tw-font-bold">Protege tu marca:&nbsp;</span>
						<p>Proteja estas extensiones de dominio populares para mantener a los competidores alejados de su nombre</p>
					</div>
				</div>
				<!-- empty cart -->
				<div v-else >
					<h1 class="tw-text-[35px] tw-font-[700]">Tu Carrito</h1>
					<div class="tw-my-4 tw-text-[14px] tw-font-[400]">
						<p>
							{{ $t('icommerce.cart.emptyCart') }}
						</p>
					</div>
					<q-btn
						:label="$t('icommerce.goToStore')"
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
							tw-my-8
						"
						@click="() => { router.push({ path: getPath('icommerce.products') })}"
					/>
				</div>
			</div>

			<!-- cart-->
			<div
				v-if="showCart"
				class="
				tw-w-full
				md:tw-my-[20px]
				lg:tw-w-[800px]
				lg:tw-mt-0
				xl:tw-w-[400px]
				xl:tw-mt-[114px]
				xl:tw-ml-8
				"
			>
				<div class="
					card
					tw-bg-white
					tw-rounded-[20px]
					tw-w-full
					tw-p-6
					"
				>
					<div class="tw-flex tw-justify-between tw-items-center">
						<span class="
							tw-font-semibold
							tw-text-[22px]
							tw-m-0
							tw-p-0
							tw-leading-5
						">
							{{ $t('icommerce.cart.subtotal') }}
						</span>
						<span class="
							tw-font-[600]
							tw-text-[20px]
							tw-m-0
							tw-p-0
							tw-leading-5
						">
							{{ productsHelper.priceWithSymbol(subtotal, cartState.currency) }}
						</span>
					</div>

					<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
						<span class="tw-text-[12px] tw-font-[400] tw-text-[#818181]">
							{{ $t('icommerce.cart.subtotalNoTaxes') }}
						</span>
						<span class="tw-text-[18px] tw-font-[600]">
							{{ productsHelper.priceWithSymbol(0, cartState.currency) }}
						</span>
					</div>

					<!-- discount -->
					<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
						<span class="tw-text-[14px] tw-font-[500] tw-text-[#818181]">
							{{ $t('icommerce.cart.discount') }} 00%
						</span>
						<span class="tw-text-[14px] tw-font-[600] tw-text-[#66BB6A]">
							{{ productsHelper.priceWithSymbol(0, cartState.currency) }}
						</span>
					</div>

					<!--coupon -->
					<div>
						<div>
							<q-btn 
								:label="$t('icommerce.cart.coupon')"
								class="q-p-0 tw-text-[14px] tw-font-[600] tw-text-[#03A9F4]"
								flat
								no-caps
								dense
								@click="showCouponInput = !showCouponInput" 
							/>
						</div>
						<div v-if="showCouponInput || form.coupon" class="tw-py-4">
							<q-input v-model="form.coupon" dense outlined />
						</div>
					</div>
					<div class="tw-mt-4">
						<q-btn
							:label="$t('icommerce.cart.continue')"
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
	</ClientOnly>
</template>
<script setup>
import { useStorage } from '@vueuse/core'
import ProductsComponent from '../components/cart/products.vue'
import productsHelper from '../helpers/products'

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
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
const checkoutPath = getPath('icommerce.checkout')

function removeProduct(product) {
	const products = cartState.value.products.filter(obj => obj.id != product.id);
	cartState.value = { products: products, currency: cartState.value.currency }

	if (cartState.value.products.length == 0) {
		// router.push({ path: getPath('icommerce.products') })
	}
}

function redirectCheckout() {
	router.push({
		path: checkoutPath
	})
}

</script>
