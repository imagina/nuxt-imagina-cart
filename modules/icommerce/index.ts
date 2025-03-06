
import { createResolver, defineNuxtModule, extendPages } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'icommerce'
  },
  setup(options) {
    const resolver = createResolver(import.meta.url)

    extendPages((pages) => {
      pages.unshift({
        name: 'qcommerce.admin.products',
        path: '/commerce/products',
        /* file is the component/page to render */
        file: resolver.resolve('pages/products.vue'),  // when the page is in inside the module
        //file: '~/pages/coffee.vue',  //when the page is  in absoulte route
        meta: {
          layout: 'icommerce', //  if not defined takes /layout/default
          permission: 'icommerce.products.manage',
          activated: true,
          authenticated: true,
          //crud : import('modules/qblog/_crud/posts'),
          title: 'icommerce.cms.sidebar.adminProducts',
          icon: 'fa-light fa-newspaper',
          subHeader: {
            refresh: true,
          }
        }
       },
       {
        name: 'qcommerce.admin.checkout',
        path: '/commerce/checkout',
        /* file is the component/page to render */
        file: resolver.resolve('pages/checkout.vue'),  // when the page is in inside the module
        //file: '~/pages/coffee.vue',  //when the page is  in absoulte route
        meta: {
          layout: 'icommerce', //  if not defined takes /layout/default
          permission: 'icommerce.checkout.manage',
          activated: true,
          authenticated: true,
          //crud : import('modules/qblog/_crud/posts'),
          title: 'icommerce.cms.sidebar.adminProducts',
          icon: 'fa-light fa-newspaper',
          subHeader: {
            refresh: true,
          }
        }
       }
      )
    })
  }
})