<script setup>
import { onMounted, reactive, ref } from "vue";

// importing the global.servise to use the global  fnctions
import GlobalService from "@/services/global.servise.js";

import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
/// import the layout header component

// fetching the list of users from the server by using UsersService
import TicketsService from "@/services/tickets.service.js";
import UsersService from "@/services/users.service.js";

import { createToaster } from "@meforma/vue-toaster";



const toaster = createToaster({});
const tickets = ref([]);
const orderSearch = ref(false);
const user_id_tickets = route.query.user_id_tickets? route.query.user_id_tickets : null;
const getTickets = async () => {
     try {
          const response = await TicketsService.getAllTickets(user_id_tickets); // Use getAllUsers method
          tickets.value = response.data;
     } catch (error) {
          console.error("Error fetching tickets:", error);
     }
};

/// onMounted is a lifecycle hook that runs after the component is mounted (rendered)
onMounted(() => {
     getTickets();
});

/// tableTrs is a reactive jason array that contains the table headers
const tableTrs = ref([
     {
          name: "(ticket,user)_id",
          class: "",
     },
     {
          name: "FirstName",
          class: "d-none d-sm-table-cell",
     },
     {
          name: "title",
          class: "",
     },
     {
          name: "Content",
          class: "d-none d-md-table-cell",
     },
     {
          name: "category name",
          class: "d-none d-md-table-cell",
     },
     {
          name: "status",
          class: "d-none d-sm-table-cell text-center",
     },
     {
          name: "comments",
          class: "d-none d-sm-table-cell",
     },
     {
          name: "created_at",
          class: "d-none d-sm-table-cell",
     },
     {
          name: "actions",
          class: "d-none d-sm-table-cell",
     },
]);

function deleteTicket() {}

function toOneTicketPage(ticket_id2) {
     router.push({
          name: "ticketflowplus-ticket-oneticketpage",
          query: { ticket_id: ticket_id2 },
     });
}

var isLoading = ref(true);
setTimeout(() => {
     isLoading.value = false;
}, 500);

import BaseHeader from "@/layouts/partials/BaseHeader.vue";
const routesfirst2 = ref(["Home", "Tickets"]);
const routeslast = ref(["tickets - List"]);
const user = JSON.parse(localStorage.getItem("user"));
</script>

