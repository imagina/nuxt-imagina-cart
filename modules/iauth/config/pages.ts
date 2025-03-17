const layout = 'icommerce'
const pages = [
    {
        name: 'iauth.login',
        path: '/auth/login',
        page: 'pages/auth/login.vue',
        meta: {
          layout,
          title: 'iauth.cms.sidebar.login',
        },
    },
    
    {
        name: 'iauth.logout',
        path: '/auth/logout',
        page: 'pages/auth/logout.vue',
        meta: {
          layout,
          title: 'iauth.cms.sidebar.logout',
        }
    }
]



export default pages