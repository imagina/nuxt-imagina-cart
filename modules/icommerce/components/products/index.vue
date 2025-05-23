<template>
	<div class="tw-w-full">	

	<NuxtImg 
		v-if="category && bannerImage"
		:src="bannerImage" 
		class="
			tw-h-[180px]                        
			tw-rounded-2xl
			tw-w-[100%]
			tw-h-[182px]
			md:tw-h-[400px]

		"
		:alt="category?.title"
	/>    
	
	<div class="tw-pt-5 tw-mt-2.5 " v-if="category">
		<span class="tw-text-2xl md:tw-text-4xl tw-font-semibold">{{ category.title }}</span>
		<p v-html="category.description" class="tw-text-base tw-mt-3.5">                        
		</p>
	</div>
	<hr  class="tw-my-6 tw-w-full" />



	<div class="md:tw-flex tw-justify-between tw-align-middle tw-mb-8" v-if="!loading">
		<div class="tw-flex items-center">
			<p>{{ products.length }} {{ $t('icommerce.products.articles')}}</p>
		</div>
		<div class="tw-flex items-center tw-gap-4" v-if="products.length">
			<div class="tw-my-4 md:tw-m-0">
				<CurrencySelector />
			</div>
			<span>
				&nbsp;{{ $t('icommerce.products.order') }}&nbsp;
			</span>
			<q-select
				borderless
				v-model="sort"
				:options="sortOptions"
				class="tw-w-[100px] md:tw-w-[160px]"
				@update:model-value="getProducts()"
			/>
		</div>
	</div>
	<div
		v-if="loading"
		class="tw-w-full tw-h-[400px]"
		style="position: relative;"
	>
		<q-inner-loading
		:showing="loading"
		color="primary"
		/>
	</div>

		<!-- products list -->
  	<div
			v-if="products.length && !loading"
			class="
				tw-grid
				tw-grid-cols-1
				md:tw-grid-cols-2
				xl:tw-grid-cols-3
				tw-gap-10
			"
		>
			<q-card
				v-for="(product, index) in products"
				class="
					product
					tw-p-4
					tw-rounded-2xl
					tw-w-full
					tw-min-w-[200px]
					lg:tw-max-w-[390px]
				"
			>
				<div>
					<span class="tw-text-lg tw-font-bold tw-line-clamp-1 tw-capitalize " style="color: #888888">{{ product.name.toLowerCase() }}</span>
					<q-tooltip>
						{{ product.name }}
					</q-tooltip>

				</div>
				<!-- description -->
				<div
					v-if="product?.description && getStorageDescription(product?.description)"
					class="tw-flex tw-justify-between tw-align-middle"
				>
					<div>
						<span class="tw-text-[40px] tw-font-semibold">{{ getStorageDescription(product.description) }}</span>
					</div>
					<div v-if="isCPanel(product)">
						<img src="../../assets/img/cP_white.png" />
					</div>
					<div v-else >
						<img src="../../assets\img\red-logo-imagina.png" />
					</div>
				</div>
				<div class="tw-h-[140px]">
					<div
						class="
							description
							tw-px-6
							tw-pt-6
							tw-h-[120px]
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
						<span class="tw-text-[24px] tw-font-[700]">{{ productsHelper.getPriceWithSymbol(product, cartState.currency) }}</span>
						<span class="tw-text-[16px] tw-font-[500]"> /  1 mes</span>
					</div>
				</div>
				<!-- action buttons -->
					<div class="tw-flex tw-gap-4 tw-items-center tw-justify-center">
						<q-btn
							v-if="false"
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
								tw-w-full
								tw-justify-center
								tw-font-bold
								tw-rounded-lg
							"
							@click="addTocart(index)"
						/>
					</div>
			</q-card>
		</div>
		<!--pagination-->
        <master-pagination
			v-if="paginationModel.rowsNumber"
			v-model="paginationModel"
			:pagesNumber="pagination.lastPage"
			:isFirstPage="paginationModel.page == 1"
			:isLastPage="paginationModel.page == pagination.lastPage"
			@update:modelValue="getProducts()"
			class="tw-py-8"
        />
		</div>


  </template>
  <script setup>

import apiRoutes from '../../config/apiRoutes'
import constants from '../../config/constants'
import { useStorage } from '@vueuse/core'
import productsHelper from '../helpers/products.ts'
import CurrencySelector from '../../components/currencySelector'

const emit = defineEmits(["category"]);

const category = ref(null)

const settings = {
	justOneProdcut: true //one product and redirects to checkout
}
const router = useRouter()
const route = useRoute()

const { t } = useI18n()
const products = ref([])
const loading = ref(false)

const paginationModel = ref({
      page: 1,
      rowsNumber: null,
      rowsPerPage: 12,
      descending: true,
      maxPages: 6
    })

const pagination = ref({
	lastPage: 0,
})


const bannerImage = computed( () =>  {    
 if(!category.value) return false
 return category.value?.mediaFiles?.bannerindeximage?.url || false
})

