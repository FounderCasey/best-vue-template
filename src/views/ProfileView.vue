<template>
  <div class="min-h-full">
    <Navbar />
    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-slate-300">Hey, {{ user.firstName }}!</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <!-- Your content -->
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>
