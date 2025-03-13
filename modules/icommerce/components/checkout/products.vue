<template>
  <div v-for="product in checkoutProducts">
    <div class="card tw-rounded-[20px] tw-px-5 tw-pt-7 tw-pb-5 tw-my-5">
      <div class="tw-flex tw-justify-between tw-items-center">
        <h2 
          class="
            tw-font-semibold 
            tw-text-[22px] 
            tw-m-0 
            tw-p-0
            tw-leading-5
          "
        >
          {{ product.name }}
        </h2>
        <q-btn      
          icon="fa-solid fa-trash"
          round
          flat
          text-color="primary"
          size="sm"
          @click="$emit('removeProduct', product)"
        />
      </div>
      <hr class="tw-w-full tw-bg-[#E1E3E7] tw-mt-5 tw-mb-10" />
      <div class="tw-flex tw-justify-between tw-gap-5">
        <section>
          <q-select 
            v-if="showFrencuency(product)"
            v-model="product.frecuency"
            :options="getFrecuencyOptions(product)"
            option-value="value"
            option-label="label"
            outlined
            class="tw-w-52 tw-mb-1 tw-rounded-lg"
            input-class="tw-w-52 tw-mb-1 tw-rounded-lg"            
            label="Periodo" 
          />
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
              <span class="tw-text-[#444444]">Adquiere el dominio gratis por planes mayores a 12 meses</span>
            </div>
          </div>
        </section>
        <section class="tw-flex tw-items-start tw-gap-[30px] tw-text-[#444444]">
          <div class="tw-flex tw-flex-col">
            <span class="tw-text-[13px]">Tarifa de configuración:</span>
            <span class="tw-text-lg tw-font-semibold">$000.000 COP</span>
          </div>
          <div class="tw-w-fit tw-px-4 tw-py-1.5 tw-rounded-full tw-border tw-border-[#00000033]">
            <span class="tw-text-lg tw-font-semibold">${{ showPrice(product) }} {{ currency}}/mes</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const model = ref('1 Mes')
const options = ref(['1 Mes', '2 Meses', '3 Meses', '4 Meses', '5 Meses'])

const props = defineProps({
  products: {
    type: Array,
    required: false
  }, 
  currency: {
    type: String, 
    required: false
  }
});
const emits = defineEmits(['removeProduct'])


const frecuencyId = 1 //frecuency option
const checkoutProducts = ref()


onMounted(() => {
  init()
})

watch(
  () => props.products,
  (newQuery, oldQuery) => {
    configProducts()
  },
)



function init(){
  configProducts()
}

function configProducts(){
  checkoutProducts.value = props.products

  checkoutProducts.value.forEach((product) =>{
    if(showFrencuency(product)){
      product.frecuency = getFrecuencyOptions(product)[0] || null
    }
  })

}

function showFrencuency(product){
  return product?.optionsPivot.length || false
}

function showPrice(product){
  return showFrencuency(product) ? product.frecuency.value : product.price

}

function getFrecuencyOptions(product){
  const option = product.optionsPivot.find((item) => item.optionId == frecuencyId)

  const options = option?.productOptionValues.filter((item) => item.optionId == frecuencyId && item.price > 1).map((item) =>  {
    return { label: item.optionValue, value: item.price, id: item.id }
  }) 

  return options
}

</script>

<style>
.card {
  box-shadow: 0px 10px 104px rgba(0, 0, 0, 0.07), 0px 3.85185px 33.1259px rgba(0, 0, 0, 0.0425185), 0px 0.814815px 8.47407px rgba(0, 0, 0, 0.0274815);
}
</style>