<script setup lang="ts">
import { SignUp } from "@clerk/vue"
</script>

<template>
  <main class="flex min-h-[calc(100vh-8rem)] flex-1 items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="mb-6 text-center">
        <h1 class="text-2xl font-bold text-gray-900">Crear cuenta</h1>
        <p class="mt-2 text-sm text-gray-500">
          Regístrate con correo y contraseña para acceder al panel
        </p>
      </div>
      <SignUp
        forceRedirectUrl="/panel"
        signInUrl="/iniciar-sesion"
        :appearance="{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-lg border border-gray-200',
          },
          variables: {
            colorPrimary: '#6366f1',
            colorTextOnPrimaryBackground: '#ffffff',
            borderRadius: '0.75rem',
          },
        }"
      />
    </div>
  </main>
</template>
