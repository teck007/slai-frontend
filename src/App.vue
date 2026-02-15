<script setup lang="ts">
import { ref } from "vue"
import logo from "./assets/logo.png"

const inputUrl = ref("")
const result = ref("")
const loading = ref(false)
const status = ref("")
const backend = import.meta.env.VITE_BACKEND_URL

async function handleShorten(event: Event) {
  event.preventDefault()
  result.value = ""
  status.value = ""
  if (!inputUrl.value || loading.value) return

  loading.value = true
  try {
    const res = await fetch(`${backend}/api/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_API_TOKEN}`
      },
      body: JSON.stringify({ url: inputUrl.value }),
    })
    const data = await res.json()
    if (data.status === "error") {
      result.value = data.result
      status.value = data.status
      return
    }
    result.value = `${backend}/${data.result}`
    status.value = data.status || "success"
  }   catch (err) {
    result.value = "Error al acortar la URL"
    status.value = "error"
  } finally {
    loading.value = false
  }
}

function copyResult() {
  if (!result.value) return
  navigator.clipboard?.writeText(result.value).catch(() => { })
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-100">
    <header class="border-b bg-white/70 backdrop-blur">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <div class="flex items-center gap-2">
          <img :src="logo" alt="Slai" class="xl:h-16 xl:w-16 md:h-12 md:w-12 sm:h-8 sm:w-8 w-8 h-8">
        </div>
        <!-- <nav class="hidden gap-6 text-sm font-medium text-gray-600 md:flex">
          <a href="#" class="hover:text-gray-900">Inicio</a>
          <a href="#" class="hover:text-gray-900">Características</a>
          <a href="#" class="hover:text-gray-900">Precios</a>
          <a href="#" class="hover:text-gray-900">Contacto</a>
        </nav> -->
        <!-- <div class="flex items-center gap-3">
          <button type="button"
            class="hidden rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 md:inline-flex">
            Iniciar sesión
          </button>
          <button type="button"
            class="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white shadow hover:bg-indigo-700">
            Registrarse
          </button>
        </div> -->
      </div>
    </header>

    <main class="flex-1">
      <!-- Hero -->
      <section class="w-full py-12 md:py-20 lg:py-24">
        <div class="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center md:px-6">
          <div class="space-y-3">
            <h1 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Acorta tus URLs con
              <span class="text-primary">IA</span>
            </h1>
            <p class="mx-auto max-w-2xl text-gray-500 md:text-lg">
              Simplifica tus enlaces largos en URLs cortas y fáciles de compartir en segundos.
            </p>
          </div>

          <div class="w-full max-w-xl space-y-3">
            <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <form class="flex flex-col gap-3 sm:flex-row" @submit="handleShorten">
                <div class="relative flex-1">
                  <input v-model="inputUrl" type="url" required placeholder="Pega tu enlace largo aquí"
                    class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pl-3 text-sm outline-none ring-primary/30 focus:border-primary focus:ring-2" />
                </div>
                <button type="submit" :disabled="loading"
                  class="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70">
                  <span v-if="!loading">Acortar</span>
                  <span v-else>Acortando...</span>
                </button>
              </form>

              <div v-if="result" class="mt-4 space-y-2 text-sm">
                <div class="text-gray-600">
                  Resultado:
                </div>
                <div v-if="status !== 'error'" class="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
                  <a :href="result" target="_blank" rel="norefer"
                    class="flex-1 break-all font-semibold text-primary hover:underline">
                    {{ result }}
                  </a>
                  <button type="button" @click="copyResult"
                    class="rounded-lg border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-100">
                    Copiar
                  </button>
                </div>
                <div v-if="status === 'error'" class="text-red-500 font-bold">
                  {{ result }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Cómo funciona -->
      <section class="w-full">
        <div class="mx-auto grid max-w-5xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <div class="space-y-4">
            <span class="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              Cómo funciona
            </span>
            <h2 class="text-2xl font-bold tracking-tight md:text-3xl">
              Acorta, comparte y analiza tus enlaces
            </h2>
            <p class="text-sm text-gray-600 md:text-base">
              Slai te permite acortar URLs largas en enlaces cortos y fáciles de recordar utilizando IA.
            </p>
            <!-- <div class="flex flex-col gap-2 sm:flex-row">
              <button type="button"
                class="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                Empezar ahora
              </button>
              <button type="button"
                class="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
                Saber más
              </button>
            </div> -->
          </div>

          <div class="grid  sm:grid-cols-2">
            <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 class="font-semibold">Acorta URLs</h3>
              <p class="mt-1 text-sm text-gray-600">
                Convierte URLs largas en enlaces cortos, fáciles de recordar y compartir.
              </p>
            </div>
            <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 class="font-semibold">Copia y comparte</h3>
              <p class="mt-1 text-sm text-gray-600">
                Copia tus enlaces cortos con un clic y compártelos fácilmente.
              </p>
            </div>
            <!-- <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 class="font-semibold">Enlaces personalizados</h3>
              <p class="mt-1 text-sm text-gray-600">
                Crea URLs cortas personalizadas con tu propio texto.
              </p>
            </div> -->
            <!-- <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 class="font-semibold">Estadísticas</h3>
              <p class="mt-1 text-sm text-gray-600">
                Analiza quién, cuándo y dónde hacen clic en tus enlaces.
              </p>
            </div> -->
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t bg-gray-100">
      <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:px-6">
        <div class="flex flex-1 flex-col gap-2">
          <div class="flex items-center gap-2">
           <span class="text-lg font-bold">Slai</span>
          </div>
          <p class="max-w-sm text-xs text-gray-600">
            Simplifica tus enlaces largos en URLs cortas y fáciles de compartir en segundos.
          </p>
        </div>
        <div class="grid flex-[2] grid-cols-2 gap-8 text-xs text-gray-600 sm:grid-cols-3">
          <div class="space-y-2">
            <h3 class="font-semibold text-gray-800">Producto</h3>
            <ul class="space-y-1">
              <li><a href="#" class="hover:underline">Características</a></li>
            </ul>
          </div>
          <div class="space-y-2">
            <h3 class="font-semibold text-gray-800">Compañía</h3>
            <ul class="space-y-1">
              <li><a href="https://devstudio.cl" target="_blank" class="hover:underline">Acerca de</a></li>
            </ul>
          </div>
          <div class="space-y-2">
            <h3 class="font-semibold text-gray-800">Legal</h3>
            <ul class="space-y-1">
              <li><a href="#" class="hover:underline">Términos</a></li>
              <li><a href="#" class="hover:underline">Privacidad</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="border-t">
        <div
          class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-gray-500 md:flex-row md:px-6">
          <p>© 2026 Slai. Todos los derechos reservados.</p>
          <!-- <div class="flex gap-4">
            <a href="#" class="hover:text-gray-700">Facebook</a>
            <a href="#" class="hover:text-gray-700">Instagram</a>
            <a href="#" class="hover:text-gray-700">Twitter</a>
          </div> -->
        </div>
      </div>
    </footer>
  </div>
</template>
