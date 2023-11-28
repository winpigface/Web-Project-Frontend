const routes = [
  {
    path: "/",
    component: () => import("layouts/BeforeLogin.vue"),
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
      { path: "/signup", component: () => import("pages/SignupPage.vue") },
    ],
  },
  {
    path: "/laundry",
    component: () => import("layouts/AfterLogin.vue"),
    children: [
      {
        path: "/laundry/dashboard",
        component: () => import("pages/DashbordPage.vue"),
      },
      {
        path: "/laundry/profile",
        component: () => import("pages/UserProfilePage.vue"),
      },
      {
        path: "/laundry/booking",
        component: () => import("pages/BookingPage.vue"),
      },
      {
        path: "/laundry/mywash",
        component: () => import("pages/MywashPage.vue"),
      },
      {
        path: "/laundry/time",
        component: () => import("pages/time.vue"),
      },
      {
        path: "/laundry/report",
        component: () => import("pages/ReportPage.vue"),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '/admin', component: () => import('pages/AdminUsers.vue') },
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
