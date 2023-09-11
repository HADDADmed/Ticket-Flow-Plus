<script setup>
import GlobalService from "@/services/global.service.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import TicketService from "@/services/tickets.service.js";
import UsersService from "@/services/users.service.js";
import CommentService from "@/services/comments.service.js";
import TicketStatusService from "@/services/ticketStatus.service.js";


var currentDate = ref(GlobalService.getCurrentDate());
var currentTime = ref(GlobalService.getCurrentTimeWithoutSeconds());


const route = useRoute();
const ticket_id = route.query.ticket_id; // 'ticket_id'
const newTicketStatus = ref({
     ticket_id: ticket_id,
     status_id: "",
});


const ticket = ref([{}]);
const ticketStatuses = ref([]);
var currentStatus = ref("");


const newComment = ref({
     ticket_id: ticket_id,
     commentContent: "",
});


const statuses = ref([
     {
          id: 1,
          name: "OPEN",
     },
     {
          id: 2,
          name: "PENDING",
     },
     {
          id: 3,
          name: "CLOSED",
     },
]);

const getTicketStatuses = async () => {
     try {
      const response = await TicketStatusService.getAllTicketStatusesByTicketId(ticket_id);
      ticketStatuses.value = response.data;
      currentStatus.value = ticketStatuses.value[0].status_name;
     } catch (error) {
          console.error("Error fetching tickets:", error);
     }
};

const getTicket = async () => {
     try {
          const response = await TicketService.getTicketById(ticket_id);
          ticket.value = response.data;
     } catch (error) {
          console.error("Error fetching tickets:", error);
     }
};

function updateTicketStatus() {
     newTicketStatus.value.ticket_id = ticket_id;
     TicketStatusService.createTicketStatus(newTicketStatus.value)
          .then(() => {
               newTicketStatus.value = {
                    ticket_id: ticket_id,
                    status_id: "",
               };
               getTicketStatuses()
               GlobalService.toasterShowSuccess(`Status updated successfuly !`);

          })
          .catch((error) => {
               console.log(error);
          });
 }


function addComment() {
     if (newComment.value.commentContent == "") {
          GlobalService.toasterShowWarning(`Please add a comment !`);

     } else {
          newComment.value.ticket_id = ticket_id;
          CommentService.createComment(newComment.value)
               .then(() => {
                    newComment.value = {
                         ticket_id: ticket_id,
                         commentContent: "",
                    };
                    getTicket();
                    GlobalService.toasterShowSuccess(`Comment added successfuly !`);
               })
               .catch((error) => {
                    console.log(error);
               });
     }
}


onMounted(async () => {
     await getTicket();
     await getTicketStatuses();
});



setInterval(() => {
     currentDate.value = GlobalService.getCurrentDate();
     currentTime.value = GlobalService.getCurrentTimeWithoutSeconds();
}, 10000 * 6);
</script>

