<script setup>
import { ref ,onMounted} from "vue";

// vue-chartjs, for more info and examples you can check out https://vue-chartjs.org/ and http://www.chartjs.org/docs/ -->
import { Pie } from "vue-chartjs";
import { Chart, registerables } from "chart.js";

// fetching statistics from the backend
import DashboardService   from "../../services/dashboard.service";
import GlobalService from "../../services/global.service";


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


// start the Ticket Flow Plus code
 const user = JSON.parse(localStorage.getItem("user"))
 const whoseAuthenticated = user.role;


var statistics = ref({});
var chartPolarPieDonutData = ref({labels: ["", "", ""],datasets: [{data: ['', '', ''],backgroundColor: [ "", "", "",],hoverBackgroundColor: ["","", "", ],},],});

  const getStatistics = async () => {
  try {
    const response = await DashboardService.dashboardstatistics();
    // alert("Response received"); // Show alert when response is received
    statistics.value = response.data[0];
    chartPolarPieDonutData.value = {
      labels: ["OPEN", "PENDING", "CLOSED"],
      datasets: [
        {
          data: [
            statistics.value.open_status_tickets_count,
            statistics.value.pending_status_tickets_count,
            statistics.value.closed_status_tickets_count
          ],
          backgroundColor: [
            "rgba(130, 204, 109, 1)", // Darker green for OPEN
            "rgba(255, 193, 7, 1)",   // Warning color for PENDING
            "rgba(235, 91, 91, 1)",   // Red for CLOSED
          ],
          hoverBackgroundColor: [
            "rgba(130, 204, 109, .75)",
            "rgba(255, 193,  7, .75)", // Warning color for PENDING
            "rgba(235, 91, 91, .75)", // Red for CLOSED
          ],
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching statistics:", error);
  }
};


onMounted(() => {
   getStatistics();
});


</script>

<template>
  <!-- Hero -->
  <div class="content animated bounceInRight">
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
            >{{user.fullName}}</RouterLink
          >, to your Ticket Flow Plus Dashboard
        </h2>
      </div>
      
    </div>
  </div>
  <!-- END Hero -->

  <!-- Page Content -->
  <div class="content" >
    <!-- Overview -->
    <div class="row items-push">
      <div class="col-sm-6 col-xxl-3 animated bounceInUp">
        <!-- Pending Orders -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">{{statistics.open_status_tickets_count}} </dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                 <span class="openStatus"> Open </span> Tickets
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fas fa-lock-open" style="color: #135bd8;"></i>
                                          </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a @click="GlobalService.routerPush('ticketflowplus-tickets-list',null,{ filter_terme: 'OPEN'})"

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
      <div class="col-sm-6 col-xxl-3 animated bounceInDown">
        <!-- New Customers -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">{{statistics.pending_status_tickets_count}}</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  <span class="pendingStatus"> Pending</span> Tickets  
                </dd>
              </dl> 
              <div class="item item-rounded-lg bg-body-light">
                <i class="fas fa-truck-loading " style="color: #135bd8; "></i>
                            </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a @click="GlobalService.routerPush('ticketflowplus-tickets-list',null,{ filter_terme: 'PENDING'})"
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
      <div class="col-sm-6 col-xxl-3 animated bounceInUp">
        <!-- Messages -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">{{statistics.closed_status_tickets_count}}</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  <span class="closedStatus">Closed</span> Tickets
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fas fa-lock" style="color: #135bd8;"></i> </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a @click="GlobalService.routerPush('ticketflowplus-tickets-list',null,{ filter_terme: 'CLOSED'})"
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
      <div class="col-sm-6 col-xxl-3 animated bounceInDown">
        <!-- Conversion Rate -->
        <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">{{statistics.total_count}}</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                  total of Tickets  
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa-solid fa-ticket fs-3 text-primary"></i>
              </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a @click="GlobalService.routerPush('ticketflowplus-tickets-list',null,{ filter_terme: ''})"
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
    <div class="row animated  ">
      
        <div :class="whoseAuthenticated=='USER'?'d-flex justify-content-center align-item-center':'col-xl-8 col-xxl-9 d-flex flex-column'">
        <!-- Earnings Summary -->
        <BaseBlock
          title="Tickets Statistics Pie Chart"
          class="flex-grow-1 d-flex flex-column animated bounceInRight"
        >
          <template #content>
            <div class="py-3 px-xxl-7">
            <Pie
              :data="chartPolarPieDonutData"
              :options="{ maintainAspectRatio: false }"
              style="height: 350px"
            />
          </div>
          </template>
        </BaseBlock>
        <!-- END Earnings Summary -->
      </div>
      <div v-if="whoseAuthenticated == 'ADMIN' || whoseAuthenticated == 'RESPONSIBLE' "  class="col-xl-4 col-xxl-3 d-flex flex-column">
        <!-- Last 2 Weeks -->
        <div class="row items-push flex-grow-1">
          <div class="col-md-6 col-xl-12 animated bounceInLeft">
            
            <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">{{statistics.categories_count}}</dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                Total of Categoeies
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fas fa-columns" style="color: #135bd8;"></i>
                                          </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a @click="GlobalService.routerPush('ticketflowplus-categories-list')"
                class="block-content block-content-full block-content-sm fs-sm fw-medium d-flex align-items-center justify-content-between"
                href="javascript:void(0)"
              >
                <span>View All  Categoeies</span>
                <i
                  class="fa fa-arrow-alt-circle-right ms-1 opacity-25 fs-base"
                ></i>
              </a>
            </div>
          </template>
        </BaseBlock>
          </div>
          <div v-if="whoseAuthenticated == 'ADMIN' || whoseAuthenticated == 'RESPONSIBLE'  " class="col-md-6 col-xl-12 animated bounceInLeft">
            <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">{{statistics.users_count}} </dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                 Total Of Users 
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa-solid fa-people-group" style="color: #135bd8;"></i>
                                          </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a @click="GlobalService.routerPush('ticketflowplus-users-list',null,{ filter_terme: 'USER'})"
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
          <div v-if="whoseAuthenticated == 'ADMIN'" class="col-xl-12 animated bounceInLeft">
            <BaseBlock class="d-flex flex-column h-100 mb-0">
          <template #content>
            <div
              class="block-content block-content-full flex-grow-1 d-flex justify-content-between align-items-center"
            >
              <dl class="mb-0">
                <dt class="fs-3 fw-bold">{{statistics.responsibles_count}} </dt>
                <dd class="fs-sm fw-medium fs-sm fw-medium text-muted mb-0">
                 total of Responsibles
                </dd>
              </dl>
              <div class="item item-rounded-lg bg-body-light">
                <i class="fa-solid fa-list-check" style="color: #135bd8;"></i>
                                          </div>
            </div>
            <div class="bg-body-light rounded-bottom">
              <a @click="GlobalService.routerPush('ticketflowplus-users-list',null,{ filter_terme: 'RESPONSIBLE'})"
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
