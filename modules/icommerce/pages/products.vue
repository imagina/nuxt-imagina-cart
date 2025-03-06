<template>    
        <div class="tw-flex">
            <div>
                <categories />
            </div>
            <div>		
                <div>
                    <img 
                        class="tw-h-auto tw-max-w-full tw-rounded"
                        alt="Category"
                        src=".././assets/img/category.png" 
                    />
                </div>
                <div class="tw-my-[14px]">
                    <span class="tw-text-[30px] tw-font-[800]">Hosting Cpanel (PHP)</span>
                    <p class="tw-py-[18px]">
                        CPanel Última versión con Cloudlinux, Softaculous, Imunify360 y JetBackup. Máxima Velocidad con Litespeed Incluido. Ahora con PHP 8!   
                    </p>
                </div>
                <hr  class="tw-my-[18px]" />
                <div class="">
                    <ProductsComponent/>        
                </div>
            </div>
        </div>

</template>
<script setup lang="ts">
import ProductsComponent from '../components/products';
import categories from '../components/categories';

const router = ref(useRouter())
</script>