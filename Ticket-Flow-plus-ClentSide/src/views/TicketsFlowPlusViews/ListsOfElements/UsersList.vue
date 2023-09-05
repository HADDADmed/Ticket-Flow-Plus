<script setup>
import {reactive, ref } from "vue";

// vue-chartjs, for more info and examples you can check out https://vue-chartjs.org/ and http://www.chartjs.org/docs/ -->
import { Line, Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";
// define the orderSearch variable
const orderSearch = ref(false);

import BackenfLayoutHeaderStaticDarkView from "@/views/backend/layout/header/StaticDarkView.vue";
// importing the global.servise to use the global  fnctions
import GlobalService from "@/services/global.servise.js";

// fetching the list of users from the server by using UsersService
import UsersService from "@/services/users.service.js";
import Eror401Vue from "@/views/TicketsFlowPlusViews/ErorsPages/401View.vue";

const users = ref([]);
const isAuthorized = ref(false);
const getUsers = async () => {
     try {
          const response = await UsersService.getAllUsers(); // Use getAllUsers method
          if (response.data.message == "Unauthorized") {
               return;
          } else {
               isAuthorized.value = true;
               users.value = response.data;
          }
     } catch (error) {
          console.error("Error fetching users:", error);
     }
};

onMounted(() => {
     getUsers();
});

/// tableTrs is a reactive jason array that contains the table headers


const tableTrs = ref([
     {
          name: "User_ID",
          class: "d-none d-xl-table-cell",
          sort: ""
     },
     {
          name: "Full_Name",
          class: "d-none d-sm-table-cell text-center",
          sort: ""
     },
     {
          name: "phone",
          class: "d-none d-sm-table-cell text-center",
          sort: ""         
     },
     {
          name: "Email",
          class: "d-none d-sm-table-cell text-center",
          sort: ""
     },
     {
          name: "Role",
          class: "text-center",
          sort: ""
     },
     {
          name: "Tickets",
          class: "d-none d-sm-table-cell text-center",
          sort: ""
     },
     {
          name: "Hiring ",
          class: "d-none d-sm-table-cell text-center",
          sort: ""
     },
     {
          name: "Birth",
          class: "d-none d-sm-table-cell text-center",
          sort: ""
     },
     {
          name: "Actions",
          class: "d-none d-sm-table-cell text-center",
          sort: ""
     },
]);
          const cols = reactive([
              {
               name: "Full_Name",
               field: "name",
               sort: "",
               },{
               name: "Phone",
               field: "phone",
               sort: "",
               },
               {
               name: "Email",
               field: "email",
               sort: "",
               },
               {
               name: "Role",
               field: "role",
               sort: "",
               },
               {
               name: "Tickets",
               field: "tickets_count",
               sort: "",
               },
               {
               name: "Hiring date",
               field: "hiringdate",
               sort: "",
               },{
               name: "Birth date",
               field: "birthdate",
               sort: "",
               },{
               name: "Actions",
               field: "action",
               sort: "",
               },
               ]);

var isLoading = ref(true);
setTimeout(() => {
     isLoading.value = false;
}, 500);

import BaseHeader from "@/layouts/partials/BaseHeader.vue";
const routesfirst2 = ref(["Home", "Users"]);
const routeslast = ref(["users - List"]);



////////////////////////////////////////////////////
import { computed, onMounted } from "vue";

// Vue Dataset, for more info and examples you can check out https://github.com/kouts/vue-dataset/tree/next
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";

// Get example data
import users2 from "@/data/usersDataset.json";

// Helper variables

// Sort by functionality
const sortBy = computed(() => {
  return cols.reduce((acc, o) => {
    if (o.sort) {
      o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
    }
    return acc;
  }, []);
});

// On sort th click
function onSort(event, i) {
  let toset;
  const sortEl = cols[i];

  if (!event.shiftKey) {
    cols.forEach((o) => {
      if (o.field !== sortEl.field) {
        o.sort = "";
      }
    });
  }

  if (!sortEl.sort) {
    toset = "asc";
  }

  if (sortEl.sort === "desc") {
    toset = event.shiftKey ? "" : "asc";
  }

  if (sortEl.sort === "asc") {
    toset = "desc";
  }

  sortEl.sort = toset;
}

// Apply a few Bootstrap 5 optimizations
onMounted(() => {
  // Remove labels from
  document.querySelectorAll("#datasetLength label").forEach((el) => {
    el.remove();
  });

  // Replace select classes
  let selectLength = document.querySelector("#datasetLength select");

  selectLength.classList = "";
  selectLength.classList.add("form-select");
  selectLength.style.width = "80px";
});
import { useRouter } from "vue-router";
const router = useRouter();

function toTicketList(user_id_tickets) {
     router.push({
          name: "ticketflowplus-tickets-list",
          query: { user_id_tickets: user_id_tickets },
     });
}
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
     <div class="content">
          <!-- Overview -->

          <!-- END Overview -->
          <!-- <div
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
          </div> -->
          <div >
               <div v-if="!isAuthorized" style="margin-top: -100px">
                    <Eror401Vue />
               </div>
              
          </div>
          <!-- Recent Orders -->
          <!-- END Recent Orders -->
     </div>
     <!-- END Page Content -->

     <!-- Page Content -->
  <div class="content">
                    <BaseBlock title="Users List " content-full>
                         <Dataset
                         v-slot="{ ds }"
                         :ds-data="users"
                         :ds-sortby="sortBy"
                         :ds-search-in="['name', 'email', 'tickets_count', 'hiringdate', 'birthdate']"
                         >
                         <div class="row" :data-page-count="ds.dsPagecount">
                              <div id="datasetLength" class="col-md-8 py-2">
                              <DatasetShow />
                              </div>
                              <div class="col-md-4 py-2">
                              <DatasetSearch ds-search-placeholder="Search..." />
                              </div>
                         </div>
                         <hr />
                         <div class="row">
                              <div class="col-md-12">
                              <div class="table-responsive">
                              <table class="table  mb-0">
                                   <thead>
                                   <tr>
                                        <th scope="col">ID</th>
                                        <th
                                        v-for="(th, index) in cols"
                                        :key="th.field"
                                        :class="['sort', th.sort]"
                                        @click="onSort($event, index)"
                                        >
                                        {{ th.name }} <i class="gg-select float-end"></i>
                                        </th>
                                   </tr>
                                   </thead>
                                   <DatasetItem tag="tbody" class="fs-sm">
                                   <template #default="{ row, rowIndex }">
                                        <tr>
                                        <th scope="row">{{ row.id }}</th>
                                        <td style="min-width: 150px">{{ row.fullName }}</td>
                                        <td>{{ row.phoneNumber }}</td>
                                        <td>{{ row.email }}</td>
                                        <td style="min-width: 150px" :class="UsersService.getUserRoleClass(row.role)">{{ row.role }}</td>
                                        <td style="min-width: 150px">
                                             <a class="btn  " @click="toTicketList(row.id)">{{ row.tickets_count }}</a>
                                        </td>
                                        <td style="min-width: 150px"><a
                                                            href="javascript:void(0)"
                                                       >
                                                            {{
                                                                 GlobalService.formatDate(
                                                                      row.hiringDate
                                                                 )
                                                            }}
                                                       </a></td>
                                        <td style="min-width: 150px"><a
                                                            href="javascript:void(0)"
                                                       >
                                                            {{
                                                                 GlobalService.formatDate(
                                                                      row.birthDate
                                                                 )
                                                            }}
                                                       </a></td>
                                        <td
                                                       class="d-none d-sm-table-cell text-center"
                                                  >
                                                       <button
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
                                   </DatasetItem>
                              </table>
                              </div>
                              </div>
                         </div>
                         <div
                              class="d-flex flex-md-row flex-column justify-content-between align-items-center"
                         >
                              <DatasetInfo class="py-3 fs-sm" />
                              <DatasetPager class="flex-wrap py-3 fs-sm" />
                         </div>
                         </Dataset>
                    </BaseBlock>
          </div>
  <!-- END Page Content -->
</template>

<style lang="scss" scoped>
.gg-select {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(1);
  width: 22px;
  height: 22px;
}
.gg-select::after,
.gg-select::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  left: 7px;
  transform: rotate(-45deg);
}
.gg-select::before {
  border-left: 2px solid;
  border-bottom: 2px solid;
  bottom: 4px;
  opacity: 0.3;
}
.gg-select::after {
  border-right: 2px solid;
  border-top: 2px solid;
  top: 4px;
  opacity: 0.3;
}
th.sort {
  cursor: pointer;
  user-select: none;
  &.asc {
    .gg-select::after {
      opacity: 1;
    }
  }
  &.desc {
    .gg-select::before {
      opacity: 1;
    }
  }
}
</style>