<script setup>
import { onBeforeRouteLeave } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import { ref } from "vue";
// Main store
const store = useTemplateStore();

// Set example settings
store.header({ mode: "static" });
store.headerStyle({ mode: "light" });
store.darkModeSystem({ mode: "off" });
store.darkMode({ mode: "off" });

// Before leaving this page
onBeforeRouteLeave(() => {
  // Restore original settings
  store.header({ mode: "fixed" });
  store.darkModeSystem({ mode: "on" });
});
var isDropdownOpen = ref(false);

function toggleDropdown() {
     isDropdownOpen.value= !isDropdownOpen.value;
}
function logOut() {
   alert("logOut"); 
}
</script>

<template>
  <!-- Hero -->
  <BasePageHeading title="Ticket-Flow" subtitle=".  Plus">
    <template #extra>
      <div class="d-flex ">
        <div style="margin-right: 50px; margin-top: 12px;">
          <nav  aria-label="breadcrumb">
                    <ol class="breadcrumb breadcrumb-alt">
                      <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">ticket-Flow-plus</a>
                      </li>
                      <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">Dashboard</a>
                      </li>
                      <li class="breadcrumb-item" aria-current="page">Users List</li>
                    </ol>
                    </nav>
            </div>
            <div style="margin-left: 50px; " class="d-flex">
              <a style="font-size: 15px ; margin-top: 12px; margin-right:13px ;" class="navbar-brand"
                         >HADDAD
                         <span style="color: red">ADMIN</span></a
                    >

              <ul class="navbar-nav">
                             <li
                                  style="margin-right: 50px"
                                  class="nav-item dropdown"
                             >
                                  <a
                                       id="navbarDropdown"
                                       role="button"
                                       @click="toggleDropdown"
                                       aria-haspopup="true"
                                       aria-expanded="false"
                                  >
                                       <img
                                            style="width: 40px"
                                            src="/assets/media/photos/accountLogo.png"
                                            alt="logo"
                                       />
                                  </a>
      
                                  <div
                                       class="dropdown-menu"
                                       :class="{ show: isDropdownOpen }"
                                       aria-labelledby="navbarDropdown"
                                  >
                                       <a class="dropdown-item" @click="logOut()"
                                            >logOut</a
                                       >
                                  </div>
                             </li>
                        </ul>
      
            </div>
          </div>
        </template>
      </BasePageHeading>
  <!-- END Hero -->

</template>\



<style scoped>
.dropdown-menu {
     position: absolute;
     left: 50px;
     top: 100%;
     transform: translateX(-100%);
     display: none;
}

.show {
     display: block;
}</style>