const cartState = useStorage('shoppingCart', {
	products: [],
	currency: 'COP'
})

  // 'ad' (ascending-descending) or 'da' (descending-ascending)

	const sortOptions = [
		{
			label: 'Z-A',
			value: 'desc'
		},
		{
			label: 'A-Z',
			value: 'asc'
		}]

		const sort = ref(sortOptions[1]	)

	//peding to check on cart..
	const productLabel = computed(() => settings.justOneProdcut ? t('icommerce.products.buyNow') : t('icommerce.products.addToCart'))
	const frecuencyId = 1 //frecuency option


	watch(
		() => category.value,
		(newQuery, oldQuery) => {
			paginationModel.value.page = 1
			getProducts()
		},
	)

	function disableButton(index) {
		return (!products.value[index].quantity != 0)
	}

	onBeforeMount( async () => {		
	})

	async function init(){
		
		category.value = route?.meta?.category || null		

		if(!category.value){			
			category.value = await getCategory()
		}
		emit('category', category.value)
		await getProducts()
	}

	async function getCategory(){
		const params = {
			take: 60,
			page: 1,
			filter : {
				parentId: constants.cagtegories.mainCategoryId,
				order: {
					field: "created_at",
					way: "desc"
				}			
			}		
		}	
		let parents = []

		await baseService.index(apiRoutes.categories, params).then(response => {
			let  data =  response?.data || []				
			parents = data
	
			parents.forEach((category) => {				
				const children = data.filter(item => item.parentId == category.id && item.parentId != constants.cagtegories.mainCategoryId )
				if(children.length) category.children = children
			})			
		})
		return parents[0]
	}

	async function getProducts(){
		const params = {
			take: paginationModel?.value?.rowsPerPage || 10,
			page: paginationModel?.value?.page || 1,
			order: sort.value.value,
			include: 'relatedProducts,categories,category,parent,manufacturer,optionsPivot.option,optionsPivot.productOptionValues'
		}

		//router.getRoutes().find(page => page.name == pageName)

		
			params.filter = {
				categoryId: category.value?.id
			}
		
		loading.value = true
		/* reset pagination */
		pagination.value.lastPage = 0
		paginationModel.value.rowsNumber = 0

		await baseService.index(apiRoutes.products, params).then(response => {
			products.value = response?.data || []
			if(response.meta?.page){
				pagination.value.lastPage = response.meta.page.lastPage || pagination.value.lastPage
				paginationModel.value.rowsNumber = response.meta.page.total
			}

			//add quantity
			products.value.forEach((product) => {
				if (product?.quantity) { product.quantity = 1 }
			})

		})
		loading.value = false
	}

	function addTocart(index){
		//cartStore.products.push(product)
		const product = products.value[index]
		if(productsHelper.hasFrencuency(product)){
      		//const options = productsHelper.getFrecuencyOptions(product)

			const options = productsHelper.getFrecuencyOptions(product).map(element => {
				element.frecuency = element.label
				element.label =  t(productsHelper.translateFrecuencyOptionLabel(element.label))
				return element
       		});


			if(options.length) {
				product.frecuency = options[0]
			}
    	}

		if(settings.justOneProdcut){
			//reset cart
			cartState.value = { products: [product], currency: cartState.value.currency }
			router.push({ path: getPath('icommerce.cart')})
			return
		} else {
			if(product.quantity != 0){
				product.quantity = (product.quantity - 1)
				const cartProducts = cartState.value.products
				cartProducts.push(product)
				cartState.value = { products: cartProducts, currency: cartState.value.currency }
			}
		}
		Notify.create({
			message: 'Producto agregado al carrito',
			type: 'positive',
		})
	}


	function getStorageDescription(description){
		const result = extractValueByLabel(description, 'Espacio en Disco')
		if (result) return result.match(/[a-zA-Z0-9]+/g)?.join('') || '';
		return false
	}


	function extractValueByLabel(html, label) {
		const regex = new RegExp(
			`${label}:\\s*(?:&nbsp;|\\s|<[^>]+>)*([^<\\s][^<]*)`,
			'gi'
		);
		const matches = [...html.matchAll(regex)];

		for (const match of matches) {
			if (match[1]) {
			return match[1]
				.replace(/&nbsp;/gi, ' ')
				.replace(/\s+/g, ' ')
				.trim();
			}
		}

		return null;
	}

	function isCPanel(product){
		const str1 = product?.category?.title || ''
		const str2 = product?.description || ''
		const word = 'cpanel'
		const regex = new RegExp(`\\b${word}\\b`, 'i'); // 'i' makes it case-insensitive
		return regex.test(str1) || regex.test(str2)
	}

	/* backup
	function extractValueByLabel(html, label) {
		const regex = new RegExp(`${label}:\\s*(?:<[^>]+>)*([^<]+)`, 'i');
		const match = html.match(regex);
		console.log(match)
		if (match) {
			// Replace &nbsp; with normal space and trim the result
			return match[1].replace(/&nbsp;/g, ' ').trim();
		}
		return null;
	}
	*/


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
		.description a[data-toggle] {
			cursor: pointer;
		}
	}

.fade-enter-active, .fade-leave-active {
transition: opacity .8s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>