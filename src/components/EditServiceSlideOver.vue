<template>
  <TransitionRoot as="template" :show="showEditServiceSlideOver">
    <Dialog as="div" class="relative z-10" @close="close">
      <div class="fixed inset-0 bg-slate-900 opacity-60" />

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
                      <DialogTitle class="text-base font-semibold leading-6 text-slate-300">Edit {{ service.url }}</DialogTitle>
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

                    <div>
                      <label for="url" class="block text-sm font-medium leading-6 text-slate-400">Delete Service</label>
                      <div class="mt-1">
                        <button v-if="!confirmDelete" @click="confirmDelete = true" class="button-danger">Delete service</button>
                        <button v-else @click="deleteService" class="button-danger">Confirm deletion</button>
                      </div>
                    </div>
                  </div>

                  <div class="p-4 sm:p-6">
                    <button @click="updateService" class="button-accent">Save</button>
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
import { computed, ref, toRefs, watch } from "vue";
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const props = defineProps({
  service: {
    type: Object,
    required: true,
  },
  showEditServiceSlideOver: {
    type: Boolean,
    required: true,
  },
});

const { service, showEditServiceSlideOver } = toRefs(props);

const oldService = computed(() => service.value || {});

const open = ref(true);
const emit = defineEmits(["toggle"]);
const confirmDelete = ref(false);

watch(
  () => showEditServiceSlideOver.value,
  (value) => {
    if (value) {
      // update the values
      name.value = oldService.value?.name;
      url.value = oldService.value?.url;
      phone.value = oldService.value?.phone;
      sms.value = oldService.value?.sms;
      slack.value = oldService.value?.slack;
      discord.value = oldService.value?.discord;
    }
  }
);

// we want the values to be reactive but update when the the user changes them via imput

const name = ref(oldService.value?.name);
const url = ref(oldService.value?.url);
const phone = ref(oldService.value?.phone);
const sms = ref(oldService.value?.sms);
const email = ref(oldService.value?.email);
const slack = ref(oldService.value?.slack);
const discord = ref(oldService.value?.discord);

const close = () => {
  open.value = false;
  emit("toggle", false);
};

const updateService = async () => {
  console.log("updateService", {
    serviceId: service.value._id,
    name: name.value,
    url: url.value,
    phone: phone.value,
    sms: sms.value,
    email: email.value,
    slack: slack.value,
    discord: discord.value,
  });

  await authStore.updateService({
    serviceId: service.value._id,
    name: name.value,
    url: url.value,
    phone: phone.value,
    sms: sms.value,
    email: email.value,
    slack: slack.value,
    discord: discord.value,
  });

  close();
};

const deleteService = async () => {
  await authStore.deleteService({
    serviceId: service.value._id,
  });

  close();
};
</script>
