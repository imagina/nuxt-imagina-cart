<template>
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
              @category="value => category = value"
            />
            
              <ProductsComponent 
                v-if="category"
                :category="category"
              />            
        </div>
    </div>
    
    

</template>
<script setup lang="ts">
import ProductsComponent from '../components/products'
import CategoriesComponent from '../components/categories'

const { data: categories } = await useAsyncData( 'categories', 
	() => $fetch('/api/icommerce/categories')
)

definePageMeta({
  middleware: 'auth'
})

const { t } = useI18n({
  useScope: 'local'
})

const category = ref(null)


</script>
