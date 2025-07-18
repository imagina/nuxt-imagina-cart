<template>
    <BreadCrumb />
    <div class="tw-flex tw-gap-16 tw-flex-col tw-items-center md:tw-py-8 tw-w-full tw-min-h-[800px]">
			<div 
				class="
						tw-flex
						md:tw-gap-[30px]                 
						tw-w-full
						tw-p-3.5
						tw-max-w-[1680px]
				"
			>            
				<CategoriesComponent
					:categories="categories"
					:category="category"
				/>
            
				<ProductsComponent
					:products="products" 
					:category="category"            
				/>            
			</div>
	</div>
</template>
<script setup lang="ts">
import ProductsComponent from '../components/products';
import CategoriesComponent from '../components/categories';
import BreadCrumb from '../modules/icommerce/components/breadcrumb';

const emit = defineEmits(['loaded'])

const route = useRoute()
const slug = route.params.slug

const categoriesData = await useAsyncData( 'icommerce.categories',  () => $fetch('/api/icommerce/categories')) || []
const categories = categoriesData.data.value

const category = categoriesData.data.value?.find(item => slug == item?.slug)
const categoryId = category?.id || 1

const {data: products } = await useAsyncData('icommerce.products', () => $fetch(`/api/icommerce/products?categoryId=${categoryId}`) )

//useState('icommerce.categories', () => categories)
//useState('icommerce.selectedCategory', () => category)

definePageMeta({
  middleware: 'auth'
})

const { t } = useI18n({
  useScope: 'local'
})

</script>
