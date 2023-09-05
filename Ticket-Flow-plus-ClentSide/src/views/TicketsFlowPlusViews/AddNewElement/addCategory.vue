<script setup>
import { onMounted, reactive, ref } from "vue";
// import global service
import GlobalService from "@/services/global.servise.js";
import CategoriesService from "@/services/category.service.js";
import { useRouter } from "vue-router";
const route = useRouter();

const newCategory = ref({
     name: "",
     description: "",
});

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({ });

function addNewCategory() {
    CategoriesService.createCategory(newCategory.value)
          .then((response) => {
            newCategory.value = {
                    title: "",
                    content: "",
                    category_id: "",
               };
    toaster.show(`<div><i class="fa-solid fa-circle-check"></i> Category added successfuly !</div>`, {
              position: "top",
              duration: 5000,
              type: "success",

            });
            route.push({ name: "ticketflowplus-categories-list" });
        })

          .catch((error) => {
               console.log(error);
          });
}


</script>

<template>
     <!-- Hero -->
     <BasePageHeading title="add New Ticket">
          <template #extra>
               <nav aria-label="breadcrumb">
                    <ol class="breadcrumb breadcrumb-alt">
                         <li class="breadcrumb-item">
                              <a class="link-fx" href="javascript:void(0)"
                                   >AddNewElement</a
                              >
                         </li>
                         <li class="breadcrumb-item" aria-current="page">
                              Ticket
                         </li>
                    </ol>
               </nav>
          </template>
     </BasePageHeading>
     <!-- END Hero -->

     <!-- Page Content -->
     <div class="content">
          <!-- Floating Labels -->
          <BaseBlock title="Add new Category">
               <form @submit.prevent="addNewCategory()">
                    <div class="row">
                         <div class="col-lg-4"></div>
                              <div >
                                   <div
                             
                                        class="form-floating mb-4 col-12 animated bounceInLeft"
                                   >
                                        <input
                                             type="text"
                                             class="form-control form-control-alt border border-primary"
                                             id="example-text-input-floating"
                                             name="example-text-input-floating"
                                             placeholder="John Doe"
                                             v-model="newCategory.name"
                                        />
                                        <label for="example-text-input-floating"
                                             >Title</label
                                        >
                                   </div>
                              

                              <div
                                  
                                   class="form-floating mb-4 animated col-12 bounceInUp "
                              >
                                   <textarea
                                        class="form-control form-control-alt border border-primary"
                                        id="example-textarea-floating"
                                        name="example-textarea-floating"
                                        style="height: 200px"
                                        placeholder="Write your ticket content here"
                                        v-model="newCategory.description"
                                   ></textarea>
                                   <label for="example-textarea-floating"
                                        >Category Description</label
                                   >
                              </div>
                            </div>
                    </div>
                    <div class="d-flex justify-content-center mb-4">
                         <button
                              type="submit"
                              class="btn btn-lg rounded-pill btn-success"
                         >
                              Save
                         </button>
                    </div>
               </form>
          </BaseBlock>
          <!-- END Floating Labels -->
     </div>
     <!-- END Page Content -->
</template>
