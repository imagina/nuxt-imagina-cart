const layout = 'icommerce'
const pages = [
  {
    name: 'icommerce.products',
    path: '/commerce/products',
    page: 'pages/products.vue',
    meta: {
      layout,
      title: 'icommerce.cms.sidebar.adminProducts',
      breadcrumb: 'Productos'
    },
  },

  {
    name: 'icommerce.cart',
    path: '/commerce/cart',
    page: 'pages/cart.vue',
    meta: {
      layout,
      title: 'icommerce.cms.sidebar.cart',
      breadcrumb: 'Carrito'
    }
  },

  {
    name: 'icommerce.checkout',
    path: '/commerce/checkout',
    page: 'pages/checkout.vue',
    meta: {
      layout,
      title: 'icommerce.cms.sidebar.checkout',
      breadcrumb: 'Checkout'
    }
  }
]



export default pages