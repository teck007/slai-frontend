<script setup lang="ts">
import { Show, UserButton } from "@clerk/vue"
import logo from "../assets/logo.png"
import { useDarkMode } from "../composables/useDarkMode"

const { isDark, toggle } = useDarkMode()
</script>

<template>
  <header class="border-b bg-white/70 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
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
            class="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
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
            class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Mi cuenta
          </router-link>
          <UserButton afterSignOutUrl="/" />
        </Show>
        <button
          type="button"
          @click="toggle"
          class="ml-1 rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
          :aria-label="isDark ? 'Activar modo claro' : 'Activar modo oscuro'"
          :title="isDark ? 'Modo claro' : 'Modo oscuro'"
        >
          <!-- Sun icon (shown in dark mode) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
          </svg>
          <!-- Moon icon (shown in light mode) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-5 w-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        </button>
      </nav>
    </div>
  </header>
</template>
