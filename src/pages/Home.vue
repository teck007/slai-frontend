<script setup lang="ts">
import { ref, onMounted } from "vue"

const inputUrl = ref("")
const result = ref("")
const loading = ref(false)
const status = ref("")
const backend = import.meta.env.VITE_BACKEND_URL

// Structured Data for SEO
onMounted(() => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Slai",
    "description": "Acorta tus URLs largas en enlaces cortos y fáciles de compartir con IA. Simplifica tus enlaces en segundos.",
    "url": "https://slai.dev/",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "100"
    },
    "featureList": [
      "Acortar URLs largas",
      "Enlaces cortos y fáciles de compartir",
      "Tecnología con IA",
      "Gratis y rápido"
    ]
  }

  const script = document.createElement("script")
  script.type = "application/ld+json"
  script.text = JSON.stringify(structuredData)
  document.head.appendChild(script)
})

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
  } catch (err) {
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
                <label for="url-input" class="sr-only">URL para acortar</label>
                <input id="url-input" v-model="inputUrl" type="url" required placeholder="Pega tu enlace largo aquí"
                  aria-label="Ingresa la URL que deseas acortar"
                  class="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 pl-3 text-sm outline-none ring-primary/30 focus:border-primary focus:ring-2" />
              </div>
              <button type="submit" :disabled="loading" aria-label="Acortar URL"
                class="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70">
                <span v-if="!loading">Acortar</span>
                <span v-else aria-live="polite">Acortando...</span>
              </button>
            </form>

            <div v-if="result" class="mt-4 space-y-2 text-sm">
              <div class="text-gray-600">
                Resultado:
              </div>
              <div v-if="status !== 'error'" class="flex items-center gap-2 rounded-xl bg-gray-50 px-3 py-2">
                <a :href="result" target="_blank" rel="noopener noreferrer"
                  class="flex-1 break-all font-semibold text-primary hover:underline">
                  {{ result }}
                </a>
                <button type="button" @click="copyResult" aria-label="Copiar URL acortada"
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
            Acorta y comparte tus enlaces
          </h2>
          <p class="text-sm text-gray-600 md:text-base">
            Slai te permite acortar URLs largas en enlaces cortos y fáciles de recordar utilizando IA.
          </p>
        </div>

        <div class="grid sm:grid-cols-2">
          <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
              </svg>
            </div>
            <h3 class="font-semibold">Acorta URLs</h3>
            <p class="mt-1 text-sm text-gray-600">
              Convierte URLs largas en enlaces cortos, fáciles de recordar y compartir.
            </p>
          </div>
          <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-primary">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.935-2.186 2.25 2.25 0 00-3.935 2.186z" />
              </svg>
            </div>
            <h3 class="font-semibold">Copia y comparte</h3>
            <p class="mt-1 text-sm text-gray-600">
              Copia tus enlaces cortos con un clic y compártelos fácilmente.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
