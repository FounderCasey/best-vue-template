<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=sky&shade=500" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" method="POST" @submit.prevent="signIn">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required v-model="email" class="input-main" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-sky-400 hover:text-sky-300">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" v-model="password" autocomplete="current-password" class="input-main" />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center items-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
          >
            <LoadingSpinner v-if="loading" />
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-slate-400">
        Not a member?
        {{ " " }}
        <a href="#" class="font-semibold leading-6 text-sky-400 hover:text-sky-300">Start a 14 day free trial</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const authStore = useAuthStore();

let email = ref("");
let password = ref("");
let errorMessage = ref("");
let loading = ref(false);

const signIn = async () => {
  loading.value = true;
  errorMessage.value = "";
  await authStore
    .signIn({
      email: email.value,
      password: password.value,
    })
    .then((res, err) => {
      if (res?.status == 401) {
        errorMessage.value = "Invalid email or password";
      }
    });

  loading.value = false;
};
</script>
