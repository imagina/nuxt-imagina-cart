const layout = 'icommerce'
const pages = [
  {
    name: 'icommerce.products',
    path: '/products',
    paths:{
      es: '/productos',
      en: '/products',
    },    
    page: 'pages/products.vue',
    meta: {
      layout,
      title: 'icommerce.cms.sidebar.adminProducts',
      breadcrumb: 'Productos'
    },
  },

  {
    name: 'icommerce.cart',
    path: '/cart',
    paths:{
      es: '/carrito',
      en: '/cart',
    },
    page: 'pages/cart.vue',
    meta: {
      layout,
      title: 'icommerce.cms.sidebar.cart',
      breadcrumb: 'Carrito'
    }
  },

  {
    name: 'icommerce.checkout',
    path: '/checkout',
    page: 'pages/checkout.vue',
    meta: {
      layout,
      title: 'icommerce.cms.sidebar.checkout',
      breadcrumb: 'Checkout'
    }
  }
]



export default pages