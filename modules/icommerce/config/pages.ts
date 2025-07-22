const layout = 'icommerce'
//mport page from '../pages/products/[[slug]]/index.vue'
const pages = [
/*
  {
    name: 'icommerce.products',
    path: '/products/',
    
    //page: 'pages/products.vue',
    page: 'pages/products.vue',
    meta: {
      layout,
      title: 'icommerce.cms.sidebar.adminProducts',
      breadcrumb: 'Productos'
    },
  },  
  */

  
  {
    name: 'icommerce.products',
    path: '/products/:slug?',
    paths:{
      es: '/productos/:slug',
      en: '/products/:slug',
    },    
    //page: 'pages/products.vue',
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
      breadcrumb: 'Pago'
    }
  }
]



export default pages