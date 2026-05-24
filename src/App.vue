<script setup lang="ts">
import { onMounted } from "vue"
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
import { useDarkMode } from "./composables/useDarkMode"

const { init } = useDarkMode()
onMounted(() => init())
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
