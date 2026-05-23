<script setup lang="ts">
import { computed } from "vue"
import { SignIn } from "@clerk/vue"
import { useDarkMode } from "../composables/useDarkMode"

const { isDark } = useDarkMode()

const clerkAppearance = computed(() => ({
  elements: {
    rootBox: 'mx-auto',
    card: `shadow-lg border ${isDark.value ? 'border-gray-700' : 'border-gray-200'}`,
    formFieldLabel: isDark.value ? 'text-gray-200' : 'text-gray-700',
    footerActionText: isDark.value ? 'text-gray-300' : 'text-gray-500',
    footerActionLink: 'text-primary hover:text-indigo-600',
    dividerText: 'text-gray-400',
    headerTitle: isDark.value ? 'text-gray-50' : 'text-gray-900',
    formHeaderTitle: isDark.value ? 'text-gray-50' : 'text-gray-900',
    identityPreviewText: isDark.value ? 'text-gray-200' : 'text-gray-700',
    formButtonPrimary: 'bg-primary text-white hover:bg-indigo-600 shadow-sm rounded-xl text-sm font-medium',
    socialButtonsBlockButton: isDark.value
      ? 'border-gray-600 bg-gray-800 hover:bg-gray-700'
      : 'border-gray-300 bg-white hover:bg-gray-50',
    socialButtonsBlockButtonText: isDark.value ? 'text-gray-200' : 'text-gray-700',
    formButtonSecondary: isDark.value
      ? 'border-gray-600 text-gray-200 hover:bg-gray-800'
      : 'border-gray-300 text-gray-700 hover:bg-gray-50',
    alertText: isDark.value ? 'text-red-400' : 'text-red-600',
    formFieldInput: isDark.value
      ? 'border-gray-600 bg-gray-800 text-gray-100'
      : 'border-gray-300 bg-white text-gray-900',
  },
  variables: {
    colorPrimary: '#4f46e5',
    colorPrimaryForeground: '#ffffff',
    borderRadius: '0.75rem',
    ...(isDark.value
      ? {
          colorBackground: '#111827',
          colorForeground: '#f3f4f6',
          colorInputForeground: '#f3f4f6',
          colorInput: '#1f2937',
          colorMutedForeground: '#d1d5db',
          colorBorder: '#374151',
          colorNeutral: '#374151',
        }
      : {}),
  },
}))
</script>

<template>
  <main class="flex min-h-[calc(100vh-8rem)] flex-1 items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50">Iniciar sesión</h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Ingresa con tu correo y contraseña para acceder al panel
        </p>
      </div>
      <SignIn
        forceRedirectUrl="/panel"
        signUpUrl="/registro"
        :appearance="clerkAppearance"
      />
    </div>
  </main>
</template>
