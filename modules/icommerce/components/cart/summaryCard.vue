<template>
	
	<q-card
	
	 flat>
		<div
			:class="padding ? 'tw-p-[12px]' : '' "
			
		>
			<!-- title -->
			<div class="tw-mb-2">
				<span class="tw-leading-normal tw-font-[600] tw-text-md md:tw-text-base xl:tw-text-md">
					{{ product.name }}
				</span>
			</div>
			<!-- details -->
			<div 
				v-if="product?.domain?.domainName"
				class="tw-my--2"
				
			>
				<span class="
						tw-leading-normal
						tw-text-md
						md:tw-text-base
						xl:tw-text-md
						tw-line-clamp-4
						tw-break-all
					"
				>
					<span v-if="product?.domain?.action?.label">
						{{ product?.domain?.action?.label }} : <br> {{ product?.domain?.domainName }}
					</span>
				</span>
			</div>

			<div class="tw-flex tw-justify-between tw-my-2">
				<div>
					<span v-if="productsHelper.hasFrencuency(product)"
						class="tw-leading-normal tw-font-[500] tw-mb-1 tw-text-sm md:tw-text-md">
						{{ product.frecuency?.label }}
					</span>

				</div>
				<div>
					<span class="tw-leading-normal tw-font-light tw-text-sm md:tw-text-md !text-[#333]">
						{{ productsHelper.priceWithSymbol(product.price, currency) }}
					</span>
				</div>
			</div>
		</div>
	</q-card>
</template>
<script setup>
import productsHelper from '../../helpers/products';

const { t } = useI18n()

const props = defineProps({
	product: {
		type: Object,
		required: true
	},
	currency: {
		type: String,
		required: true
	}, 
	padding: {
		type: Boolean, 
		required: false
	}
})

const product = computed(() => props.product)




</script>