<template>
     <!-- Hero -->
     <BasePageHeading
          :title="'Ticket of :' + ticket[0].user_fullName"
          :subtitle="
               '#id : ' +
               ticket[0].ticket_id +
               ' and Title : ' +
               ticket[0].ticket_title
          "
     >
          <template #extra>
               <nav aria-label="breadcrumb">
                    <ol class="breadcrumb breadcrumb-alt">
                         <li class="breadcrumb-item">
                              <a class="link-fx" href="javascript:void(0)"
                                   >Ticket</a
                              >
                         </li>
                         <li class="breadcrumb-item" aria-current="page">
                              oneTicketPage
                         </li>
                    </ol>
               </nav>
          </template>
     </BasePageHeading>
     <!-- END Hero -->

     <!-- Page Content -->
     <div class="content">
          <div class="d-flex">
               <div  class="col-lg-10 offset-lg ">
                    <BaseBlock
                         title=""
                         header-class="bg-muted"
                         :headerBg="false"
                         themed
                    >
                         <div
                              class="d-flex justify-content-between ticketheader"
                         >
                              <div class="d-flex">
                                   <a style="font-weight: 900;" class="fw-semibold" href="javascript:void(0)"
                                        >    Title :</a
                                        >
                                   <div
                                        style="

                                             margin-left: 10px;
                                        "
                                   >
                                        {{ ticket[0].ticket_title }}
                                   </div>
                              </div>
                              <div style="margin-top: 6px; font-size: 13px">
                                   {{
                                        GlobalService.formatDate(
                                             ticket[0].ticket_createdAt
                                        )
                                   }}
                                   <i class="fa-regular fa-calendar-days"></i>
                                   at
                                   {{
                                        GlobalService.formatTime(
                                             ticket[0].ticket_createdAt
                                        )
                                   }}
                                   <i class="fa-regular fa-clock"></i>
                              </div>
                         </div>

                         <div class="ticketbody">
                              <div>
                                   <div
                                        v-html="ticket[0].ticket_description"
                                   ></div>
                              </div>
                         </div>
                    </BaseBlock>
               </div>
               <div
                    style="margin-left: 20px"
                    class="d-none d-lg-table-cell col-sm-2"
               >
                    <BaseBlock
                         title=""
                         header-class="bg-muted"
                         :header-bg="false"
                         themed
                    >
                         <div class="text-center catego">
                              Category <br />
                              <a class="link-fx" href="javascript:void(0)">
                                   {{ ticket[0].Category_name }}</a
                              >
                         </div>
                         <div
                              class="text-center"
                              style="padding-top: 5px; padding-bottom: 20px"
                         >
                              <div class="Current">Current status <br /></div>
                              <div
                                   class="d-flex"
                                   :class="
                                        GlobalService.isAdmin()
                                             ? 'justify-content-around'
                                             : 'justify-content-center'
                                   "
                                   style="
                                        margin-top: -7px;
                                        padding-bottom: -15px;
                                   "
                              >
                                   <div

                                        style="margin-bottom: 13px"
                                        class="status text-center"
                                        :class="
                                             UsersService.getUserStatusClass(
                                                  currentStatus
                                             )
                                        "
                                   >status : <br>
                                        {{ currentStatus}}
                                   </div>
                                   <div v-if="GlobalService.isAdmin()">
                                        <div class="dropdown dropstart push">
                                             <button
                                                  style="margin-top: 13px ; height: 39px;"
                                                  type="button"
                                                  class="btn btn-sm bg-warning rounded-circle dropdown-toggle"
                                                  id="dropdown-dropleft-dark"
                                                  data-bs-toggle="dropdown"
                                                  aria-haspopup="true"
                                                  aria-expanded="false"
                                             >
                                                  <i
                                                       class="fa-solid fa-rotate-left"
                                                  ></i>
                                             </button>
                                             <div
                                                  class="dropdown-menu fs-sm"
                                                  aria-labelledby="dropdown-dropleft-dark"
                                             >
                                                  <form
                                                       class="p-2"
                                                       @submit.prevent="
                                                            updateTicketStatus()
                                                       "
                                                  >
                                                       <div
                                                            class="form-floating mb-4"
                                                       >
                                                            <select
                                                                 class="form-select"
                                                                 id="example-select-floating"
                                                                 name="example-select-floating"
                                                                 aria-label="Floating label select example"
                                                                 v-model="
                                                                    newTicketStatus.status_id"
                                                            >
                                                                 <option

                                                                      selected
                                                                      disabled
                                                                 >
                                                                      choose status
                                                                 </option>
                                                                 <option
                                                                      v-for="(
                                                                           status,
                                                                           index
                                                                      ) in statuses"
                                                                      :value="
                                                                           status.id
                                                                      "
                                                                      :key="
                                                                           index
                                                                      "
                                                                      :disabled="
                                                                           status.name ==
                                                                           ticket[0]
                                                                                .status
                                                                      "
                                                                 >
                                                                      {{
                                                                           status.name
                                                                      }}
                                                                 </option>
                                                            </select>
                                                            <label
                                                                 for="example-select-floating"
                                                                 >STATUS</label
                                                            >
                                                       </div>

                                                       <div
                                                            class="d-flex justify-content-center"
                                                       >
                                                            <button
                                                                 type="submit"
                                                                 class="btn btn-success rounded-pill text-center"
                                                            >
                                                                 SAVE
                                                            </button>
                                                       </div>
                                                  </form>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div class="histo d-flex justify-content-around">
                              <div class="text-center">
                                   check History of statuses
                              </div>
                              <button
                                   class="btn btn-sm btn-altdanger rounded-circle text-center"
                                   type="button"
                                   data-bs-toggle="offcanvas"
                                   data-bs-target="#offcanvasRight"
                                   aria-controls="offcanvasRight"
                                   style="
                                        width: 35px;
                                        height: 35px;
                                        margin-top: 5px;
                                        background-color: #273d54;
                                   "
                              >
                                   <i
                                        class="fa-solid fa-clock-rotate-left"
                                        style="color: white"
                                   ></i>
                              </button>
                         </div>
                         <!-- Right Aligned -->
                         <div>
                              <div>
                                   <!-- Offcanvas Right -->
                                   <div
                                        class="offcanvas offcanvas-end bg-body-extra-light"
                                        tabindex="-1"
                                        id="offcanvasRight"
                                        aria-labelledby="offcanvasRightLabel"
                                   >
                                        <div
                                             class="offcanvas-header bg-body-light"
                                        >
                                             <h5
                                                  class="offcanvas-title"
                                                  id="offcanvasRightLabel"
                                             >
                                                  History of statuses
                                             </h5>
                                             <button
                                                  type="button"
                                                  class="btn-close"
                                                  data-bs-dismiss="offcanvas"
                                                  aria-label="Close"
                                             ></button>
                                        </div>
                                        <div class="offcanvas-body">
                                             <table class="table">
                                                  <thead class="thead-light">
                                                       <tr style="border: 10px">
                                                            <th scope="col">
                                                                 created By
                                                            </th>
                                                            <th scope="col">
                                                                 Status
                                                            </th>
                                                            <th scope="col" class="text-center">
                                                                 Date
                                                            </th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       <tr
                                                            v-for="ticketStatuse in ticketStatuses"
                                                            style="border: 10px"
                                                       >
                                                            <th scope="row">
                                                                 {{
                                                                      ticketStatuse.changedByUser_name
                                                                 }}
                                                            </th>
                                                            <td
                                                                 class="text-center"
                                                            >
                                                                 <span
                                                                      :class="
                                                                           UsersService.getUserStatusClass(
                                                                                ticketStatuse.status_name
                                                                           )
                                                                      "
                                                                      class="text-center status d-flex justify-content-center"
                                                                      >{{
                                                                           ticketStatuse.status_name
                                                                      }}</span
                                                                 >
                                                            </td>
                                                            <td>
                                                                 {{
                                                                      GlobalService.formatDate(
                                                                           ticketStatuse.createdAt
                                                                      )
                                                                 }}
                                                            </td>
                                                       </tr>
                                                  </tbody>
                                             </table>
                                        </div>
                                   </div>
                                   <!-- END Offcanvas Right -->
                              </div>
                         </div>
                         <!-- END Right Aligned -->
                    </BaseBlock>
               </div>
          </div>
          <div v-if="ticket[0].comment_id">
               <div
                    v-for="ticketComment in ticket"
                    class="col-lg-8 offset-lg-1"
               >
                    <BaseBlock
                         title=""
                         header-class="bg-muted"
                         :headerBg="false"
                         themed
                    >
                         <div
                              class="d-flex justify-content-between ticketheader"
                         >
                              <div class="d-flex">
                                   <img
                                        style="width: 35px"
                                        src="/assets/media/photos/accountLogo.png"
                                        alt="logo"
                                   />
                                   <div
                                        style="
                                             margin-top: 6px;
                                             margin-left: 10px;
                                        "
                                   >
                                        {{
                                             ticketComment.comment_user_fullName
                                        }}
                                        <span
                                             v-if="
                                                  ticketComment.comment_user_role ==
                                                  'ADMIN'
                                             "
                                             style="font-size: 13px; color: red"
                                             class="creation-date"
                                        >
                                             ADMIM</span
                                        >
                                        <span
                                             v-if="
                                                  ticketComment.comment_user_role ==
                                                  'RESPONSIBLE'
                                             "
                                             style="font-size: 13px; color: red"
                                             class="creation-date"
                                        >
                                             RESPONSIBLE</span
                                        >
                                   </div>
                              </div>
                              <div style="margin-top: 6px; font-size: 13px">
                                   15-10-2002
                                   <i class="fa-regular fa-calendar-days"></i>
                                   at 12:00 <i class="fa-regular fa-clock"></i>
                              </div>
                         </div>

                         <div class="ticketbody2">
                              {{ ticketComment.comment_content }}
                         </div>
                    </BaseBlock>
               </div>
          </div>


          <div class="col-lg-8 offset-lg-1">
               <BaseBlock
                    title=""
                    header-class="bg-muted"
                    :headerBg="false"
                    themed
               >
                    <div class="d-flex justify-content-between ticketheader">
                         <div class="d-flex">
                              <img
                                   style="width: 35px"
                                   src="/assets/media/photos/accountLogo.png"
                                   alt="logo"
                              />
                              <div style="margin-top: 6px; margin-left: 10px">
                                   Your comments
                              </div>
                         </div>
                         <div style="margin-top: 6px; font-size: 13px">
                              {{ currentDate }}
                              <i class="fa-regular fa-calendar-days"></i>
                              {{ currentTime }}
                              <i class="fa-regular fa-clock"></i>
                         </div>
                    </div>
                    <div class="tcketbody">
                         <div class="mb-4">
                              <textarea
                                   class="form-control form-control-alt"
                                   id="example-textarea-input-alt"
                                   name="example-textarea-input-alt"
                                   rows="4"
                                   v-model="newComment.commentContent"
                                   placeholder="add your comment here ..."
                              ></textarea>
                         </div>
                         <div class="d-flex justify-content-end">
                              <button
                                   @click="addComment()"
                                   class="btn btn-success rounded-pill"
                              >
                                   <i class="fa-regular fa-paper-plane"></i>
                              </button>
                         </div>
                    </div>
               </BaseBlock>
          </div>

          <!-- END Rounded     Themed Blocks -->
     </div>
     <!-- END Page
     Content -->
