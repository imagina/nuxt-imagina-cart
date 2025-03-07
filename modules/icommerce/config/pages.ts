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
        name: 'icommerce.checkout',
        path: '/commerce/checkout',
        page: 'pages/checkout.vue',
        meta: {
          layout,
          title: 'icommerce.cms.sidebar.adminProducts',
        }
    }
]



export default pages