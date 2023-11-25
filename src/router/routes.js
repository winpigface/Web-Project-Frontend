
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
      { path: '/admin/users', component: () => import('pages/AdminPage/AdminUsers.vue') },
      { path: '/admin/washmachine', component: () => import('pages/AdminPage/AdminWash.vue') },

      { path: '/admin/booking', component: () => import('pages/AdminPage/AdminBooking.vue') },
      { path: '/admin/report', component: () => import('pages/AdminPage/AdminReport.vue') }

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
