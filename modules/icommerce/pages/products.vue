<template>
    <div class="tw-flex tw-gap-16 tw-flex-col tw-items-center tw-py-8">
        <div 
            class="
                tw-flex 
                tw-gap-3.5 
                md:tw-gap-[30px] 
                tw-max-w-[1680px] 
                tw-px-3.5
            "
        >
            <div>
                <CategoriesComponent 
                    @selectedCategory="(value) => category = value"
                />
            </div>
            <div>
                <div>
                    <img 
                        v-if="bannerImage"
                        class="
                            tw-h-auto 
                            tw-w-full 
                            tw-rounded
                        "
                        alt="Category"
                        :src="bannerImage"
                    />
                    <img 
                        v-else                      
                        class="
                            tw-h-auto 
                            tw-w-full 
                            tw-rounded
                        "
                        alt="Category"
                        src=".././assets/img/category.png"
                    />
                </div>
                <div class="tw-pt-5 tw-mt-2.5" v-if="category">
                    <span class="tw-text-4xl tw-font-semibold">{{ category.title }}</span>
                    <p v-html="category.description" class="tw-text-base tw-mt-3.5">                        
                    </p>
                </div>
                <hr  class="tw-my-6" />
                <div class="">                    
                    <ProductsComponent
                        :categoryId="category"
                    />
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import ProductsComponent from '../components/products';
import CategoriesComponent from '../components/categories';

useSeoMeta({
  title: 'Products Site',
  ogTitle: 'Products Site',
  description: 'Products Site',
  ogDescription: 'Products Site',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})



const { t } = useI18n({
  useScope: 'local'
})



//const category = ref(null)
const category = useState('icommerce.products.selectedCategory', () => null)

const fallbackBanner = '.././assets/img/category.png'
const bannerImage = computed( () => category.value?.mediaFiles?.bannerindeximage.url && category.value?.mediaFiles?.bannerindeximage.id|| null )

</script>

<i18n lang="json">
    {
        "en": {
            "title": "Hosting Cpanel (PHP)", 
            "description": "CPanel Latest version with CloudLinux, Softaculous, Imunify360, and JetBackup. Maximum speed with Litespeed included. Now with PHP 8!"            
        },
        "es": {
            "title": "Hosting Cpanel (PHP)",
            "description": "CPanel Última versión con Cloudlinux, Softaculous, Imunify360 y JetBackup. Máxima Velocidad con Litespeed Incluido. Ahora con PHP 8!"
        }
    }
</i18n>