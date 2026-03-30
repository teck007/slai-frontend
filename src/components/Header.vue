<script setup lang="ts">
import { Show, UserButton } from "@clerk/vue"
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

      <nav class="flex items-center gap-2">
        <Show when="signed-out">
          <router-link
            to="/iniciar-sesion"
            class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Iniciar sesión
          </router-link>
          <router-link
            to="/registro"
            class="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            Registrarse
          </router-link>
        </Show>
        <Show when="signed-in">
          <router-link
            to="/panel"
            class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Panel
          </router-link>
          <UserButton afterSignOutUrl="/" />
        </Show>
      </nav>
    </div>
  </header>
</template>
