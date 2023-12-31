<script setup>
// importing the ref function from vue and the onMounted function from vue
import { ref, onMounted } from "vue";

// importing Services that wee will use from the services folder
import GlobalService from "@/services/global.service.js";
import UsersService from "@/services/users.service.js";

import { useRoute } from "vue-router";
import BaseHeader from "@/layouts/partials/BaseHeader.vue";

const route = useRoute();
const filter_terme = route.query.filter_terme ? route.query.filter_terme : "";

const users = ref([]);
const isAuthorized = ref(false);
const user_statistics = ref({
     total: 0,
     users: 0,
     responsibles: 0,
});

const orderSearch = ref(false);
const user = GlobalService.getCurrentUser();
const userRole = user.role;

const filters = ref({
     name: {
          value: filter_terme,
          keys: [
               "fullName",
               "phoneNumber",
               "email",
               "role",
               "tickets_count",
               "hiringDate",
               "birthDate",
          ],
     },
});

const getUsers = async () => {
     try {
          const response = await UsersService.getAllUsers(); // Use getAllUsers method
          if (response.data.message == "Unauthorized") {
               return;
          } else {
               isAuthorized.value = true;
               users.value = response.data;
               user_statistics.value.total = response.data.length;
               user_statistics.value.users = response.data.filter(
                    (user) => user.role == "USER"
               ).length;
               user_statistics.value.responsibles = response.data.filter(
                    (user) => user.role == "RESPONSIBLE"
               ).length;
          }
     } catch (error) {
          console.error("Error fetching users:", error);
     }
};

function changUserRole(user_id, oldRole) {
     if (oldRole == "ADMIN") {
          GlobalService.toasterShowWarning(
               `You can't change the role of this user !`
          );
          return;
     }
     const newRole = oldRole == "USER" ? "RESPONSIBLE" : "USER";
     UsersService.changeUserRole(user_id, newRole)
          .then((response) => {
               GlobalService.toasterShowSuccess(
                    `User role changed successfuly !`
               );
               getUsers();
          })
          .catch((error) => {
               console.log(error);
          });
     return;
}

function toTicketList(user_id_tickets, tickets_count) {
     if (tickets_count == 0) {
          GlobalService.toasterShowWarning(`This user have no tickets !`);
          return;
     }
     GlobalService.routerPush("ticketflowplus-tickets-list", null, {
          user_id_tickets: user_id_tickets,
     });
}

onMounted(() => {
     getUsers();
});

var isLoading = ref(true);
setTimeout(() => {
     isLoading.value = false;
}, 200);

const routesfirst2 = ref(["Home", "Users"]);
const routeslast = ref(["users - List"]);

const currentPage = ref(1);
const totalPages = ref(0);
</script>

<template>
     <!-- Hero -->

     <BaseHeader
          title="Users"
          subtitle="List of All users"
          :routesfirst2="routesfirst2"
          :routeslast="routeslast"
     />
     <!-- END Hero -->

     <!-- Page Content -->
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
     <!-- END Page Content -->

     <!-- Page Content -->
     <div v-else class="content">
          <BaseBlock
               :title="`${users.length} User in Total`"
               content-full
               class="animated zoomIn"
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
                         <div
                              class="dropdown d-inline-block"
                              v-if="user.role == 'ADMIN'"
                         >
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
                                        @click="filters.name.value = 'USER'"
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        Users
                                        <span
                                             class="badge bg-primary rounded-pill"
                                        ></span>
                                   </a>
                                   <a
                                        @click="
                                             filters.name.value = 'RESPONSIBLE'
                                        "
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        Responsibles
                                        <span
                                             class="badge bg-primary rounded-pill"
                                        ></span>
                                   </a>
                                   <a
                                        @click="filters.name.value = ''"
                                        class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                        href="javascript:void(0)"
                                   >
                                        All
                                        <span
                                             class="badge bg-primary rounded-pill"
                                        ></span>
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
                    <div class="table-responsive">
                         <v-table
                              class="table  table-hover"
                              :data="users"
                              :filters="filters"
                              sortHeaderClass="flex items-center justify-between w-full"
                              :page-size="7"
                              v-model:currentPage="currentPage"
                              @totalPagesChanged="totalPages = $event"
                         >
                              <template #head>
                                   <tr>
                                        <th>ID</th>
                                        <VTh
                                             style="cursor: pointer"
                                             sortKey="fullName"
                                             >Full_Name</VTh
                                        >
                                        <th class="d-none d-xl-table-cell">
                                             Email
                                        </th>
                                        <VTh
                                             class="text-center"
                                             style="cursor: pointer"
                                             sortKey="role"
                                        >
                                             role
                                        </VTh>
                                        <VTh
                                             class="text-center"
                                             style="cursor: pointer"
                                             sortKey="tickets_count"
                                             >Tickets</VTh
                                        >

                                        <th
                                             class="d-none d-sm-table-cell text-"
                                        >
                                             Actions
                                        </th>
                                   </tr>
                              </template>
                              <template #body="{ rows }">
                                   <tr v-for="user in rows" :key="user.id">
                                        <th>
                                             <a
                                                  class="fw-semibold"
                                                  href="javascript:void(0)"
                                             >
                                                  {{ user.id }}
                                             </a>
                                        </th>
                                        <td style="min-width: 150px">
                                             <a
                                                  class="fw-semibold"
                                                  href="javascript:void(0)"
                                             >
                                                  {{ user.fullName }}
                                             </a>
                                        </td>
                                        <td class="d-none d-xl-table-cell">
                                             <a
                                                  class="fw-semibold"
                                                  href="javascript:void(0)"
                                                  >{{ user.email }}
                                             </a>
                                        </td>
                                        <td class="text-center">
                                             <span
                                                  class="status"
                                                  :class="
                                                       UsersService.getUserRoleClass(
                                                            user.role
                                                       )
                                                  "
                                                  >{{ user.role }}</span
                                             >
                                        </td>
                                        <td
                                             class="text-center"
                                             style="min-width: 150px"
                                        >
                                             <a
                                                  class="badge bg-primary rounded-pill text-center"
                                                  style="cursor: pointer"
                                                  @click="
                                                       toTicketList(
                                                            user.id,
                                                            user.tickets_count
                                                       )
                                                  "
                                                  >{{ user.tickets_count }}</a
                                             >
                                        </td>


                                        <td
                                             class="d-none d-sm-table-cell text-center"
                                        >
                                             <button
                                                  @click="
                                                       changUserRole(
                                                            user.id,
                                                            user.role
                                                       )
                                                  "
                                                  v-if="userRole == 'ADMIN'"
                                                  type="button"
                                                  class="btn btn-sm btn-alt-secondary hover"
                                             >
                                                  <i
                                                       class="fa-solid fa-clock-rotate-left"
                                                  >
                                                  </i>
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
               </template>
          </BaseBlock>
     </div>
     <!-- END Page Content -->
</template>
