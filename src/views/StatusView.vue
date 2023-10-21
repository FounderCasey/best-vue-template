<template>
  <div class="px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-4xl text-center space-y-10">
      <div>
        <h2 class="text-4xl font-bold tracking-tight text-slate-300 sm:text-6xl">
          {{ organization ? organization.name + " is online" : "All services online" }}
        </h2>
        <p class="mt-6 text-lg leading-8 text-slate-400">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
          fugiat aliqua.
        </p>
      </div>

      <!-- Services -->

      <div>
        <div class="bg-slate-800 rounded-md p-4 ring-2 ring-slate-700">
          <!-- top info -->
          <div class="flex items-center justify-between font-medium">
            <a href="#">api.monitaur.xyz</a>
            <p class="font-normal">{{ uptime.toLocaleString() }}% uptime</p>
          </div>
          <!-- graph bar -->
          <!-- Let's code a grid column that goes 90 days wide -->

          <div class="flex gap-x-0.5 mt-2">
            <div
              v-for="i in history"
              v-on:mouseover="toggleService(i, true)"
              v-on:mouseleave="toggleService(i, false)"
              :class="[
                i.status == 'up' ? 'bg-emerald-400 hover:bg-emerald-200' : 'bg-rose-400 hover:bg-rose-600',
                'w-5 h-10 rounded-sm duration-100 group',
              ]"
            >
              <div
                class="absolute hidden group-hover:flex scale-in-bottom w-full max-w-fit pointer-events-auto rounded-lg bg-slate-700 shadow-xl ring-2 ring-slate-600"
              >
                <div class="flex items-start p-2">
                  <div class="flex-shrink-0 pt-0.5"></div>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-slate-300">{{ new Date(i.timestamp).toDateString() }}</p>
                    <p class="mt-1 text-sm text-gray-500">{{ i.status == "up" ? "100% Uptime" : "98.2% Uptime" }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <Tooltip v-if="selectedService" :service="selectedService" /> -->
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Tooltip from "../components/Tooltip.vue";
import axios from "axios";

const organization = ref(null);

const toggleService = (service, active) => {
  console.log(service, active);

  if (!active) {
    selectedService.value = null;
    return;
  } else {
    selectedService.value = service;
  }
};

const history = ref([
  {
    timestamp: new Date().getTime(),
    status: "up",
  },
  // generate 90 days of fake data minus one day each time
  ...Array.from({ length: 89 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i - 1);

    let ran = Math.random() * 10;

    console.log(ran > 0.2 ? "up" : "down");

    return {
      timestamp: date.getTime(),
      status: ran > 0.2 ? "up" : "down",
    };
  }),
]);

const uptime = computed(() => {
  const up = history.value.filter((i) => i.status == "up").length;
  const down = history.value.filter((i) => i.status == "down").length;

  return (up / (up + down)) * 100;
});

onMounted(async () => {
  await axios.get("/").then((response) => {
    console.log(response.data);
  });

  //await axios.get("/api/organization").then((response) => {
  //organization.value = response.data;
  //});
});
</script>
