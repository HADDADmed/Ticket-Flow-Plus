<script setup>
import { onMounted, ref } from "vue";

import CategoriesService from "@/services/category.service.js";
import TicketService from "@/services/tickets.service.js";

const newTicket = ref({
     title: "",
     content: ``,
     category_id: "",
});

const categories = ref([]);
const getCategories = async () => {
     try {
          const response = await CategoriesService.getAllCategories(); // Use getAllUsers method
          categories.value = response.data;
     } catch (error) {
          console.error("Error fetching categories:", error);
     }
};
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from "vue-router";
const router = useRouter();

const toaster = createToaster({});

// Watch for changes in the editor content and update the reactive variable
function addNewTicket() {
     const html = editor.getHTML();
     const isTheContentTheSame = html === newTicket.value.content;
     const isTheContentEmpty = html === `<p></p>`;
     if (
          (isTheContentEmpty || isTheContentTheSame) &&
          newTicket.value.category_id == "" &&
          newTicket.value.title == ""
     ) {
          toaster.show(
               `<div><i class="fa-solid fa-triangle-exclamation"></i> Please fill all fields</div>`,
               {
                    position: "top",
                    duration: 5000,
                    type: "error",
               }
          );
          return;
     } else if (
          newTicket.value.title == "" &&
          newTicket.value.category_id == ""
     ) {
          toaster.show(
               `<div><i class="fa-solid fa-triangle-exclamation"></i> Title and Category are required</div>`,
               {
                    position: "top",
                    duration: 5000,
                    type: "error",
               }
          );
          return;
     } else if (newTicket.value.title == "") {
          toaster.show(
               `<div><i class="fa-solid fa-triangle-exclamation"></i> Title is required</div>`,
               {
                    position: "top",
                    duration: 5000,
                    type: "error",
               }
          );
          return;
     } else if (newTicket.value.category_id == "") {
          toaster.show(
               `<div><i class="fa-solid fa-triangle-exclamation"></i> Category is required</div>`,
               {
                    position: "top",
                    duration: 5000,
                    type: "error",
               }
          );
          return;
     } else if (isTheContentEmpty || isTheContentTheSame) {
          toaster.show(
               `<div><i class="fa-solid fa-triangle-exclamation"></i> Content is required</div>`,
               {
                    position: "top",
                    duration: 5000,
                    type: "error",
               }
          );
          return;
     } else if (html.length < 60) {
          toaster.show(
               `<div><i class="fa-solid fa-triangle-exclamation"></i> Content must be at least 50 characters</div>`,
               {
                    position: "top",
                    duration: 5000,
                    type: "error",
               }
          );
          return;
     }

     newTicket.value.content = html;

     TicketService.createTicket(newTicket.value)
          .then((response) => {
               newTicket.value = {
                    title: "",
                    content: "",
                    category_id: "",
               };
               toaster.show(
                    `<div><i class="fa-solid fa-triangle-exclamation"></i> Ticket saved Successfuly</div>`,
                    {
                         position: "top",
                         duration: 5000,
                         type: "success",
                    }
               );

               router.push({
                    name: "ticketflowplus-ticket-oneticketpage",
                    query: { ticket_id: response.data.id },
               });
          })
          .catch((error) => {
               console.log(error);
          });
}

onMounted(() => {
     getCategories();
});

// CKEditor 5, for more info and examples you can check out https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html
import CKEditor from "@ckeditor/ckeditor5-vue";

// You can import one of the following CKEditor variation (only one at a time)
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
//import InlineEditor from '@ckeditor/ckeditor5-build-inline'
//import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
//import BalloonBlockEditor from '@ckeditor/ckeditor5-build-balloon-block'

// Tiptap editor, for more info and examples you can check out https://github.com/ueberdosis/tiptap
import { useEditor, EditorContent, Editor } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";

// CKEditor 5 variables
let ckeditor = CKEditor.component;

const editorData = ref("<p>Hello CKEditor5!</p>");
const editorConfig = ref({});

const editor = new Editor({
     content: newTicket.value.content,
     extensions: [StarterKit],
});

// Init Tiptap editor
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
     <BasePageHeading
          title="add New ticket"
          subtitle="Pleas fill the form belong then send."
     >
          <template #extra>
               <nav aria-label="breadcrumb">
                    <ol class="breadcrumb breadcrumb-alt">
                         <li class="breadcrumb-item">
                              <a class="link-fx" href="javascript:void(0)"
                                   >Forms</a
                              >
                         </li>
                         <li class="breadcrumb-item" aria-current="page">
                              Editors
                         </li>
                    </ol>
               </nav>
          </template>
     </BasePageHeading>
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
