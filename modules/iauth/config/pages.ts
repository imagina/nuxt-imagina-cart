const layout = 'blank'
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
  },

  {
    name: 'iauth.register',
    path: '/auth/register',
    page: 'pages/auth/register.vue',
    meta: {
      layout,
      title: 'iauth.cms.sidebar.register',
    },
  },

	{
    name: 'iauth.resetPassword',
    path: '/auth/resetPassword',
    page: 'pages/auth/resetPassword.vue',
    meta: {
      layout,
      title: 'iauth.cms.sidebar.resetPassword',
    },
  },

	{
    name: 'iauth.resetPasswordComplete',
    path: '/auth/resetPasswordComplete/[id]/[token]',
    page: 'pages/auth/resetPasswordComplete/[id]/[token]/resetPasswordComplete.vue',
    meta: {
      layout,
      title: 'iauth.cms.sidebar.resetPasswordComplete',
    },
  }
]



export default pages