<script setup>
//importing the ref function from vue and the onMounted function that will be used to call the getCategories function when the component is mounted
import { onMounted  , ref } from "vue";


// import Services that we will use
import GlobalService from "@/services/global.service.js";
import CategoriesService from "@/services/category.service.js";



//creating a new ref object that will hold the orderSearch state
const orderSearch = ref(false);
//creating a new ref object that will hold the categories data that will be fetched from the database
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





var isLoading = ref(true);
setTimeout(() => {
     isLoading.value = false;
}, 250);

function deleteCat(category_id) {
     try {
          const response = CategoriesService.deleteCategoryById(
               category_id
          ).then((response) => {
               GlobalService.toasterShowSuccess(
                    `Category deleted successfuly !`
               );
               getCategories();
          });
     } catch (error) {
          console.error("Error fetching categories:", error);
     }
}

import BaseHeader from "@/layouts/partials/BaseHeader.vue";
const routesfirst2 = ref(["Home", "Categories"]);
const routeslast = ref(["categories - List"]);


///////// filters
const filters = ref({
     name: {
          value: '',
          keys: [
               "id",
               "name",
               "description",
               "createdAt",
          ],
     },
});

const currentPage = ref(1);
const totalPages = ref(0);


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
          <BaseBlock v-else :title="`${categories.length} Category in Total` " class="animated zoomIn">
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
                                             placeholder="Search Category.."
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
                                   class="table table-hover table-vcenter"
                                   :data="categories"
                                   :filters="filters"
                                   sortHeaderClass="flex items-center justify-between w-full"
                                   :page-size="10"
                                   v-model:currentPage="currentPage"
                                   @totalPagesChanged="totalPages = $event"
                              >
                              <template #head>
                                        <tr>
                                             <VTh
                                                  style="cursor: pointer"
                                                  sortKey="id"
                                                  class="d-none d-xl-table-cell"
                                                  >ID</VTh
                                             >
                                             <VTh
                                                  style="cursor: pointer"
                                                  sortKey="name"
                                                  class=""
                                                  >Name</VTh
                                             >
                                             <VTh
                                                  style="cursor: pointer"
                                                  sortKey="description"
                                                  class="d-none d-sm-table-cell"
                                                  >Description</VTh
                                             >
                                             <VTh
                                                  v-if="GlobalService.isAdmin()"
                                                  style="cursor: pointer"
                                                  sortKey="tickets_Count"
                                                  class=" text-center"
                                                  >Tickets</VTh
                                             >
                                             <VTh
                                                  v-if="GlobalService.isAdmin()"
                                                  style="cursor: pointer"
                                                  sortKey="createdAt"
                                                  class="d-none d-xl-table-cell text-center"
                                                  >CreatedAt</VTh
                                             >
                                             <th  v-if="GlobalService.isAdmin()"
                                                  style="cursor: pointer"
                                                  class=" text-center"
                                                  >Delete</th
                                             >


                                        </tr>
                                        <!-- <tr>
                  <th>Category ID</th>
                  <th class="d-none d-xl-table-cell"> Name</th>
                  <th class="d-none d-sm-table-cell text-center">Description</th>
                  <th class="d-none d-sm-table-cell text-center">Description</th>
                  <th class="d-none d-sm-table-cell text-center">Tickets Count</th>
                  <th  class="d-none d-sm-table-cell text-center">Actions</th>

                </tr> -->
                                   </template>

                                  <template #body="{ rows }">
                                        <tr v-for="category in rows"
                                             :key="category.id" >
                                             <td class="d-none d-xl-table-cell">
                                                  <a
                                                       class="fw-semibold"
                                                       href="javascript:void(0)"
                                                  >
                                                  &nbsp;#{{ category.id }}&nbsp;
                                                  </a>
                                             </td>
                                             <td >
                                                  <a
                                                       class="fw-semibold"
                                                       href="javascript:void(0)"
                                                       >&nbsp;{{ category.name }}&nbsp;</a
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
                                                  class=" text-center"
                                             >
                                                  <a href="javascript:void(0)">
                                                       <a  @click="GlobalService.routerPush('ticketflowplus-tickets-list',null,{ filter_terme: category.name})"
                                                            class="fs-xs badge bg-primary rounded-pill fw-semibold mb-0"
                                                       >
                                                       &nbsp;{{
                                                                 category.tickets_Count
                                                            }}&nbsp;
                                                       </a>
                                                  </a>
                                             </td>
                                             <td
                                                  v-if="GlobalService.isAdmin()"
                                                  class="d-none d-xl-table-cell fw-semibold text-muted text-center"
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
                                                  class="text-center"
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
                                   </template>
                              </v-table>
                         </div>
                         <!-- END Recent Orders Table -->
                    </div>
                    <VTPagination
                              class="d-flex justify-content-center"
                                   v-model:currentPage="currentPage"
                                   :total-pages="totalPages"
                                   :boundary-links="true"
                                   :maxPageLinks="3"
                              />
               </template>
          </BaseBlock>
          <!-- END Recent Orders -->
     </div>
     <!-- END Page Content -->
</template>
