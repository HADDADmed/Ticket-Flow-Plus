<script setup>
// importing the ref and onMounted functions from vue that will be used to create reactive variables and to run functions when the component is mounted
import { onMounted, ref } from "vue";


//importing the Services that wee will use from the services folder
import GlobalService from "@/services/global.service.js";
import CategoriesService from "@/services/category.service.js";
import TicketsService from "@/services/tickets.service.js";

//importing the BaseHeading component from the components folder
import  BaseHeader from "@/layouts/partials/BaseHeader.vue";// creaatting a new ref object that will hold the routes that will be passed to the BaseHeader component

// Tiptap editor, for more info and examples you can check out https://github.com/ueberdosis/tiptap
import {  EditorContent, Editor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

 

//creating a new ref object that will hold the new ticket data
const newTicket = ref({
     title: "",
     content: ``,
     category_id: "",
});


//creating a new ref object that will hold all the categories data
const categories = ref([]);


//function that will get all the categories from the database
const getCategories = async () => {
     try {
          const response = await CategoriesService.getAllCategories(); // Use getAllUsers method
          categories.value = response.data;
     } catch (error) {
          GlobalService.toasterShowError(error.response.data.error);
     }
};
 
  
// Watch for changes in the editor content and update the reactive variable
function addNewTicket() {
     const html = editor.getHTML();
     if(TicketsService.ticketValidation(html ,newTicket.value) == false){
          return;
     }
     newTicket.value.content = html;
     TicketsService.createTicket(newTicket.value)
          .then((response) => {
               newTicket.value = {
                    title: "",
                    content: "",
                    category_id: "",
               };
               GlobalService.toasterShowSuccess( 'Ticket saved Successfuly  !')
               GlobalService.routerPush( 'ticketflowplus-ticket-oneticketpage' ,null,{ ticket_id: response.data.id })
          })  
          .catch((error) => {
               console.log(error);
          });
}

onMounted(() => {
     getCategories();
});

 

// Tiptap editor, for more info and examples you can check out
const editor = new Editor({
     content: newTicket.value.content,
     extensions: [StarterKit],
});


// creaatting a new ref object that will hold the routes that will be passed to the BaseHeader component
const routesfirst2 = ref(["new element", "Ticket"]);
const routeslast = ref(["ticket add form"]);




</script>

<style lang="scss">
// Tiptap overrides
.ProseMirror-focused {
     outline: none;
     border: 1px solid black;
}
.ProseMirror {
     border: 1px solid black;
     padding: 20px;
     
}
</style>


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
          <!-- Tiptap -->
          <BaseBlock title="add New Ticket    " content-full>
               <div class="d-flex justify-content-around">
                    <div class="form-floating mb-4 col-7 animated bounceInLeft">
                         <input
                              type="text"
                              class="form-control form-control-alt border border-primary"
                              id="example-text-input-floating"
                              name="example-text-input-floating"
                              placeholder="John Doe"
                              v-model="newTicket.title"
                         />
                         <label for="example-text-input-floating">Title</label>
                    </div>

                    <div
                         class="form-floating mb-4 col-4 animated bounceInRight"
                    >
                         <select
                              class="form-select form-control-alt border border-primary"
                              id="example-select-floating"
                              name="example-select-floating"
                              aria-label="Floating label select example"
                              v-model="newTicket.category_id"
                         >
                              <option disabled selected>
                                   Select an option
                              </option>
                              <option
                                   v-for="(category, index) in categories"
                                   :key="index"
                                   :value="category.id"
                              >
                                   {{ category.name }}
                              </option>
                         </select>
                         <label for="example-select-floating">Category</label>
                    </div>
               </div>
               <div
                    v-if="editor"
                    class="pb-3 mb-3 border-bottom flex flex-column flex-sm-row d-flex justify-content-center"
               >
                    <div
                         class="btn-group d-block d-sm-inline-block me-sm-2 mb-2 mb-sm-0"
                    >
                         <button
                              class="btn btn-sm btn-primary"
                              @click="editor.chain().focus().toggleBold().run()"
                              :class="{ active: editor.isActive('bold') }"
                         >
                              <i class="fa fa-bold"></i>
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor.chain().focus().toggleItalic().run()
                              "
                              :class="{ active: editor.isActive('italic') }"
                         >
                              <i class="fa fa-italic"></i>
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor.chain().focus().toggleStrike().run()
                              "
                              :class="{ active: editor.isActive('strike') }"
                         >
                              <i class="fa fa-strikethrough"></i>
                         </button>
                    </div>

                    <div
                         class="btn-group d-block d-sm-inline-block me-sm-2 mb-2 mb-sm-0"
                    >
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor.chain().focus().setParagraph().run()
                              "
                              :class="{ active: editor.isActive('paragraph') }"
                         >
                              P
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: 1 })
                                        .run()
                              "
                              :class="{
                                   active: editor.isActive('heading', {
                                        level: 1,
                                   }),
                              }"
                         >
                              H1
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: 2 })
                                        .run()
                              "
                              :class="{
                                   active: editor.isActive('heading', {
                                        level: 2,
                                   }),
                              }"
                         >
                              H2
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor
                                        .chain()
                                        .focus()
                                        .toggleHeading({ level: 3 })
                                        .run()
                              "
                              :class="{
                                   active: editor.isActive('heading', {
                                        level: 3,
                                   }),
                              }"
                         >
                              H3
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor
                                        .chain()
                                        .focus()
                                        .toggleBulletList()
                                        .run()
                              "
                              :class="{ active: editor.isActive('bulletList') }"
                         >
                              <i class="fa fa-list-ul"></i>
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor
                                        .chain()
                                        .focus()
                                        .toggleOrderedList()
                                        .run()
                              "
                              :class="{
                                   active: editor.isActive('orderedList'),
                              }"
                         >
                              <i class="fa fa-list-ol"></i>
                         </button>
                    </div>

                    <div
                         class="btn-group d-block d-sm-inline-block me-sm-2 mb-2 mb-sm-0"
                    >
                         <button
                              class="btn btn-sm btn-primary"
                              @click="editor.chain().focus().toggleCode().run()"
                              :class="{ active: editor.isActive('code') }"
                         >
                              <i class="fa fa-code"></i>
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor
                                        .chain()
                                        .focus()
                                        .toggleCodeBlock()
                                        .run()
                              "
                              :class="{ active: editor.isActive('codeBlock') }"
                         >
                              <i class="fa fa-laptop-code"></i>
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor
                                        .chain()
                                        .focus()
                                        .toggleBlockquote()
                                        .run()
                              "
                              :class="{ active: editor.isActive('blockquote') }"
                         >
                              <i class="fa fa-quote-left"></i>
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="
                                   editor
                                        .chain()
                                        .focus()
                                        .setHorizontalRule()
                                        .run()
                              "
                         >
                              <i class="fa fa-ruler-horizontal"></i>
                         </button>
                    </div>

                    <div class="btn-group d-block d-sm-inline-block me-sm-2">
                         <button
                              class="btn btn-sm btn-primary"
                              @click="editor.chain().focus().undo().run()"
                         >
                              <i class="fa fa-arrow-rotate-left"></i>
                         </button>
                         <button
                              class="btn btn-sm btn-primary"
                              @click="editor.chain().focus().redo().run()"
                         >
                              <i class="fa fa-arrow-rotate-right"></i>
                         </button>
                    </div>
               </div>
               <EditorContent :editor="editor" />
               <div class="d-flex justify-content-center mb-4">
                    <button
                         @click="addNewTicket()"
                         class="btn btn-lg rounded-pill btn-success"
                    >
                         Save
                    </button>
               </div>
          </BaseBlock>

          <!-- END Tiptap -->
     </div>
     <!-- END Page Content -->
</template>