<template>
     <!-- Hero -->

     <BaseHeader
          title="Ticket List"
          :subtitle="
               user.role == 'ADMIN' || user.role == 'RESPONSIBLE'
                    ? 'All tickets of All Users'
                    : `All tickets of ${user.fullName}`
          "
          :routesfirst2="routesfirst2"
          :routeslast="routeslast"
     />

     <!-- END Hero -->

     <!-- Page Content -->
     <div class="content">
          <!-- Overview -->

          <!-- END Overview -->

          <div
               v-if="isLoading"
               style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    margin-top: 60px;
               "
          >
               <div class="col-6 col-md-3">
                    <div class="block-content block-content-full">
                         <i class="fa fa-4x fa-cog fa-spin"></i>
                    </div>
               </div>
          </div>
          <!-- Recent Orders -->
          <BaseBlock
               v-else
               title="Tickets List"
               class="animated zoomIn"
               style="width: 100%; sa"
          >
               <template #options>
                    <div class="space-x-1">
                         <button
                              type="button"
                              class="btn btn-sm btn-alt-secondary"
                              @click="
                                   () => {
                                        orderSearch = !orderSearch;
                                   }
                              "
                         >
                              <i class="fa fa-search"></i>
                         </button>
                         <div class="dropdown d-inline-block">
                              <button
                                   type="button"
                                   class="btn btn-sm btn-alt-secondary"
                                   id="dropdown-recent-orders-filters"
                                   data-bs-toggle="dropdown"
                                   aria-haspopup="true"
                                   aria-expanded="false"
                              >
                                   <i class="fa fa-fw fa-flask"></i>
                                   Filters
                                   <i class="fa fa-angle-down ms-1"></i>
                              </button>
                              <div
                                   class="dropdown-menu dropdown-menu-md dropdown-menu-end fs-sm"
                                   aria-labelledby="dropdown-recent-orders-filters"
                              >
                                   <a
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        Pending
                                        <span
                                             class="badge bg-primary rounded-pill"
                                             >{20}</span
                                        >
                                   </a>
                                   <a
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        Active
                                        <span
                                             class="badge bg-primary rounded-pill"
                                             >72</span
                                        >
                                   </a>
                                   <a
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        Completed
                                        <span
                                             class="badge bg-primary rounded-pill"
                                             >890</span
                                        >
                                   </a>
                                   <a
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        All
                                        <span
                                             class="badge bg-primary rounded-pill"
                                             >997</span
                                        >
                                   </a>
                              </div>
                         </div>
                    </div>
               </template>

               <template #content>
                    <div
                         v-if="orderSearch"
                         id="one-dashboard-search-orders"
                         class="block-content border-bottom"
                    >
                         <!-- Search Form -->
                         <form @submit.prevent>
                              <div class="push">
                                   <div class="input-group">
                                        <input
                                             type="text"
                                             class="form-control form-control-alt"
                                             id="one-ecom-orders-search"
                                             name="one-ecom-orders-search"
                                             placeholder="Search all orders.."
                                        />
                                        <span
                                             class="input-group-text bg-body border-0"
                                        >
                                             <i class="fa fa-search"></i>
                                        </span>
                                   </div>
                              </div>
                         </form>
                         <!-- END Search Form -->
                    </div>
                    <div class="block-content block-content-full">
                         <!-- Recent Orders Table -->
                         <div class="table-responsive">
                              <table class="table table-hover table-vcenter">
                                   <thead>
                                        <tr>
                                             <th
                                                  v-for="tableTr in tableTrs"
                                                  :class="tableTr.class"
                                                  style="font-size: 12px"
                                             >
                                                  {{ tableTr.name }}
                                             </th>
                                        </tr>
                                   </thead>
                                   <tbody class="fs-sm">
                                        <tr v-for="ticket in tickets">
                                             <td>
                                                  <a
                                                       style="margin-left: 25px"
                                                       class="fw-semibold"
                                                       href="javascript:void(0)"
                                                  >
                                                       #{{ ticket.id }} , #{{
                                                            ticket.user_id
                                                       }}
                                                  </a>
                                             </td>

                                             <td class="d-xl-table-cell">
                                                  <a
                                                       class="d-none d-sm-table-cell fw-semibold"
                                                       href="javascript:void(0)"
                                                       >{{
                                                            UsersService.getFirstName(
                                                                 ticket.user_fullName
                                                            )
                                                       }}</a
                                                  >
                                             </td>

                                             <td class="">
                                                  <a
                                                       class="fw-semibold"
                                                       href="javascript:void(0)"
                                                       >{{
                                                            GlobalService.shortDescription(
                                                                 ticket.title
                                                            )
                                                       }}</a
                                                  >
                                             </td>
                                             <td class="d-none d-xl-table-cell">
                                                  <a
                                                       class="fw-semibold"
                                                       href="javascript:void(0)"
                                                       >{{
                                                            GlobalService.removeHTMLTags(
                                                                 GlobalService.shortDescription(
                                                                      ticket.description
                                                                 )
                                                            )
                                                       }}</a
                                                  >
                                             </td>

                                             <td class="d-none d-xl-table-cell">
                                                  <a
                                                       class="fw-semibold"
                                                       href="javascript:void(0)"
                                                       >{{
                                                            ticket.category_name
                                                       }}</a
                                                  >
                                             </td>
                                             <td
                                                  class="d-none d-sm-table-cell text-center"
                                             >
                                                  <span
                                                       class="status"
                                                       :class="
                                                            UsersService.getUserStatusClass(
                                                                 ticket.status
                                                            )
                                                       "
                                                       >{{
                                                            ticket.status
                                                       }}</span
                                                  >
                                             </td>
                                             <td
                                                  style="text-align: center"
                                                  class="d-none d-sm-table-cell"
                                             >
                                                  <a
                                                       class="fw-semibold"
                                                       href="javascript:void(0)"
                                                       >{{
                                                            ticket.comment_count
                                                       }}</a
                                                  >
                                             </td>
                                             <td
                                                  style="
                                                       text-align: center;
                                                       font-size: 13px;
                                                  "
                                                  class="d-none d-sm-table-cell fw-semibold text-muted text-center"
                                             >
                                                  <a href="javascript:void(0)">
                                                       {{
                                                            GlobalService.formatDate(
                                                                 ticket.createdAt
                                                            )
                                                       }}
                                                  </a>
                                             </td>
                                             <td
                                                  class="d-none d-sm-table-cell text-center"
                                             >
                                                  <button
                                                       @click="
                                                            toOneTicketPage(
                                                                 ticket.id
                                                            )
                                                       "
                                                       type="button"
                                                       class="btn btn-sm btn-alt-secondary hover"
                                                  >
                                                       <i
                                                            class="fa fa-fw fa-pencil-alt"
                                                       ></i>
                                                  </button>
                                                  <button
                                                       type="button"
                                                       class="btn btn-sm btn-alt-secondary hover"
                                                  >
                                                       <i
                                                            class="fa fa-fw fa-times"
                                                       ></i>
                                                  </button>
                                             </td>
                                        </tr>
                                   </tbody>
                              </table>
                         </div>
                         <!-- END Recent Orders Table -->
                    </div>
               </template>
          </BaseBlock>
          <!-- END Recent Orders -->
     </div>
     <!-- END Page Content -->
</template>
