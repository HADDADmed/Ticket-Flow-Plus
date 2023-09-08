<script setup>
import { reactive, computed, ref } from "vue";
import { useTemplateStore } from "@/stores/template";

// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";

import AuthService from "@/services/auth.service.js";
import GlobalService from "@/services/global.service.js";

// Main store and Router
const store = useTemplateStore();
 
// Input user variables
const user = reactive({
  email: null,
  password: null,
});

// Validation rules
const rules = computed(() => {
  return {
    email: {
      required,
      minLength: minLength(5),
    },
    password: {
      required,
      minLength: minLength(3),
    },
  };
});

// Use vuelidate
const v$ = useVuelidate(rules, user);
 
var errorMessage = ref(null);      

// On form submission
async function onSubmit() {
  const result = await v$.value.$validate();
  if (!result) {
    // notify user form is invalid
    return;
  }
  try {
    const response = await AuthService.login(user.email, user.password);
    if (response) {
      GlobalService.toasterShowSuccess(`Welcome ${response.user.fullName} to TicketsFlowPlus !`);
      GlobalService.routerPush('ticketflowplus-dashboard');
     }
  } catch (error) {
          if (error.response) {
            errorMessage.value = error.response.data.error;
 
          } else {
            errorMessage.value = 'An error occurred';   
           }
          GlobalService.toasterShowError(errorMessage.value);
          }

}
</script>

<template>
  <!-- Page Content -->
  <BaseBackground image="/assets/media/photos/photo28@2x.jpg">
    <div class="row g-0 bg-primary-dark-op">
      <!-- Meta Info Section -->
      <div
        class="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center"
      >
        <div class="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
          <div class="w-100">
            <strong class="link-fx fw-semibold fs-2 text-white" style="margin-left: -5px;" >{{ store.app.name }}</strong>
            <p class="text-white-75 me-xl-8 mt-2">
              Welcome to TicketsFlowPlus ! <br> By logging in you agree to our terms and conditions.  
            </p>
          </div>
        </div>
        <div
          class="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm"
        >
          <p class="fw-medium text-white-50 mb-0">
            <strong>{{ store.app.name + " " + store.app.version }}</strong>
            &copy; {{ store.app.copyright }}
          </p>
        </div>
      </div>
      <!-- END Meta Info Section -->

      <!-- Main Section -->
      <div
        class="hero-static col-lg-8 d-flex flex-column align-items-center bg-body-extra-light"
      >
        <div class="p-3 w-100 d-lg-none text-center">
          
        </div>
        <div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
          <div class="w-100">
            <!-- Header -->
            <div class="text-center mb-5">
              <p class="mb-3">
                  <img style="width: 50px;" src="/assets/media/photos/toothless.png" alt="Logo">           
                 </p>
              <h1 class="fw-bold mb-2">Sign In</h1>
              <p class="fw-medium text-muted">
                  Welcome,<br> please enter your Credentials !
                  <p style="color: red; " v-if="errorMessage"> {{ errorMessage }} </p>
              </p>
            </div>
            <!-- END Header -->

            <!-- Sign In Form -->
            <div class="row g-0 justify-content-center">
              <div class="col-sm-8 col-xl-4">
                <form @submit.prevent="onSubmit">
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control form-control-lg form-control-alt py-3"
                      id="login-email"
                      name="login-email"
                      placeholder="email"
                      :class="{
                        'is-invalid': v$.email.$errors.length || errorMessage,
                      }"
                      v-model="user.email"
                      @blur="v$.email.$touch "
                    />
                    <div
                      v-if="v$.email.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >
                      Please enter your email
                    </div>
                    <div
                      v-if="errorMessage && !v$.email.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >
                      invalide email 
                    </div>
                  </div>
                  <div class="mb-4">
                    <input
                      type="password"
                      class="form-control form-control-lg form-control-alt py-3"
                      id="login-password"
                      name="login-password"
                      placeholder="Password"
                      :class="{
                        'is-invalid': v$.password.$errors.length || errorMessage,
                      }"
                      v-model="user.password"
                      @blur="v$.password.$touch"
                    />
                    <div
                      v-if="v$.password.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >

                      Please enter your password
                    </div>
                    <div
                      v-if="errorMessage && !v$.password.$errors.length"
                      class="invalid-feedback animated fadeIn"
                    >
                      invalide password 
                    </div>
                  </div>
                  <div
                    class="d-flex justify-content-center align-items-center mb-4"
                  >
                    <div>
                      <button type="submit" class="btn btn-lg btn-alt-primary">
                        <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <!-- END Sign In Form -->
          </div>
        </div>
        <div
          class="px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between fs-sm text-center text-sm-start"
        >
          <p class="fw-medium text-black-50 py-2 mb-0">
            <strong>{{ store.app.name + " " + store.app.version }}</strong>
            &copy; {{ store.app.copyright }}
          </p>
        </div>
      </div>
      <!-- END Main Section -->
    </div>
  </BaseBackground>
  <!-- END Page Content -->
</template>
