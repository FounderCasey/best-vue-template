<template>
  <div class="min-h-full">
    <Navbar />
    <div class="py-10">
      <header class="mb-4">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-slate-300">Dashboard</h1>
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
            <div class="flex-1 rounded-md h-80 bg-green-300"></div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { onMounted, ref, Transition } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
import {
  CalendarDaysIcon,
  CalendarIcon,
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

const route = useRoute();

const authStore = useAuthStore();

const { services } = storeToRefs(authStore);

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
    title: "Average uptime",
    icon: ClockIcon,
    value: "17 days 4 hours 23 minutes",
  },
  {
    title: "Total Incidents",
    icon: ExclamationTriangleIcon,
    value: Math.floor(Math.random() * 15),
  },
  {
    title: "Average response time",
    icon: ChartBarIcon,
    value: Math.floor(Math.random() * 30) + "ms",
  },
  {
    title: "Upcoming Event",
    icon: CalendarIcon,
    value: new Date("10/26/2023").toLocaleString(),
  },
  // More people...
];
</script>
