<template>
  <nav>
    <!-- Desktop -->
    <Disclosure as="nav" class="border-b border-slate-700" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <img
                class="block h-8 w-auto lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=400"
                alt="Your Company"
              />
              <img
                class="hidden h-8 w-auto lg:block"
                src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=400"
                alt="Your Company"
              />
            </div>
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                :class="[
                  item.current
                    ? 'border-sky-500 text-slate-300'
                    : 'border-transparent text-slate-400 hover:border-slate-400 hover:text-slate-300',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</router-link
              >
            </div>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center gap-3">
            <button
              type="button"
              class="relative rounded-full bg-slate-800 p-1 text-slate-400 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <!-- <span class="absolute -inset-1.5" /> -->
              <span class="sr-only">View notifications</span>
              <GlobeAmericasIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- Organizations -->
            <Listbox as="div" v-model="selected">
              <div class="relative">
                <ListboxButton
                  class="relative w-full cursor-default rounded-md bg-slate-800 py-1.5 pl-5 pr-12 text-left text-slate-300 shadow-sm ring-1 ring-inset ring-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-600 sm:text-sm sm:leading-6"
                >
                  <span class="block truncate">{{ selected.name }}</span>
                  <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-slate-300" aria-hidden="true" />
                  </span>
                </ListboxButton>

                <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                  <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <ListboxOption as="template" v-for="org in organizations" :key="org._id" :value="org" v-slot="{ active, selected }">
                      <li
                        :class="[active ? 'bg-sky-600 text-white' : 'text-slate-400', 'relative cursor-default select-none py-2 pl-8 pr-4']"
                      >
                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{ org.name }}</span>

                        <span
                          v-if="selected"
                          :class="[active ? 'text-white' : 'text-sky-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>

            <!-- Profile dropdown -->
            <Menu as="div" class="relative">
              <div>
                <MenuButton
                  class="relative flex max-w-xs items-center rounded-full bg-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <span class="absolute -inset-1.5" />
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="userObj.imageUrl + userObj.name" alt="" />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <router-link
                      v-if="!item.isButton"
                      :to="item.href"
                      :class="[active ? 'bg-slate-800 text-slate-300' : '', 'block px-4 py-2 text-sm text-slate-400']"
                      >{{ item.name }}</router-link
                    >

                    <button
                      v-else
                      type="button"
                      class="block px-4 py-2 text-sm text-slate-400 hover:text-slate-300"
                      role="menuitem"
                      @click="useAuthStore().signOut()"
                    >
                      {{ item.name }}
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="-mr-2 flex items-center sm:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-slate-800 p-2 text-slate-400 hover:bg-slate-700 hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <!-- Mobile -->
      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 pb-3 pt-2">
          <DisclosureButton
            v-for="item in navigation"
            :key="item.name"
            as="a"
            :href="item.href"
            :class="[
              item.current
                ? 'border-sky-500 bg-slate-700 text-slate-300'
                : 'border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-700 hover:text-slate-300',
              'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
            ]"
            :aria-current="item.current ? 'page' : undefined"
            >{{ item.name }}</DisclosureButton
          >
        </div>
        <div class="border-t border-slate-700 pb-3 pt-4">
          <div class="flex items-center px-4">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="userObj.imageUrl + userObj.name" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-slate-300">{{ userObj.name }}</div>
              <div class="text-sm font-medium text-slate-500">{{ userObj.email }}</div>
            </div>
            <button
              type="button"
              class="relative ml-auto flex-shrink-0 rounded-full bg-slate-800 p-1 text-slate-400 hover:text-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <span class="absolute -inset-1.5" />
              <span class="sr-only">View notifications</span>
              <GlobeAmericasIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1">
            <DisclosureButton
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block px-4 py-2 text-base font-medium text-slate-400 hover:bg-slate-700 hover:text-slate-300"
              >{{ item.name }}</DisclosureButton
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  </nav>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { Bars3Icon, GlobeAmericasIcon, XMarkIcon, ChevronUpDownIcon, CheckIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "../stores/auth";
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();

const { user, organizations } = storeToRefs(authStore);

const userObj = ref({
  name: user.value.firstName + " " + user.value.lastName,
  email: user.value.email,
  imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?scale=80&translateY=15&seed=",
});

const navigation = ref([
  { name: "Dashboard", href: "/", current: true },
  { name: "Services", href: "/services", current: false },
  { name: "Team", href: "/team", current: false },
]);
const userNavigation = [
  { name: "Your Profile", href: "#", isButton: false },
  { name: "Settings", href: "#", isButton: false },
  { name: "Sign out", href: "#", isButton: true },
];

const selected = ref(organizations.value[0]);

const route = useRoute();

onMounted(() => {
  navigation.value.forEach((item) => {
    item.current = item.href === route.path;
  });
});
</script>
