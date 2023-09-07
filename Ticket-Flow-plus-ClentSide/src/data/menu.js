
const user = JSON.parse(localStorage.getItem("user"));

const role = user.role;

var menu = [];
if(role == "ADMIN"){
      menu = [
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
         to: "ticketflowplus-users-list",
         subActivePaths: "/ticketflowplus/ticketflowplus-users-list",
       
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
         
       },{
        name: "add new User",
        icon: "fa-solid fa-plus",
        to: "ticketflowplus-user-add",
        subActivePaths: "ticketflowplus/ticketflowplus-user-add",
        
      },
       {
         name: "",
         heading: true,
       }, {
         name: "",
         heading: true,
       },
       {
         name: "Log Out",
         icon: "si si-lock",
         to: "ticketflowplus-login",
         subActivePaths: "/backend/pages/auth",
       
       },
       
     ]
    }else if(role == "USER")
    {
      menu = [
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
         
       },
       {
         name: "",
         heading: true,
       }, {
         name: "",
         heading: true,
       },
       {
         name: "Log Out",
         icon: "si si-lock",
         to: "ticketflowplus-login",
         subActivePaths: "/backend/pages/auth",
       
       },
       
     ]

    } else if(role == "RESPONSIBLE")
    {menu = [
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
       to: "ticketflowplus-users-list",
       subActivePaths: "/ticketflowplus/ticketflowplus-users-list",
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
     
     },
     {
       name: "",
       heading: true,
     }, {
       name: "",
       heading: true,
     },
     {
       name: "Log Out",
       icon: "si si-lock",
       to: "ticketflowplus-login",
       subActivePaths: "/backend/pages/auth",
     
     },
     
   ]
  }
      
export default {
  main: menu
};
