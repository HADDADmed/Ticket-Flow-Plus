<script setup>
import { onMounted, reactive, ref } from "vue";
/// seting up the side bar
import BackendLayoutSidebarDarkView from "@/views/backend/layout/sidebar/DarkView.vue";
/// seting up the header

const orderSearch = ref(false);

// import global service
import GlobalService from "@/services/global.servise.js";
const user = JSON.parse(localStorage.getItem("user"));

import CategoriesService from "@/services/category.service.js";

const categories = ref([]);
onMounted(() => {
     getCategories();
});

const getCategories = async () => {
     try {
          const response = await CategoriesService.getAllCategories(); // Use getAllUsers method
          categories.value = response.data;
     } catch (error) {
          console.error("Error fetching categories:", error);
     }
};

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({});

const tableTrs = ref([
     {
          name: "Category_ID",
          class: "",
          forAdmin: false,
     },
     {
          name: "Name",
          class: "",
          forAdmin: false,
     },
     {
          name: "Description",
          class: "",
          forAdmin: false,
     },
     {
          name: "Tickets_Count",
          class: "text-center",
          forAdmin: true,
     },
     {
          name: "Created_At",
          class: "text-center",
          forAdmin: true,
     },
     {
          name: "Delete",
          class: "text-center",
          forAdmin: true,
     },
]);

var isLoading = ref(true);
setTimeout(() => {
     isLoading.value = false;
}, 250);

function deleteCat(category_id) {
     try {
          const response = CategoriesService.deleteCategoryById(
               category_id
          ).then((response) => {
               toaster.show("Category Deleted Successfully", {
                    type: "success",
               });
               getCategories();
          }); // Use getAllUsers method
          // if (response) {
          //   toaster.show("Category Deleted Successfully", {
          //     type: "success",
          //   });
          //   getCategories();
          // }
          // console.log(response);
     } catch (error) {
          console.error("Error fetching categories:", error);
     }
}

import BaseHeader from "@/layouts/partials/BaseHeader.vue";
const routesfirst2 = ref(["Home", "Categories"]);
const routeslast = ref(["categories - List"]);
</script>

<template>
     <!-- Hero -->
     <BaseHeader
          title="Categories List"
          subtitle="here are all the categories"
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
          <BaseBlock v-else title="Categories List" class="animated zoomIn">
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
                                             >20</span
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
                                                  <div
                                                       v-if="
                                                            !tableTr.forAdmin ||
                                                            GlobalService.isAdmin()
                                                       "
                                                  >
                                                       {{ tableTr.name }}
                                                  </div>
                                             </th>
                                        </tr>
                                        <!-- <tr>
                  <th>Category ID</th>
                  <th class="d-none d-xl-table-cell"> Name</th>
                  <th class="d-none d-sm-table-cell text-center">Description</th>
                  <th class="d-none d-sm-table-cell text-center">Description</th>
                  <th class="d-none d-sm-table-cell text-center">Tickets Count</th>
                  <th  class="d-none d-sm-table-cell text-center">Actions</th>
           
                </tr> -->
                                   </thead>
                                   <tbody class="fs-sm">
                                        <tr v-for="category in categories">
                                             <td>
                                                  <a
                                                       class="fw-semibold"
                                                       href="javascript:void(0)"
                                                  >
                                                       #{{ category.id }}
                                                  </a>
                                             </td>
                                             <td class="d-none d-xl-table-cell">
                                                  <a
                                                       class="fw-semibold"
                                                       href="javascript:void(0)"
                                                       >{{ category.name }}</a
                                                  >
                                             </td>
                                             <td class="d-none d-sm-table-cell">
                                                  <a href="javascript:void(0)">
                                                       <p
                                                            class="fs-xs fw-semibold mb-0"
                                                       >
                                                            {{
                                                                 category.description
                                                            }}
                                                       </p>
                                                  </a>
                                             </td>
                                             <td
                                                  v-if="GlobalService.isAdmin()"
                                                  class="d-none d-sm-table-cell text-center"
                                             >
                                                  <a href="javascript:void(0)">
                                                       <p
                                                            class="fs-xs fw-semibold mb-0"
                                                       >
                                                            {{
                                                                 category.tickets_Count
                                                            }}
                                                       </p>
                                                  </a>
                                             </td>
                                             <td
                                                  v-if="GlobalService.isAdmin()"
                                                  class="d-none d-sm-table-cell fw-semibold text-muted text-center"
                                             >
                                                  <a href="javascript:void(0)">
                                                       {{
                                                            GlobalService.formatDate(
                                                                 category.createdAt
                                                            )
                                                       }}
                                                  </a>
                                             </td>
                                             <td
                                                  v-if="GlobalService.isAdmin()"
                                                  class="d-none d-sm-table-cell text-center"
                                             >
                                                  <button
                                                       @click="
                                                            deleteCat(
                                                                 category.id
                                                            )
                                                       "
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
