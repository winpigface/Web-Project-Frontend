const routes = [
  {
    path: "/",
    component: () => import("layouts/BeforeLogin.vue"),
    children: [
<<<<<<< HEAD
      { path: '', component: () => import('pages/IndexPage.vue') },

    ]
=======
      { path: "", component: () => import("pages/LoginPage.vue") },
      { path: "/signup", component: () => import("pages/SignupPage.vue") },
    ],
  },
  {
    path: "/laundry",
    component: () => import("layouts/AfterLogin.vue"),
    children: [
      {
        path: "/laundry/dashbord",
        component: () => import("pages/DashbordPage.vue"),
      },
      {
        path: "/laundry/booking",
        component: () => import("pages/BookingPage.vue"),
      },
    ],
>>>>>>> f5ee6c87a901602b91f053e1419e04046f344baf
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
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
