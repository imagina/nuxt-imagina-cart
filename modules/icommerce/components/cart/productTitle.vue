<template>	
	<div 
			class="
				tw-flex
				tw-justify-between 
				tw-items-center
				tw-py-6
			"
		>
			<div>
				<span 
					class="
						tw-text-[18px]
						sm:tw-text-[20px]
						md:tw-text-[22px]
						tw-font-[600]
						tw-m-0
						tw-p-0
						tw-leading-5
						tw-break-all
						md:tw-break-normal
					"
				>
					{{ product.name}}
				</span>
					<span
						v-if="product?.domain?.domainName"
						class="
							tw-rounded-[10px]
							tw-border-[2px]
						tw-border-[#5cb85c]
						tw-bg-[#5cb85c]
						tw-text-white
							tw-font-semibold
							tw-text-[22px]
							tw-py-1
							tw-px-2
							sm:tw-ml-2
							tw-w-full
						"
					>
						<span style="word-break: break-word;">
							{{  product?.domain?.domainName }}
						</span>
					</span>
			</div>
			<q-btn
				icon="fa-solid fa-trash"
				text-color="primary"
				size="sm"
				round
				flat
				@click="emits('remove')"
			/>
	</div>
	<div 
		v-if="product?.category"
		class="
			tw-flex
			tw-justify-between
			tw-items-center
			tw-pb-2
		"
	>
		<div class="tw-py-1">
			<span class="tw-text-[18px] tw-text-[#818181]">
				{{ product.category.title}}
			</span>
		</div>
	</div>
</template>
<script setup>

const props = defineProps({
  product: Object
});

const product = computed(() => props.product || false )

const emits = defineEmits(['remove'])

</script>
<style>
</style>