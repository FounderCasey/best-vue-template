<template>
  <div class="min-h-full">
    <Navbar />
    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-slate-300">Services</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-3">
          <!-- Your content -->

          <div class="mt-3">
            <ul role="list" class="divide-y divide-gray-100">
              <li
                v-for="(service, index) in services"
                :key="index"
                class="flex justify-between gap-x-6 p-3 rounded-lg border border-slate-700"
              >
                <div class="flex items-center min-w-0 gap-x-4">
                  <div class="flex-none rounded-full bg-emerald-500/20 p-1 animate-pulse">
                    <div class="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <div class="min-w-0 flex-auto">
                    <p class="text-sm font-semibold leading-6 text-slate-400">
                      <a :href="service.url" class="hover:text-slate-100 duration-200">{{ service.url }}</a>
                    </p>
                  </div>
                </div>
                <div class="flex shrink-0 items-center gap-x-6">
                  <p class="text-sm leading-6 text-slate-400">16d 21h 44m</p>
                  <div class="hidden sm:flex sm:items-center">
                    <p class="text-sm leading-6 text-slate-400">2</p>
                    <ExclamationTriangleIcon class="h-4 w-4 ml-1" aria-hidden="true" />
                  </div>
                  <Menu as="div" class="relative flex-none">
                    <MenuButton class="-m-2.5 block p-2.5 text-slate-400 hover:text-slate-300">
                      <span class="sr-only">Open options</span>
                      <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                    </MenuButton>
                    <transition
                      enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95"
                      enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100"
                      leave-to-class="transform opacity-0 scale-95"
                    >
                      <MenuItems
                        class="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-slate-800 py-2 shadow-lg ring-1 ring-slate-700 focus:outline-none font-medium"
                      >
                        <MenuItem v-slot="{ active }">
                          <a
                            href="#"
                            :class="[
                              active ? 'text-slate-300' : '',
                              'block px-3 py-1 hover:text-slate-300 text-sm leading-6 text-slate-400',
                            ]"
                            >View profile<span class="sr-only">, {{ service.name }}</span></a
                          >
                        </MenuItem>
                        <MenuItem v-slot="{ active }">
                          <a
                            href="#"
                            :class="[
                              active ? 'text-slate-300' : '',
                              'block px-3 py-1 hover:text-slate-300 text-sm leading-6 text-slate-400',
                            ]"
                            >Message<span class="sr-only">, {{ service.name }}</span></a
                          >
                        </MenuItem>
                      </MenuItems>
                    </transition>
                  </Menu>
                </div>
              </li>
            </ul>
          </div>

          <div class="flex flex-col gap-3">
            <input type="text" v-model="name" />
            <input type="text" v-model="url" />

            <button @click="createService">Create Service</button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { EllipsisVerticalIcon } from "@heroicons/vue/20/solid";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const authStore = useAuthStore();

const { services } = storeToRefs(authStore);

const name = ref("");
const url = ref("");

const createService = async () => {
  await authStore.createService({ name: name.value, url: url.value });
};

onMounted(async () => {
  // fetch services
  await authStore.fetchServices();
});
</script>
