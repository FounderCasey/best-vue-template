<template>
  <TransitionRoot as="template" :show="showNewServiceSlideOver">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="transform transition ease-in-out duration-200"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transform transition ease-in-out duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-900 opacity-60" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-300"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md border-l border-slate-700">
                <div class="flex h-full flex-col bg-slate-800 shadow-xl">
                  <div class="bg-slate-900 px-4 py-6 sm:px-6">
                    <div class="flex items-center justify-between">
                      <DialogTitle class="text-base font-semibold leading-6 text-slate-300">Add a New Service</DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative rounded-md bg-slate-700 text-sky-200 hover:text-white focus:outline-none p-0.5 hover:bg-rose-500 transition ease-in-out duration-200"
                          @click="close"
                        >
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                          <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div class="mt-1">
                      <p class="text-sm text-slate-400">Add the details of your new service below. We'll take care of the rest.</p>
                    </div>
                  </div>
                  <div class="relative flex-1 px-4 py-6 sm:px-6 space-y-4 text-sm">
                    <div>
                      <label for="name" class="block text-sm font-medium leading-6 text-slate-400">Service Name</label>
                      <div class="mt-1">
                        <input type="text" name="name" id="name" placeholder="Example App" v-model="name" required class="input-main" />
                      </div>
                    </div>

                    <div>
                      <label for="url" class="block text-sm font-medium leading-6 text-slate-400">Service URL</label>
                      <div class="mt-1">
                        <input
                          type="url"
                          name="url"
                          id="url"
                          placeholder="https://example.com"
                          pattern="https://.*"
                          v-model="url"
                          required
                          class="input-main"
                        />
                      </div>
                    </div>

                    <div class="space-y-2">
                      <label for="url" class="block text-sm font-medium leading-6 text-slate-400">Receive a notification?</label>
                      <div class="mt-1 flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="phone"
                          id="phone"
                          v-model="phone"
                          class="h-4 w-4 rounded bg-slate-700 ring-1 !ring-slate-600 border-slate-700 text-sky-500 --tw-offset !focus:ring-sky-500 !ring-offset-slate-800"
                        />
                        <label for="phone"> Phone call </label>
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="sms"
                          id="sms"
                          v-model="sms"
                          class="h-4 w-4 rounded bg-slate-700 ring-1 !ring-slate-600 border-slate-700 text-sky-500 --tw-offset !focus:ring-sky-500 !ring-offset-slate-800"
                        />
                        <label for="sms"> Text message </label>
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="email"
                          id="email"
                          v-model="email"
                          class="h-4 w-4 rounded bg-slate-700 ring-1 !ring-slate-600 border-slate-700 text-sky-500 --tw-offset !focus:ring-sky-500 !ring-offset-slate-800"
                        />
                        <label for="email"> Email </label>
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="slack"
                          id="slack"
                          v-model="slack"
                          class="h-4 w-4 rounded bg-slate-700 ring-1 !ring-slate-600 border-slate-700 text-sky-500 --tw-offset !focus:ring-sky-500 !ring-offset-slate-800"
                        />
                        <label for="slack"> Slack </label>
                      </div>
                      <div class="mt-1 flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="discord"
                          id="discord"
                          v-model="discord"
                          class="h-4 w-4 rounded bg-slate-700 ring-1 !ring-slate-600 border-slate-700 text-sky-500 --tw-offset !focus:ring-sky-500 !ring-offset-slate-800"
                        />
                        <label for="discord"> Discord </label>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 sm:p-6">
                    <button @click="createService" class="button-accent">Add service</button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, toRefs } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const props = defineProps({
  showNewServiceSlideOver: {
    type: Boolean,
    required: true,
  },
});

const { showNewServiceSlideOver } = toRefs(props);
const emit = defineEmits(["toggle"]);

// types of notifs
const name = ref("");
const url = ref("");
const phone = ref(false);
const sms = ref(false);
const email = ref(false);
const slack = ref(false);
const discord = ref(false);

const createService = async () => {
  await authStore.createService({
    name: name.value,
    url: url.value,
    phone: phone.value,
    sms: sms.value,
    slack: slack.value,
    discord: discord.value,
  });

  close();
};

const close = () => {
  emit("toggle", false);
};
</script>