</template>
<style scoped>
.ticketheader {
     margin-top: -10px;
     margin-bottom: 20px;
     padding-bottom: 10px;
     border-bottom: 3px solid #ebebeb;
}
.tcketbody {
     margin: 10px;
     padding: 5px;
}
.catego {
     font-family: Tahoma;
     font-size: 15px;
     margin-top: -10px;
     letter-spacing: 2px;
     padding-bottom: 3px;
     border-bottom: 4px solid gray;
}

.histo {
     font-family: Tahoma;
     font-size: 15px;
     margin-top: -10px;
     padding-top: 7px;
     padding-bottom: 5px;
     border-top: 4px solid gray;
}
.Current {
     font-family: Tahoma;
     font-size: 15px;
     padding-bottom: 10px;
     letter-spacing: 2px;
}

.ticketbody2 {
     line-height: 1.5; /* Adjust line spacing */
     font-size: 16px; /* Adjust font size as needed */
     margin-bottom: 20px; /* Add space between paragraphs */
     white-space: pre-line;
}
.ticketbody1 {
     line-height: 1.5; /* Adjust line spacing */
     font-size: 16px; /* Adjust font size as needed */
     margin-bottom: 20px; /* Add space between paragraphs */
     white-space: pre-line;
}
.ticketbody2 p {
     margin: 0; /* Remove default margin for paragraphs */
}


.ticketbody{
          border: 1px solid darkgray;
          padding: 20px;
          margin-bottom: 30px;
          border-radius: 15px;
}
.form-control {
     border-radius: 0px;
     border: #ebebeb 1px solid;
     font-size: 14px;
}
</style>
