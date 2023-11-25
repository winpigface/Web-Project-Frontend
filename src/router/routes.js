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
        path: "/laundry/dashbord",
        component: () => import("pages/DashbordPage.vue"),
      },
      {
        path: "/laundry/booking",
        component: () => import("pages/BookingPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
