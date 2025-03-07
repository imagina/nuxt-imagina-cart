const pages = [
    {
        name: 'qcommerce.products',
        path: '/commerce/products',
        page: 'pages/products.vue',
        meta: {
          layout: 'icommerce',
          permission: 'icommerce.products.manage',
          activated: true,
          authenticated: true,
          //crud : import('modules/qblog/_crud/posts'),
          title: 'icommerce.cms.sidebar.adminProducts',
          icon: 'fa-light fa-newspaper',
          subHeader: {
            refresh: true,
          }
        },
    },
    {
        name: 'qcommerce.checkout',
        path: '/commerce/checkout',
        page: 'pages/checkout.vue',
        meta: {
          layout: 'icommerce',
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
]



export default pages