<template>
	<!-- subtotal no discount -->
	 <div class="tw-my-2">
		<h2 class="tw-leading-normal tw-font-semibold tw-text-md md:tw-text-base xl:tw-text-lg">
			{{ $t('icommerce.checkout.orderSummary') }}
		</h2>
	</div>
	<div class="tw-my-2">
		<q-expansion-item
			default-opened
			class="shadow-1 overflow-hidden"
			style="border-radius: 8px; background-color: #eceded;"
			:label="`${products.length} ${$t('icommerce.checkout.articles')}`"
			header-class="tw-leading-normal tw-font-semibold tw-text-md md:tw-text-base xl:tw-text-lg tw-px-4"
			expand-icon-class="">
			<template v-for="product in products" class="tw-my-4">
				<q-card>
					<q-card-section>
						<!-- title -->
						<div>
							<span
								class="tw-leading-normal tw-font-[800] tw-text-md md:tw-text-base xl:tw-text-lg"
							>
							{{ product.name }}
							</span>
						</div>
						<!-- details -->
						<div v-if="product?.domain?.domainName">
							<span
								class="
									tw-leading-normal
									tw-font-semibold
									tw-text-md
									md:tw-text-base
									xl:tw-text-lg
									tw-line-clamp-4
									tw-break-all
								"
							>
								<span
									v-if="product?.domain?.action?.label"
								>
									{{  product?.domain?.action?.label }} : <br> {{ product?.domain?.domainName }}
								</span>
							</span>

						</div>


						<div class="tw-flex tw-justify-between">
							<div>
								<span v-if="productsHelper.hasFrencuency(product)"
									class="tw-leading-normal tw-font-[500] tw-mb-1 tw-text-sm md:tw-text-md">
									{{ product.frecuency?.label }}
								</span>

							</div>
							<div>
								<span
									class="tw-leading-normal tw-font-light tw-text-sm md:tw-text-md !text-[#333]">
									{{ productsHelper.priceWithSymbol(product.price, cartState.currency) }}
								</span>
							</div>
						</div>

					</q-card-section>
				</q-card>
			</template>
		</q-expansion-item>
	</div>
	<hr class="tw-my-4" />
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

			<span :class="calcDiscount().percent ? 'tw-line-through tw-text-[#818181] tw-font-[400]' : '' ">
				{{ productsHelper.priceWithSymbol(calcDiscount().totalNoDiscount, cartState.currency) }}
			</span>
		</span>
	</div>
	<!-- subtotal -->
	<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
		<span class="tw-text-[12px] tw-font-[400] tw-text-[#818181]">
			{{ $t('icommerce.cart.subtotalNoTaxes') }}
		</span>
		<span class="tw-text-[20px] tw-font-[600]">
			{{ productsHelper.priceWithSymbol(subtotal, cartState.currency) }}
		</span>
	</div>

	<!-- discount -->
	<div class="tw-flex tw-justify-between tw-items-center tw-my-2" v-if="showDiscount">
		<span class="tw-text-[14px] tw-font-[500] tw-text-[#818181]">
			{{ $t('icommerce.cart.discount') }} {{ calcDiscount().percent }}%

		</span>
		<span class="tw-text-[14px] tw-font-[600] tw-text-[#66BB6A]">
			{{ productsHelper.priceWithSymbol(calcDiscount().total, cartState.currency) }}
		</span>
	</div>

	<hr class="tw-my-4" />

	<!--total--->
	<div class="tw-flex tw-justify-between tw-items-center tw-my-2">
		<span class="
			tw-font-[600]
			tw-text-[20px]
			tw-my-0
			tw-p-0
			tw-leading-5
		">
			Total
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

	<div class="tw-my-4 ">
		<slot name="action"/>
	</div>

	<div
		v-if="showTaxesWarning"
		class="tw-pt-4 tw-text-[12px] tw-font-[400] tw-text-[#818181]"
	>
		<p>Los precios indicados no incluyen IVA, si tu dirección de facturación está <strong>en Colombia nuestro sistema agregará el 19% del IVA.</strong></p>
	</div>

</template>
<script setup>
import productsHelper from '../../helpers/products';

const { t } = useI18n()

const props = defineProps({
	cartState: {
		type: Object,
    	required: true
	}
})



//const cartState = useState('icommerce.cart')

const subtotal = computed(() => productsHelper.getSubtotal(props.cartState.products, props.cartState.currency))

const showDiscount = computed(() => calcDiscount().percent > 1)
const products = computed(() => props.cartState.products)
const showTaxesWarning = computed(() => props.cartState.products.some((product) => product?.domain || false ))

function calcDiscount(){
  return productsHelper.calcDiscount(props.cartState.products, subtotal.value)
}
</script>
