<script setup lang="ts">
import Header from "./components/Header.vue"
import Footer from "./components/Footer.vue"
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-100">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
