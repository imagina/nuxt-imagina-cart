<template>
    <ClientOnly>
    <div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8 tw-w-full">
        <div 
            class="
                tw-flex 
                tw-gap-3.5 
                md:tw-gap-[30px]                 
                tw-w-full
                tw-max-w-[1680px] 
                tw-px-3.5
            "
        >
            <div
                class="tw-max-w-[500px] "
            >
                <CategoriesComponent 
                    @selectedCategory="(value) => category = value"
                />
            </div>
            <div 
                class="
                    tw-w-lg[1024px]
                    tw-w-full
                "
            >
                
                    
                    <img
                        v-if="true"
                        class="
                            tw-h-[400px]                             
                            tw-rounded
                            tw-w-full
                        "
                        alt="Category"
                        src='https://picsum.photos/700/400?random'
                    />
                
                <div class="tw-pt-5 tw-mt-2.5 " v-if="category">
                    <span class="tw-text-4xl tw-font-semibold">{{ category.title }}</span>
                    <p v-html="category.description" class="tw-text-base tw-mt-3.5">                        
                    </p>
                </div>
                <hr  class="tw-my-6 tw-w-lg[1024px]
                            tw-w-full" />
                <div>
                    <ProductsComponent
                        :categoryId="category"
                    />
                </div>
            </div>
        </div>
    </div>
    </ClientOnly>

</template>
<script setup lang="ts">
import ProductsComponent from '../components/products';
import CategoriesComponent from '../components/categories';

const { t } = useI18n({
  useScope: 'local'
})

//const category = ref(null)
const category = useState('icommerce.products.selectedCategory', () => null)

useSeoMeta({
  title: () =>  category.value?.title ||  'Products Site',
  ogTitle: () =>  category.value?.title ||  'Products Site',
  description: () =>  category.value?.description ||  'Description',
  ogDescription: () =>  category.value?.description ||  'Description',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})





const fallbackBanner = '.././assets/img/category.png'
const bannerImage = computed( () =>  {
 return category.value?.mediaFiles?.bannerindeximage.id ? category.value?.mediaFiles?.bannerindeximage.url:  null 
})

</script>
