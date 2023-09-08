<script setup>

//importing the ref function from vue 
import { ref } from "vue";


//importing the BaseHeading component from the components folder
import  BaseHeader from "@/layouts/partials/BaseHeader.vue";



//importing the Services that wee will use from the services folder
import GlobalService from "@/services/global.service.js";
import CategoriesService from "@/services/category.service.js";

 

//creating a new ref object that will hold the new category data
const newCategory = ref({
     name: "",
     description: "",
});



//function that will add the new category to the database
function addNewCategory() {
     //calling the createCategory function from the category service and passing the new category data to it
    CategoriesService.createCategory(newCategory.value)
          .then((response) => {
           //reseting the new category data
            newCategory.value = {
                    title: "",
                    content: "",
                    category_id: "",
               };
           //showing a toaster message to the user
           GlobalService.toasterShowSuccess(`Category added successfuly !`);
           //redirecting the user to the categories list page
           GlobalService.routerPush( 'ticketflowplus-categories-list')
         
        })

          .catch((error) => {
               //showing a toaster error message to the user
               // GlobalService.toasterShowError(error.response.data.error);
               console.log(error);
          });
}




// creaatting a new ref object that will hold the routes that will be passed to the BaseHeader component
const routesfirst2 = ref(["new element", "Category"]);
const routeslast = ref(["category add form"]);

</script>

<template>
     <!-- Hero -->
     <BaseHeader
          title="Add New Category"
          subtitle="Pleas fill the form belong then save."
          :routesfirst2="routesfirst2"
          :routeslast="routeslast"
     />     
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
