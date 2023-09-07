<script setup>
import { ref } from "vue";
import { createToaster } from "@meforma/vue-toaster";
import { useRouter } from "vue-router";
import UsersService from "@/services/users.service.js";
const router = useRouter();
const toaster = createToaster({});
const UsersRoles =[
    
    {
        role: 'USER',
        class: 'User'
    },
    {
        role: 'RESPONSIBLE',
        class: 'Admin'
    } ,
    {
        role: 'ADMIN',
        class: 'Admin'
    }
   
]
const newUser = ref({
     fullName: "",
     email: "",
     password: "",
     role: "",
     phoneNumber: "",
     birthDate: "",
     hiringDate: "",
     passwordConfirmation: "",
});
function createUser() {
     if (newUser.value.password != newUser.value.passwordConfirmation) {
          newUser.value.password = "";
          newUser.value.passwordConfirmation = "";
          toaster.show(
               `<div><i class="fa-solid fa-circle-exclamation"></i> Passwords are not the same !</div> <div style="display:flex; justify-content:center;">Please Try again</div>`,
               {
                    position: "bottom-right",
                    duration: 5000,
                    type: "warning",
               }
          );
          return;
     } else {
              UsersService.createUser(newUser.value)
               .then(function (response) {
                    console.log(response);
                    toaster.show(
                         `<div><i class="fa-solid fa-circle-check"></i> User Created successfuly !</div>`,
                         {
                              position: "bottom-right",
                              duration: 5000,
                              type: "success",
                         }
                    );

                    router.push({mame: 'ticketflowplus-users-list'}); // Assuming you have a route named 'categorylist'
               })
               .catch(function (error) {
                    toaster.show(
                         `<div><i class="fa-solid fa-circle-check"></i> ${error.response.data.error} !</div>`,
                         {
                              position: "top",
                              duration: 5000,
                              type: "error",
                         }
                    );
               });
     }
}
</script>

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
          <BaseBlock title="add New User    " content-full>
               <div class="row">
                    <div class="col-lg-12 mx-auto pb-4">
                         <div class="card mt-2 mx-auto p-4  ">
                              <div class="card-body ">
                                   <div class="container">
                                        <form
                                             @submit.prevent="createUser()"
                                             id="contact-form"
                                             role="form"
                                        >
                                             <div class="controls">
                                                  <div class="row">
                                                       <div class="col-md-6">
                                                            <div
                                                                 class="form-group"
                                                            >
                                                                 <label
                                                                      for="form_fullName"
                                                                      >Full Name
                                                                      *</label
                                                                 >
                                                                 <input
                                                                      id="form_fullName"
                                                                      type="text"
                                                                      v-model="
                                                                           newUser.fullName
                                                                      "
                                                                      class=" form-control form-control-alt" 
                                                                      placeholder="enter the User full Name *"
                                                                      required="required"
                                                                      data-error="Firstname is required."
                                                                 />
                                                            </div>
                                                       </div>
                                                       <div class="col-md-6">
                                                            <div
                                                                 class="form-group"
                                                            >
                                                                 <label
                                                                      for="form_phoneNumber"
                                                                      >Phone
                                                                      number
                                                                      *</label
                                                                 >
                                                                 <input
                                                                      id="form_phoneNumber"
                                                                      type="text"
                                                                      v-model="
                                                                           newUser.phoneNumber
                                                                      "
                                                                      name="surname"
                                                                      class=" form-control form-control-alt"                                                                      placeholder="enter the User phone number *"
                                                                      required="required"
                                                                      data-error="Lastname is required."
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div class="row">
                                                       <div class="col-md-6">
                                                            <div
                                                                 class="form-group"
                                                            >
                                                                 <label
                                                                      for="form_email"
                                                                      >Email
                                                                      *</label
                                                                 >
                                                                 <input
                                                                      id="form_email"
                                                                      type="email"
                                                                      name="email"
                                                                      v-model="
                                                                           newUser.email
                                                                      "
                                                                      class=" form-control form-control-alt"                                                                      placeholder="Please enter your email *"
                                                                      required="required"
                                                                      data-error="Valid email is required."
                                                                 />
                                                            </div>
                                                       </div>
                                                       <div class="col-md-6">
                                                            <div
                                                                 class="form-group"
                                                            >
                                                                 <label
                                                                      style="
                                                                           color: red;
                                                                      "
                                                                      for="form_role"
                                                                      >Select
                                                                      the user
                                                                      Role
                                                                      *</label
                                                                 >
                                                                 <select
                                                                      v-model="
                                                                           newUser.role
                                                                      "
                                                                      id="form_role"
                                                                      name="role"
                                                                      class=" form-control form-control-alt"                                                                      required="required"
                                                                      data-error="Please specify the role."
                                                                 >
                                                                      <option
                                                                           value=""
                                                                           selected
                                                                           disabled
                                                                      >
                                                                           --Select
                                                                           Role--
                                                                      </option>
                                                                      <option
                                                                           v-for="UserRole in UsersRoles"
                                                                           :class="
                                                                                UserRole.class
                                                                           "
                                                                      >
                                                                           {{
                                                                                UserRole.role
                                                                           }}
                                                                      </option>
                                                                 </select>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div class="row">
                                                       <div class="col-md-6">
                                                            <div
                                                                 class="form-group"
                                                            >
                                                                 <label
                                                                      for="form_hiringDate"
                                                                      >Hiring
                                                                      Date
                                                                      *</label
                                                                 >
                                                                 <input
                                                                      id="form_hiringDate"
                                                                      v-model="
                                                                           newUser.hiringDate
                                                                      "
                                                                      type="date"
                                                                      name="hiringDate"
                                                                      class=" form-control form-control-alt"                                                                      required="required"
                                                                      data-error="Hiring date is required."
                                                                 />
                                                            </div>
                                                       </div>
                                                       <div class="col-md-6">
                                                            <div
                                                                 class="form-group"
                                                            >
                                                                 <label
                                                                      for="form_birthDate"
                                                                      >Birth
                                                                      Date
                                                                 </label>
                                                                 <input
                                                                      id="form_birthDate"
                                                                      v-model="
                                                                           newUser.birthDate
                                                                      "
                                                                      type="date"
                                                                      name="birthDate"
                                                                      class=" form-control form-control-alt"                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div
                                                       class="row"
                                                       style="margin-top: 30px"
                                                  >
                                                       <div class="col-md-6">
                                                            <div
                                                                 class="form-group"
                                                            >
                                                                 <label
                                                                      for="form_password"
                                                                      >Access
                                                                      Pasword
                                                                      *</label
                                                                 >
                                                                 <input
                                                                      id="form_password"
                                                                      v-model="
                                                                           newUser.password
                                                                      "
                                                                      type="password"
                                                                      name="empasswordail"
                                                                      class=" form-control form-control-alt"                                                                      placeholder="enter the User Access Pasword *"
                                                                      required="required"
                                                                      data-error="Pleas enter the Pasword."
                                                                 />
                                                            </div>
                                                       </div>
                                                       <div class="col-md-6">
                                                            <div
                                                                 class="form-group"
                                                            >
                                                                 <label
                                                                      for="form_passwordConfirmation"
                                                                      >Confirm
                                                                      Pasword
                                                                      *</label
                                                                 >
                                                                 <input
                                                                      id="form_passwordConfirmation"
                                                                      type="password"
                                                                      v-model="
                                                                           newUser.passwordConfirmation
                                                                      "
                                                                      name="passwordConfirmation"
                                                                      class=" form-control form-control-alt"                                                                      placeholder="comfirm the Access Pasword *"
                                                                      required="required"
                                                                      data-error="Pleas enter the Pasword comfirmation."
                                                                 />
                                                            </div>
                                                       </div>
                                                  </div>

                                                  <div
                                                       class="col-md-12 d-flex justify-conetent-center"
                                                       style="
                                                            margin-top: 30px;
                                                            margin-left: 50px;
                                                       "
                                                  >
                                                       <input
                                                            type="submit"
                                                             class="btn btn-send pt-2 btn-block submitButton"
                                                            value="Create The User"
                                                       />
                                                  </div>
                                             </div>
                                        </form>
                                   </div>
                              </div>
                         </div>
                         <!-- /.8 -->
                    </div>
                    <!-- /.row-->
               </div>
          </BaseBlock>

          <!-- END Tiptap -->
     </div>
     <!-- END Page Content -->
</template>

<style scoped>

.User{
    color: green;
}
.Admin{
    color: red;
    font-size: large;
}
body {
    font-family: 'Lato', sans-serif;
}

h1 {
    margin-bottom: 40px;
}

label {
    color: #333;
}

.btn-send {
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    width: 80%;
    margin-left: 3px;
    }
.help-block.with-errors {
    color: #ff5050;
    margin-top: 5px;

}

.card{
	margin-left: 10px;
	margin-right: 10px;
}
.submitButton {
    background: #003366;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 3px;
    line-height: 1em;
    color: white;
}

</style>
