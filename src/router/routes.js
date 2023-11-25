
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/admin/users', component: () => import('pages/AdminUsers.vue') },
      { path: '/admin/washmachine', component: () => import('pages/AdminWash.vue') },

      { path: '/admin/booking', component: () => import('pages/AdminBooking.vue') },
      { path: '/admin/report', component: () => import('pages/AdminReport.vue') }

    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
