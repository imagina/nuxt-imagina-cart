<template>
        <div class="">
            <h1 class="tw-text-4xl tw-font-bold">Tu Carrito</h1>
            <div class="card tw-rounded-lg tw-px-5 tw-pt-7 tw-pb-5">
                <h2 
                    class="
                        tw-font-semibold 
                        tw-text-[22px] 
                        tw-m-0 
                        tw-p-0
                        tw-leading-5
                    "
                >
                    Título del plan de hosting
                </h2>
                <hr class="tw-w-full tw-bg-[#E1E3E7] tw-mt-5 tw-mb-10" />
                <div class="tw-flex tw-justify-between">
                    <section>
                        <span class="tw-text-xs tw-text-[#818181]">
                            Renuevas a $00.000/mes el 00/00/000. ¡Cancela cuando quieras!
                        </span>
                        <div class="tw-mt-5">
                            <i class="tw-text-[#444444] tw-text-[13px]" name="" />
                            <div 
                                class="
                                    tw-py-2.5 
                                    tw-px-3.5 
                                    tw-rounded-md 
                                    tw-bg-[#FFAB404D]
                                    tw-w-fit
                                    tw-text-[13px]
                                "
                            >
                                <span>Adquiere el dominio gratis por planes mayores a 12 meses</span>
                            </div>
                        </div>
                    </section>
                    <section class="tw-flex tw-items-start tw-gap-[30px]">
                        <div class="tw-flex tw-flex-col">
                            <span class="tw-text-[13px] tw-text-[#444444]">Tarifa de configuración:</span>
                            <span class="tw-text-lg tw-font-semibold">$000.000 COP</span>
                        </div>
                        <div class="tw-w-fit tw-px-4 tw-py-2.5 tw-rounded-full tw-border tw-border-[#00000033]">
                            <span class="tw-text-lg tw-font-semibold">$000.000 COP/mes</span>
                        </div>
                    </section>
                </div>
            </div>
            <div v-for="product in cartState.products" >
                <q-btn
                    :label="product.id"
                    @click="removeProduct(product)"
                />
            </div>
        </div>
</template>
<script setup>

import { useStorage } from '@vueuse/core'

const cartState = useStorage('cart', {products: []})
const router = useRouter()

function removeProduct(product){
    const products = cartState.value.products.filter(obj => obj.id != product.id);
    cartState.value = {products: products}

    if(cartState.value.products.length == 0){
        router.push({ path: '/commerce/products'})
    }
}


</script>
<style>
.card {
    box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.07), 0px 3.85185px 33.1259px rgba(0, 0, 0, 0.0425185), 0px 0.814815px 8.47407px rgba(0, 0, 0, 0.0274815);
}
</style>