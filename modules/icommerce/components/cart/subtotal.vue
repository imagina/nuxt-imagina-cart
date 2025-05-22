<template>
	<!-- subtotal no discount -->
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




</template>
<script setup>
import { useStorage } from '@vueuse/core'
import productsHelper from '../../helpers/products';

const { t } = useI18n()

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})

const subtotal = computed(() => productsHelper.getSubtotal(cartState.value.products, cartState.value.currency))
const showDiscount = computed(() => calcDiscount().percent > 1)

function calcDiscount(){
  return productsHelper.calcDiscount(cartState.value.products, subtotal.value)
}
</script>
