<script setup>
import { reactive, ref } from "vue";

// vue-chartjs, for more info and examples you can check out https://vue-chartjs.org/ and http://www.chartjs.org/docs/ -->
import { Line, Bar } from "vue-chartjs";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Set Global Chart.js configuration
Chart.defaults.color = "#818d96";
Chart.defaults.scale.grid.lineWidth = 0;
Chart.defaults.scale.beginAtZero = true;
Chart.defaults.datasets.bar.maxBarThickness = 40;
Chart.defaults.elements.bar.borderRadius = 2;
Chart.defaults.elements.bar.borderSkipped = false;
Chart.defaults.elements.point.radius = 0;
Chart.defaults.elements.point.hoverRadius = 0;
Chart.defaults.plugins.tooltip.radius = 3;
Chart.defaults.plugins.legend.labels.boxWidth = 10;

// Helper variables
const orderSearch = ref(false);

// Chart Earnings data
const earningsData = reactive({
  labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  datasets: [
    {
      label: "Open Tickets",
      fill: true,
      backgroundColor: "rgba(34, 139, 34, 0.7)", // Green color
      borderColor: "transparent",
      pointBackgroundColor: "rgba(34, 139, 34, 1)", // Green color
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(34, 139, 34, 1)", // Green color
      data: [
        34,
         74,
          24,
           74,
            40,
             50,
              30
            ],
    },
   {
      label: "Pending Tickets", // Added "..." to the label
      fill: true,
      backgroundColor: "rgba(255, 165, 0, 0.7)", // Orange color
      borderColor: "transparent",
      pointBackgroundColor: "rgba(255, 165, 0, 1)", // Orange color
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 165, 0, 1)", // Orange color
      data: [
        20,
         40,
          18,
           50,
            20,
             25,
              10
            ],
    },{
      label: "Closed Tickets",
      fill: true,
      backgroundColor: "red", // Red color
      borderColor: "transparent",
      pointBackgroundColor: "rgba(255, 0, 0, 1)", // Red color
      // pointBorderColor: "#fff",
      // pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 0, 0, 1)", // Red color
      data: [
        10,
         15,
          13,
           13,
            14,
             19,
              12
            ],
    }
  ],
});

// Chart Earnings options
const earningsOptions = reactive({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      grid: {
        drawBorder: false,
      },
    },
    y: {
      display: false,
      grid: {
        drawBorder: false,
      },
    },
  },
  interaction: {
    intersect: false,
  },
  plugins: {
    legend: {
      labels: {
        boxHeight: 10,
        font: {
          size: 14,
        },
      },
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return context.dataset.label + ": $" + context.parsed.y;
        },
      },
    },
  },
});



// start the Ticket Flow Plus code

 const user = localStorage.getItem("user");
 const whoseAuthenticated = localStorage.getItem("whoseAuthenticated")? localStorage.getItem("whoseAuthenticated") : "ADMIN";

</script>

<template>
  <!-- Hero -->
  <div class="content">
    <div
      class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start"
    >
      <div class="flex-grow-1 mb-1 mb-md-0">
        <h1 class="h3 fw-bold mb-2">Dashboard</h1>
        <h2 class="h6 fw-medium fw-medium text-muted mb-0">
          Welcome
          <RouterLink
            :to="{ name: 'ticketflowplus-dashboard' }"
            class="fw-semibold"
            >{{whoseAuthenticated}}</RouterLink
          >, everything looks great.
        </h2>
      </div>
      
    </div>
  </div>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content">
    <!-- Overview -->
    <div class="row items-push">
      <div class="col-sm-6 col-xxl-3">
        <!-- Pending Orders -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">32</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                 <span class="openStatus"> Open </span> Tickets
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fas fa-lock-open" style="color: #135bd8;"></i>
                                          </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>View All Open Tickets</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
        <!-- END Pending Orders -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- New Customers -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">124</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  <span class="pendingStatus"> Pending</span> Tickets
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fas fa-truck-loading " style="color: #135bd8; "></i>
                            </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>View all Pending Tickets</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
        <!-- END New Customers -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Messages -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">45</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  <span class="closedStatus">Closed</span> Tickets
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fas fa-lock" style="color: #135bd8;"></i>              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>View all Closed Tickets</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
        <!-- END Messages -->
      </div>
      <div class="col-sm-6 col-xxl-3">
        <!-- Conversion Rate -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">50</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  Tickets Count 
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa-solid fa-ticket fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>View All Tickets </span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
        <!-- END Conversion Rate-->
      </div>
    </div>
    <!-- END Overview -->

    <!-- Statistics -->
    <div class="row">
      
        <div :class="whoseAuthenticated=='USER'?'d-flex justify-content-center align-item-center':'col-xl-8 col-xxl-9 d-flex flex-column'">
        <!-- Earnings Summary -->
        <BaseBlock
          title="Earnings Summary"
          class="flex-grow-1 d-flex flex-column"
        >
          <template #options>
            <button type="button" class="btn-block-option">
              <i class="si si-settings"></i>
            </button>
          </template>
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex items-center"
            >
              <Bar
                :data="earningsData"
                :options="earningsOptions"
                class="w-100"
              />
            </div>
          </template>
        </BaseBlock>
        <!-- END Earnings Summary -->
      </div>
      <div v-if="whoseAuthenticated == 'ADMIN'" class="col-xl-4 col-xxl-3 d-flex flex-column">
        <!-- Last 2 Weeks -->
        <div class="row items-push flex-grow-1">
          <div class="col-md-6 col-xl-12">
            
            <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">10</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                Count of Categoeies
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fas fa-columns" style="color: #135bd8;"></i>
                                          </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>View All Open Categoeies</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
          </div>
          <div v-if="whoseAuthenticated == 'ADMIN'" class="col-md-6 col-xl-12">
            <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">50</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                 Count Of Users 
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa-solid fa-people-group" style="color: #135bd8;"></i>
                                          </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>View All Users </span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
          </div>
          <div v-if="whoseAuthenticated == 'ADMIN'" class="col-xl-12">
            <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">5</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                 Count of Responsibles
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa-solid fa-list-check" style="color: #135bd8;"></i>
                                          </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>View All Responsibles</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
          </div>
        </div>
        <!-- END Last 2 Weeks -->
      </div>
    </div>
    <!-- END Statistics -->

  </div>
  <!-- END Page Content -->
</template>
<style>
.openStatus{
  color: green;
}
.openStatus:hover{
  color: black;
  background-color: green;
  opacity: 0.8;

}
.closedStatus{
  color: red;
}
.closedStatus:hover{
  color: black;
  background-color: red;
  opacity: 0.8;

}
.pendingStatus{
  color: orange;
}
.pendingStatus:hover{
  color: black;
  background-color: orange;
  opacity: 0.8;

}

</style>
