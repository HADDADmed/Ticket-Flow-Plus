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
const user_id_tickets = route.query.user_id_tickets
     ? route.query.user_id_tickets
     : null;  
const filter_terme = route.query.filter_terme ? route.query.filter_terme : "";
const getTickets = async () => {
     try {
          const response = await TicketsService.getAllTickets(user_id_tickets); // Use getAllUsers method
          tickets.value = response.data;
          tickets_count.value = {
               total: response.data.length,
               pending: response.data.filter(
                    (ticket) => ticket.status == "PENDING"
               ).length,
               open: response.data.filter((ticket) => ticket.status == "OPEN")
                    .length,
               closed: response.data.filter(
                    (ticket) => ticket.status == "CLOSED"
               ).length,
          };
     } catch (error) {
          console.error("Error fetching tickets:", error);
     }
};

/// onMounted is a lifecycle hook that runs after the component is mounted (rendered)
onMounted(() => {
     getTickets();
});

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
}, 200);

import BaseHeader from "@/layouts/partials/BaseHeader.vue";
const routesfirst2 = ref(["Home", "Tickets"]);
const routeslast = ref(["tickets - List"]);
const user = JSON.parse(localStorage.getItem("user"));

const tickets_count = ref({
     total: 0,
     pending: 0,
     open: 0,
     closed: 0,
});

///////// filters
const filters = ref({
     name: {
          value: filter_terme,
          keys: [
               "user_fullName",
               "title",
               "description",
               "category_name",
               "status",
          ],
     },
});

const currentPage = ref(1);
const totalPages = ref(0);
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
               :title="`${tickets.length} Ticket in Total` "
               class="animated zoomIn"
               style="width: 100%;"
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
                                        @click="filters.name.value = 'OPEN'"
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        OPEN
                                        <span
                                             class="badge bg-primary rounded-pill"
                                             >{{ tickets_count.open }}</span
                                        >
                                   </a>
                                   <a
                                        @click="filters.name.value = 'PENDING'"
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        PENDING
                                        <span
                                             class="badge bg-primary rounded-pill"
                                             >{{ tickets_count.pending }}</span
                                        >
                                   </a>
                                   <a
                                        @click="filters.name.value = 'CLOSED'"
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        CLOSED
                                        <span
                                             class="badge bg-primary rounded-pill"
                                             >{{ tickets_count.closed }}</span
                                        >
                                   </a>
                                   <a
                                        @click="filters.name.value = ''"
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        All
                                        <span
                                             class="badge bg-primary rounded-pill"
                                             >{{ tickets_count.total }}</span
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
                                             v-model="filters.name.value"
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
                              <v-table
                                   class="table  table-hover "
                                   :data="tickets"
                                   :filters="filters"
                                   sortHeaderClass="flex items-center justify-between w-full"
                                   :page-size="7"
                                   v-model:currentPage="currentPage"
                                   @totalPagesChanged="totalPages = $event"
                              >
                                   <template #head>
                                        <tr>
                                              <VTh
                                                  style="cursor: pointer"
                                                  sortKey="user_fullName"
                                                  >User</VTh
                                             >
                                             <th class="d-none d-sm-table-cell">Title</th>
                                             <VTh
                                                  style="cursor: pointer"
                                                  sortKey="category_name"
                                                  class="d-none d-xl-table-cell"
                                                  >Category</VTh
                                             >
                                             <VTh
                                                  style="cursor: pointer"
                                                  sortKey="status"
                                                  class="text-center"
                                             >
                                                  <a
                                                       @click="
                                                            filters.name.value =
                                                                 ''
                                                       "
                                                       >Status</a
                                                  >
                                             </VTh>
                                             <VTh
                                                  style="cursor: pointer"
                                                  sortKey="comment_count"
                                                  class="d-none d-xl-table-cell text-center"
                                                  >Comments</VTh
                                             >
                                             <VTh
                                                  style="cursor: pointer"
                                                  sortKey="createdAt"
                                                  class="d-none d-sm-table-cell text-center"
                                                  >created_at</VTh
                                             >
                                             <th class="text-center">Actions</th>
                                        </tr>
                                   </template>
                                   <template #body="{ rows }">
                                        <tr
                                             v-for="ticket in rows"
                                             :key="ticket.id"
                                        >
                                            
                                             <td class="">
                                                  <a
                                                       class=" fw-semibold"
                                                       href="javascript:void(0)"
                                                       >{{
                                                            UsersService.getFirstName(
                                                                 ticket.user_fullName
                                                            )
                                                       }}</a
                                                  >
                                             </td>

                                             <td class="d-none d-sm-table-cell">
                                                  <a
                                                       class="fw-semibold "
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
                                                            ticket.category_name
                                                       }}</a
                                                  >
                                             </td>
                                             <td
                                                  class=" text-center"
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
                                                  class="d-none d-xl-table-cell"
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
                                                  class=" text-center"
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
                                   </template>
                              </v-table>
                              <VTPagination
                              class="d-flex justify-content-center"
                                   v-model:currentPage="currentPage"
                                   :total-pages="totalPages"
                                   :boundary-links="true"
                                   :maxPageLinks="3"
                              />
                         </div>
                         <!-- END Recent Orders Table -->
                    </div>
               </template>
          </BaseBlock>
          <!-- END Recent Orders -->
     </div>
     <!-- END Page Content -->
</template>
