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
            />            
            
            <ProductsComponent
             :products="products"            
            />            
            
        </div>
    </div>
    
    

</template>
<script setup lang="ts">
import ProductsComponent from '../components/products'
import CategoriesComponent from '../components/categories'
import BreadCrumb from '../modules/icommerce/components/breadcrumb';
import categoriesHelper from '../helpers/categories'

const route = useRoute()
const slug = route.params.slug

const { data: categories } = await useAsyncData( 'categories', 
	() => $fetch('/api/icommerce/categories')
)

const category = await categoriesHelper.getSelectedCategory(slug)
const {data: products } = await useAsyncData('products', 
  () => $fetch(`/api/icommerce/products?categoryId=${category.id}`)
)






definePageMeta({
  middleware: 'auth'
})

const { t } = useI18n({
  useScope: 'local'
})

</script>
