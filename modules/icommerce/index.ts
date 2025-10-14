
import { addLayout, createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

import pagesConfig from './config/pages.ts'

export default defineNuxtModule({
  meta: {
    name: '@icommerce'
  },
  setup(options) {
    const resolver = createResolver(import.meta.url)
    
    addLayout({
      src: resolver.resolve('layouts/icommerce.vue'), 
      filename: 'icommerce.vue'
    }, 'icommerce')

    addLayout({
      src: resolver.resolve('layouts/cart.vue'), 
      filename: 'cart.vue'
    }, 'cart')
    
    extendPages((pages) => {      
      pagesConfig.forEach((page) => {        
        pages.unshift({
          name: page.name,
          path: page?.path || '',
          // alias: page?.paths ? Object.values(page.paths) : '',   /* multi lang paths experimental*/
          /* file is the component/page to render */
          file: resolver.resolve(page.page),  // when the page is in inside the module
          //file: '~/pages/coffee.vue',  //when the page is  in absoulte route
          meta: { ...page?.meta, paths: page?.paths || ''} 
        })

      })
      
     
    })
  }
})