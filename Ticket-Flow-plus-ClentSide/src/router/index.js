import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "nprogress/nprogress.js";



function guardMyroute(to, from, next) {
    if(to.name !== 'ticketflowplus-login' && !localStorage.getItem('accessToken')){
        next({ name: 'ticketflowplus-login' })
    }else if(to.name === 'ticketflowplus-login' && localStorage.getItem('accessToken')){
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
        next({ name: 'ticketflowplus-login' })
    }else{
        next() 
    } 
}

function lazyLoad(Folder,view){
  if(Folder === 'null') return() => import(`@/views/TicketsFlowPlusViews/${view}.vue`)
  else return() => import(`@/views/TicketsFlowPlusViews/${Folder}/${view}.vue`)
}

function lazyLoadLayout(view){
 return() => import(`@/layouts/variations/${view}.vue`)
}


// Set all routes
const routes = [
  {
    path: '/401',
    name: '401',
    component: lazyLoad('ErorsPages','401View'),
  },
  {
    path: "/login",
    name: "ticketflowplus-login",
    component: lazyLoad('Auth','LoginPage'),
  },
{
  path: "/ticketflowplus",
  redirect: "/ticketflowplus/ticketflowplus-dashboard",
  component: lazyLoadLayout('TicketsFlowPlus'),
  children: [
    {
    path: "/",
    name: "landing",
    component: lazyLoad('null','DashboardView'),
  
    },
    {
      path: "ticketflowplus-dashboard",
      name: "ticketflowplus-dashboard",
      component: lazyLoad('null','DashboardView'),
    },
    {
      path: "ticketflowplus-users-list",
      name: 'ticketflowplus-users-list',
      component: lazyLoad('ListsOfElements','UsersList')
    }, 
    {
      path: "ticketflowplus-tickets-list",
      name: 'ticketflowplus-tickets-list',
      component: lazyLoad('ListsOfElements','TicketList')
    },
    {
      path: "ticketflowplus-categories-list",
      name: 'ticketflowplus-categories-list',
      component: lazyLoad('ListsOfElements','CategoriesList')
  
    },{
      path: "ticketflowplus-ticket-add",
      name: "ticketflowplus-ticket-add",
      component: lazyLoad('AddNewElement','addTicket'),
    },{
      path: "ticketflowplus-category-add",
      name: "ticketflowplus-category-add",
      component: lazyLoad('AddNewElement','addCategory'),
    },{
      path: "ticketflowplus-user-add",
      name: "ticketflowplus-user-add",
      component: lazyLoad('AddNewElement','addUser'),
    },{
      path: "ticketflowplus-ticket-oneticketpage",
      name: "ticketflowplus-ticket-oneticketpage",
      component: lazyLoad('Ticket','oneTicketPage'),
    }


    // end

  ],
}
  
];

// Create Router
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});


// set guardMyroute to all routes
router.beforeEach(guardMyroute)

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;
