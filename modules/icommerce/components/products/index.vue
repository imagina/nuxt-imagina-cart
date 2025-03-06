<template>
		<div class="tw-flex tw-justify-between tw-align-middle tw-mb-8">
			<div class="tw-flex items-center">
				<p>{{ products.length }} Artículos</p>
			</div>
			<div class="tw-flex items-center">
				Ordenar&nbsp;&nbsp;
				<q-select
					borderless
					v-model="sort"
					:options="sortOptions"
					option-value="value"
					option-label="name"
					class="tw-w-[160px]"
					@update:model-value="getProducts()"
				/>
			</div>
		</div>

		<!-- products list -->
  	<div class="
			tw-grid
			tw-grid-cols-1
			md:tw-grid-cols-2
			lg:tw-grid-cols-3
			xl:tw-grid-cols-4
			tw-gap-4"
		>
			<q-card v-for="product in products" class="product q-pa-md">
				<div>
					<span class="tw-text-[12] tw-font-[700]" style="color: #888888">{{ product.name }}</span>
				</div>
				<div class="tw-flex tw-justify-between tw-align-middle">
					<div>
						<span class="tw-text-[30px] tw-font-[600]">16GB</span>
					</div>
					<div>
						<img src="../../assets/img/cP_white.png" />
					</div>
				</div>
				<div class="description tw-p-6" v-html="product.description">
				</div>
				<!-- price -->
				<div class="tw-mb-4">
					<div>
						<span>Desde</span>
					</div>
					<div>
						<span class="tw-text-[24] tw-font-[700]">{{ product.price }}</span>
						<span>&nbsp;/ 1 mes</span>
					</div>
				</div>
				<!-- action buttons -->
					<div class="tw-flex tw-gap-4 tw-items-center tw-justify-center">
						<q-btn
							label="Ver Planes"
							text-color="black"
							no-caps
							class="tw-w-1/2 tw-justify-center"
						/>
						<q-btn
							label="Añadir"
							text-color="black"
							color="amber"
							no-caps
							icon="o_shopping_cart"
							unelevated
							class="tw-w-1/2 tw-justify-center"
							@click="addTocart(product)"
						/>
					</div>
			</q-card>
		</div>
  </template>
  <script setup>

import apiRoutes from '../../config/apiRoutes'
//import { useCartStore } from '../../stores/cart'

  const cartStore = useCartStore()


	const products = ref([])

  // 'ad' (ascending-descending) or 'da' (descending-ascending)
	const sort = ref([])
	const sortOptions = [
		{
			name: 'A-Z',
			value: 'desc'
		},
		{
			name: 'Z-A',
			value: 'asc'
		}]

	async function init(){
		sort.value = sortOptions[0].value
		await getProducts()
	}

	async function getProducts(){
		const params = {
			take: 10,
			page: 1,
			order: sort.value.value,
			include: 'relatedProducts,categories,category,parent,manufacturer'
		}
		baseService.index(apiRoutes.products, params).then(response => {
			products.value = response?.data || []
		})
	}

	function addTocart(product){
		cartStore.products.push(product)
	}

	onMounted(async () => {
		init();
	})

  </script>
 <style>
 .product {
		.description ul {
			@apply tw-list-disc
		}
	}
</style>