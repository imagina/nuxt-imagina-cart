<template>
  <div v-for="product in checkoutProducts">
    <q-card class="tw-p-4 tw-my-4">
      <div class="tw-flex tw-justify-between">
        <div class="">
          <span>{{ product.name }}</span>
        </div>
        <q-select
          v-if="showFrencuency(product)"
          label="Periodo"
          v-model="product.frecuency"
          :options="getFrecuencyOptions(product)"
          option-value="value"
          option-label="label"
        />

        <div class="">
          <q-btn
            icon="fa-solid fa-trash"
            round
            flat
            text-color="primary"
            size="sm"
            @click="$emit('removeProduct', product)"
          />
        </div>
      </div>
      <div>
        frecuency: {{ product?.frecuency?.value }}
      </div>
      <div>
        userPrice: {{ product?.userPrice }}
      </div>
    </q-card>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  products: {
    type: Array,
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

function getFrecuencyOptions(product){
  const option = product.optionsPivot.find((item) => item.optionId == frecuencyId)

  const options = option?.productOptionValues.filter((item) => item.optionId == frecuencyId && item.price > 1).map((item) =>  {
    return { label: item.optionValue, value: item.price, id: item.id }
  })

  console.log(options)

  return options
}

</script>

<style>

</style>