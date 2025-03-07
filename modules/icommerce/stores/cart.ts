import { defineStore } from 'pinia'
//import { useStorage } from '@vueuse/core'

const storeName = 'cartStore'
export const useCartStore = defineStore(storeName, {  
  state: () => ({
    products: []
  }),
  actions: {
    saveState(){
        ///useStorage(storeName, this.state)


    }
  }
})