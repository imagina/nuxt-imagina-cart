<template>    
    <div class="tw-flex tw-gap-16 tw-flex-col tw-items-center">
        <div class="tw-flex tw-gap-3.5 md:tw-gap-[30px] 2xl:tw-w-[1680px] tw-px-3.5">
            <div>
                <categoriesComponent />
            </div>
            <div>
                <div>
                    <img
                        class="
                            tw-h-auto 
                            tw-w-full 
                            tw-rounded
                        "
                        alt="Category"
                        src=".././assets/img/category.png"
                    />
                </div>
                <div class="tw-pt-5 tw-mt-2.5">
                    <span class="tw-text-4xl tw-font-semibold">Hosting Cpanel (PHP)</span>
                    <p class="tw-text-base tw-mt-3.5">
                        CPanel Última versión con Cloudlinux, Softaculous, Imunify360 y JetBackup. Máxima Velocidad con Litespeed Incluido. Ahora con PHP 8!   
                    </p>
                </div>
                <hr  class="tw-my-6" />
                <div class="">
                    <productsComponent/>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">
import productsComponent from '../components/products';
import categoriesComponent from '../components/categories';

const router = ref(useRouter())
</script>