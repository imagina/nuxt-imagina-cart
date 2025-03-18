const layout = 'icommerce'
const pages = [
    {
        name: 'icommerce.products',
        path: '/commerce/products',
        page: 'pages/products.vue',
        meta: {
          layout,
          title: 'icommerce.cms.sidebar.adminProducts',
        },
    },

    {
      name: 'icommerce.cart',
      path: '/commerce/cart',
      page: 'pages/cart.vue',
      meta: {
        layout,
        title: 'icommerce.cms.sidebar.cart',
      }
  },



    {
        name: 'icommerce.checkout',
        path: '/commerce/checkout',
        page: 'pages/checkout.vue',
        meta: {
          layout,
          title: 'icommerce.cms.sidebar.checkout',
        }
    }
]



export default pages