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
			xl:tw-grid-cols-3
			tw-gap-10"
		>
			<q-card
				v-for="(product, index) in products"
				class="
					product
					tw-p-4
					tw-rounded-2xl
					tw-w-full
					tw-h-[332px]
					lg:tw-max-w-[390px]
				"
			>
				<div>
					<span class="tw-text-lg tw-font-bold tw-line-clamp-1 tw-capitalize " style="color: #888888">{{ product.name.toLowerCase() }}</span>
				</div>

				<div class="tw-flex tw-justify-between tw-align-middle" v-if="false">
					<div>
						<span class="tw-text-[40px] tw-font-semibold">16GB</span>
					</div>
					<div>
						<img src="../../assets/img/cP_white.png" />
					</div>
				</div>
				<div class="tw-h-[180px]">
					<div
						class="
							description
							tw-px-6
							tw-pt-6
							tw-h-[160px]
							tw-overflow-y-auto
						"
						v-if="product?.description"
						v-html="product?.description"
					>
					</div>
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
							label="Ver Plan"
							text-color="black"
							no-caps
							unelevated
							class="
								tw-w-2/3
								tw-justify-center
								tw-font-bold
								tw-rounded-lg
								tw-bg-[#E7E7E7]
							"
						/>
						<q-btn
							:label="productLabel"
							text-color="black"
							color="amber"
							no-caps
							icon="o_shopping_cart"
							unelevated
							class="
								tw-w-2/3
								tw-justify-center
								tw-font-bold
								tw-rounded-lg
							"
							:disable="disableButton(index)"
							@click="addTocart(index)"
						/>
					</div>
			</q-card>
		</div>
  </template>
  <script setup>

import apiRoutes from '../../config/apiRoutes'
import { useStorage } from '@vueuse/core'
import productsHelper from '../helpers/products.ts'

const settings = {
	justOneProdcut: false //one product and redirects to checkout
}
const router = useRouter()
const products = ref([])
const cartState = useStorage('shoppingCart', {
	products: [],
	currency: {}
})

  // 'ad' (ascending-descending) or 'da' (descending-ascending)
	
	const sortOptions = [
		{
			name: 'A-Z',
			value: 'desc'
		},
		{
			name: 'Z-A',
			value: 'asc'
		}]

		const sort = ref([sortOptions[0].value])	

	//peding to check on cart..
	const productLabel = computed(() => settings.justOneProdcut ? 'Comprar'	: 'Añadir')
	const frecuencyId = 1 //frecuency option

	function disableButton(index) {
		return (!products.value[index].quantity != 0)
	}

	onBeforeMount( async () => {
		await getProducts()
	})

	async function init(){
		///sort.value = sortOptions[0].value 
		
	}

	async function getProducts(){
		const params = {
			take: 40,
			page: 1,
			order: sort.value.value,
			include: 'relatedProducts,categories,category,parent,manufacturer,optionsPivot.option,optionsPivot.productOptionValues'
		}
		baseService.index(apiRoutes.products, params).then(response => {
			products.value = response?.data || []

			//add quantity
			products.value.forEach((product) => {
				if (product?.quantity) { product.quantity = 1 }
			})

		})
	}

	function addTocart(index){
		//cartStore.products.push(product)
		const product = products.value[index]

		if(productsHelper.hasFrencuency(product)){
      const options = productsHelper.getFrecuencyOptions(product)
      if(options.length) {
        product.frecuency = options[0]
      }      
    }

		if(settings.justOneProdcut){
			//reset cart
			cartState.value = { products: [product] }
			router.push({ path: getPath('icommerce.checkout')})
			return
		} else {
			if(product.quantity != 0){
				product.quantity = (product.quantity - 1)
				const cartProducts = cartState.value.products
				cartProducts.push(product)
				cartState.value = { products: cartProducts }
			}
		}
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
		box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.07), 0px 3.85185px 33.1259px rgba(0, 0, 0, 0.0425185), 0px 0.814815px 8.47407px rgba(0, 0, 0, 0.0274815);
	}
</style>