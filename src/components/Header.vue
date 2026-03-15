<script setup lang="ts">
import logo from "../assets/logo.png"
</script>

<template>
  <header class="border-b bg-white/70 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
      <div class="flex items-center gap-2">
        <router-link to="/">
          <img :src="logo" alt="Slai - Acortador de URLs con IA" width="64" height="64" class="xl:h-16 xl:w-16 md:h-12 md:w-12 sm:h-8 sm:w-8 w-8 h-8" loading="eager">
        </router-link>
      </div>
    </div>
  </header>
</template>
