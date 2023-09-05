/*
 * Main and demo navigation arrays
 *
 * 'to' attribute points to the route name, not the path url
 */

export default {
  main: [
     {
      name: "",
      heading: true,
    },
    {
      name: "Dashboard",
      to: "ticketflowplus-dashboard",
      icon: "si si-speedometer",
    },
    {
      name: "",
      heading: true,
    }, {
      name: "",
      heading: true,
    },
    {
      name: "List of Users",
      icon: "fa-solid fa-people-group",
      to: "ticketflowplus-users",
      subActivePaths: "/backend/ticketflowplus-users",
    
    },
    {
      name: "List of Tickets",
      icon: "fa-solid fa-ticket",
      to: "ticketflowplus-tickets-list",
      subActivePaths: "/ticketflowplus/ticketflowplus-tickets-list",
    },
    {
      name: "List of Categories",
      icon: "fa-solid fa-people-group",
      to: "ticketflowplus-categories-list",
      subActivePaths: "ticketflowplus/ticketflowplus-categories-list",
    
    },{
      name: "add new ticket",
      icon: "fa-solid fa-plus",
      to: "ticketflowplus-ticket-add",
      subActivePaths: "ticketflowplus/ticketflowplus-ticket-add",
      
    },{
      name: "add new Category",
      icon: "fa-solid fa-plus",
      to: "ticketflowplus-category-add",
      subActivePaths: "ticketflowplus/ticketflowplus-category-add",
      
    },
    {
      name: "Log Out",
      icon: "si si-lock",
      to: "ticketflowplus-login",
      subActivePaths: "/backend/pages/auth",
    
    },
    
  ],
};
