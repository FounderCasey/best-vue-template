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
            <p class="font-normal">99.929% uptime</p>
          </div>
          <!-- graph bar -->
          <!-- Let's code a grid column that goes 90 days wide -->

          <div class="flex gap-x-0.5 mt-2">
            <div
              v-for="i in history"
              :class="[
                i.status == 'up' ? 'bg-emerald-400 hover:bg-emerald-600' : 'bg-rose-400 hover:bg-rose-600',
                'w-5 h-10 bg-slate-700 rounded-sm duration-100',
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const organization = ref(null);

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

onMounted(async () => {
  await axios.get("/").then((response) => {
    console.log(response.data);
  });

  //await axios.get("/api/organization").then((response) => {
  //organization.value = response.data;
  //});
});
</script>
