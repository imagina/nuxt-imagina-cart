const layout = 'icommerce'
const pages = [
  {
    name: 'icommerce.products',
    path: '/commerce/products',
    paths:{
      es: '/tienda/productos',
      en: '/store/products',
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
    path: '/commerce/cart',
    paths:{
      es: '/tienda/carrito',
      en: '/store/cart',
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