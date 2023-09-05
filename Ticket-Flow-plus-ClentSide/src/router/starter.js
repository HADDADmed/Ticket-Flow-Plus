import { createRouter, createWebHashHistory } from "vue-router";

import NProgress from "nprogress/nprogress.js";

// Main layouts
import LayoutBackend from "@/layouts/variations/BackendStarter.vue";
import LayoutSimple from "@/layouts/variations/Simple.vue";

// Frontend: Landing
const Landing = () => import("@/views/starter/LandingView.vue");

// Backend: Dashboard
const Dashboard = () => import("@/views/starter/DashboardView.vue");

// TicketsFlowPlus Layout 
import TicketsFlowPlus from "@/layouts/variations/TicketsFlowPlus.vue";

// TicketsFlowPlusViews
const UsersList = () => import("@/views/TicketsFlowPlusViews/ListsOfElements/UsersList.vue");
const TicketList = () => import("@/views/TicketsFlowPlusViews/ListsOfElements/TicketList.vue");
const CategoriesList = () => import("@/views/TicketsFlowPlusViews/ListsOfElements/CategoriesList.vue");
const DashboardView = () => import("@/views/TicketsFlowPlusViews/DashboardView.vue");
const LoginPage = () => import("@/views/TicketsFlowPlusViews/Auth/LoginPage.vue");
const TicketAdd = () => import("@/views/TicketsFlowPlusViews/AddNewElement/addTicket.vue");



// Set all routes
const routes = [
  
  {
    path: "/",
    redirect: "/TicketsFlowPlusViews/TicketsFlowPlusViews-dashboard",
    component: TicketsFlowPlus,
    children: [
      {
        path: "dashboard",
        name: "ticketflowplus-dashboard",
        component: DashboardView,
      },
    ],
  },
];

// Create Router
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "active",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeResolve((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;
