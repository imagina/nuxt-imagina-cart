<template>
  <div v-for="product in products">
    <q-card class="tw-p-4 tw-my-4">
      <div class="tw-flex tw-justify-between">
        <div class="">
          <span>{{ product.name }}</span>
        </div>
        <div v-html="product.description">
        </div>
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
        <pre lang="json">{{ product }}</pre>
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

</script>

<style>

</style>