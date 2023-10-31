<template>
  <div class="min-h-full">
    <Navbar />
    <div class="py-10">
      <header class="mb-4">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-slate-300">{{ service.name }}</h1>
          <div class="flex gap-3">
            <button class="button-main disabled:opacity-40 disabled:pointer-events-none" disabled @click="showEditServiceSlideOver = true">
              <PlusIcon class="h-4 w-4" />
              <span>Create Event</span>
            </button>
            <button class="button-main" @click="showEditServiceSlideOver = true">
              <PencilSquareIcon class="h-4 w-4" />
              <span>Edit Service</span>
            </button>
          </div>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
          <!-- Your content -->
          <!-- Flex div, share even space -->
          <div class="flex justify-between gap-x-6">
            <div class="flex-1 flex flex-col justify-around rounded-md">
              <!-- Lets do four divs, flex wrap even spacing -->
              <div class="grid grid-cols-1 h-full sm:grid-cols-2 gap-4">
                <div
                  v-for="item in meta"
                  :key="item.title"
                  class="relative flex items-center space-x-3 rounded-lg border border-slate-700 bg-slate-800 px-6 py-5 shadow-sm hover:border-sky-600 duration-200"
                >
                  <div class="flex-shrink-0">
                    <!-- add icon -->
                    <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm text-gray-500">{{ item.title }}</p>
                    <p class="text-base font-medium text-slate-300">{{ item.value }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="flex-1 rounded-md bg-slate-800 border border-slate-700 flex flex-col items-center justify-center hover:border-sky-600 duration-200"
            >
              <HandThumbUpIcon class="h-5 w-5 text-slate-300" />
              <p class="text-base font-medium text-slate-300">Well done!</p>
              <p class="text-sm text-slate-400">No recent incidents</p>
            </div>
          </div>
          <div class="flex justify-between gap-x-6">
            <div class="flex-1 rounded-md p-6 bg-slate-800 border border-slate-700">
              <LineChart ref="lineRef" :data="chartData" :options="chartOptions" />
            </div>
          </div>
        </div>
        <button @="refreshChart">Refresh</button>
      </main>
    </div>

    <Transition>
      <EditServiceSlideOver @toggle="toggleEditServiceSlideOver" :showEditServiceSlideOver="showEditServiceSlideOver" :service="service" />
    </Transition>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import EditServiceSlideOver from "../components/EditServiceSlideOver.vue";
import { computed, onMounted, ref, Transition, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
import {
  ChartBarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  HandThumbUpIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusIcon,
  SunIcon,
} from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

const route = useRoute();

const authStore = useAuthStore();

// charts
Chart.register(...registerables);
Chart.defaults.color = "#f5f6fa";

const lineRef = ref();

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

let analytics = ref(null);

let chartData = computed(() => {
  console.log("Chart data");
  if (analytics.value) {
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Uptime",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "#10b981",
          backgroundColor: "#10b981",
          fill: true,
        },
      ],
    };
  }
});

const refreshChart = () => {
  console.log("Refreshing chart");
  lineRef.value.update();
};

watch(chartData, () => {
  console.log("Chart data changed");
  console.log(chartData.value);
  lineRef.value.update();
});

const { services } = storeToRefs(authStore);
const showEditServiceSlideOver = ref(false);

const toggleEditServiceSlideOver = (isOpen) => {
  showEditServiceSlideOver.value = isOpen;
};

const service = ref(services.value.find((service) => service._id === route.params.id));

const formatTimeDifference = (targetDate) => {
  const currentDate = new Date();
  targetDate = new Date(targetDate);
  const timeDifference = currentDate - targetDate;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const formattedTime =
    // if days == 1, show day, else show days
    (days > 0 ? `${days} day${days === 1 ? "" : "s"} ` : "") +
    // if hours == 1, show hour, else show hours
    (hours % 24 > 0 ? `${hours % 24} hour${hours % 24 === 1 ? "" : "s"} ` : "") +
    // if minutes == 1, show minute, else show minutes
    (minutes % 60 > 0 ? `${minutes % 60} minute${minutes % 60 === 1 ? "" : "s"} ` : "");

  console.log(formattedTime);

  return formattedTime;
};

const meta = [
  {
    title: "Current Uptime",
    icon: ClockIcon,
    value: formatTimeDifference(service.value.createdAt),
  },
  {
    title: "Total Incidents",
    icon: ExclamationTriangleIcon,
    value: Math.floor(Math.random() * 10),
  },
  {
    title: "Average response time",
    icon: ChartBarIcon,
    value: Math.floor(Math.random() * 30) + "ms",
  },
  {
    title: "Created at",
    icon: SunIcon,
    value: new Date(service.value.createdAt).toLocaleString(),
  },
  // More people...
];

onMounted(async () => {
  // fetch services
  console.log(route.params.id);
  console.log(service.value);

  analytics.value = await authStore.fetchHistory(route.params.id);
});
</script>
