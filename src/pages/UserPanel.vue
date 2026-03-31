<script setup lang="ts">
import { useAuth, useUser } from "@clerk/vue"
import { computed, onMounted, onUnmounted, ref, watch } from "vue"
import { useRouter } from "vue-router"

type UserLink = { short_url: string; orig_url: string }

const { isLoaded, isSignedIn, getToken } = useAuth()
const { user } = useUser()
const router = useRouter()
const backend = import.meta.env.VITE_BACKEND_URL

const userEmail = computed(() => user.value?.primaryEmailAddress?.emailAddress ?? "")

const links = ref<UserLink[]>([])
const linksLoading = ref(false)
const linksError = ref("")
const selectedShortUrls = ref<string[]>([])
const deleteSaving = ref(false)
const deleteError = ref("")
const deleteModalOpen = ref(false)

const selectedLinksDetail = computed(() =>
  links.value.filter((l) => selectedShortUrls.value.includes(l.short_url))
)

const previewLimit = 5
const selectedPreview = computed(() => selectedLinksDetail.value.slice(0, previewLimit))
const selectedPreviewRest = computed(() =>
  Math.max(0, selectedLinksDetail.value.length - previewLimit)
)

function isSelected(short: string) {
  return selectedShortUrls.value.includes(short)
}

function toggleSelect(short: string) {
  const idx = selectedShortUrls.value.indexOf(short)
  if (idx >= 0) {
    selectedShortUrls.value = selectedShortUrls.value.filter((_, i) => i !== idx)
  } else {
    selectedShortUrls.value = [...selectedShortUrls.value, short]
  }
}

function toggleSelectAll() {
  if (selectedShortUrls.value.length === links.value.length) {
    selectedShortUrls.value = []
  } else {
    selectedShortUrls.value = links.value.map((l) => l.short_url)
  }
}

const allSelected = computed(
  () => links.value.length > 0 && selectedShortUrls.value.length === links.value.length
)

function openDeleteModal() {
  if (selectedShortUrls.value.length === 0) return
  deleteError.value = ""
  deleteModalOpen.value = true
}

function closeDeleteModal() {
  if (!deleteSaving.value) deleteModalOpen.value = false
}

async function executeDeleteConfirmed() {
  if (!isSignedIn.value || selectedShortUrls.value.length === 0) return

  deleteError.value = ""
  deleteSaving.value = true
  try {
    const token = await getToken.value?.()
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (token) headers.Authorization = `Bearer ${token}`

    const res = await fetch(`${backend}/api/user/delete`, {
      method: "POST",
      headers,
      body: JSON.stringify({ short_urls: selectedShortUrls.value }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      deleteError.value =
        typeof data.error === "string" ? data.error : "No se pudieron eliminar los enlaces"
      return
    }
    deleteModalOpen.value = false
    selectedShortUrls.value = []
    await fetchUserLinks()
  } catch {
    deleteError.value = "Error de conexión al eliminar"
  } finally {
    deleteSaving.value = false
  }
}

function onDeleteModalKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && deleteModalOpen.value && !deleteSaving.value) {
    e.preventDefault()
    closeDeleteModal()
  }
}

onMounted(() => window.addEventListener("keydown", onDeleteModalKeydown))
onUnmounted(() => {
  window.removeEventListener("keydown", onDeleteModalKeydown)
  document.body.style.overflow = ""
})

function fullShortUrl(short: string) {
  return `${backend}/${short}`
}

async function fetchUserLinks() {
  if (!isLoaded.value || !isSignedIn.value) return
  linksError.value = ""
  linksLoading.value = true
  try {
    const token = await getToken.value?.()
    const headers: Record<string, string> = {}
    if (token) headers.Authorization = `Bearer ${token}`

    const res = await fetch(`${backend}/api/user`, { headers })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      linksError.value = typeof data.error === "string" ? data.error : "No se pudieron cargar tus enlaces"
      links.value = []
      return
    }
    links.value = Array.isArray(data.links) ? data.links : []
  } catch {
    linksError.value = "Error de conexión al cargar tus enlaces"
    links.value = []
  } finally {
    linksLoading.value = false
  }
}

watch(
  [isLoaded, isSignedIn],
  ([loaded, signedIn]) => {
    if (loaded && !signedIn) {
      router.replace("/iniciar-sesion")
    }
    if (loaded && signedIn) {
      fetchUserLinks()
    }
  },
  { immediate: true }
)

watch(deleteModalOpen, (open) => {
  document.body.style.overflow = open ? "hidden" : ""
})
</script>

<template>
  <main class="flex-1">
    <!-- Loading -->
    <div
      v-if="!isLoaded"
      class="flex min-h-[50vh] items-center justify-center"
      aria-live="polite"
      aria-busy="true"
    >
      <div class="flex flex-col items-center gap-4">
        <div
          class="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"
          role="progressbar"
        />
        <p class="text-sm text-gray-500">Cargando panel...</p>
      </div>
    </div>

    <!-- Panel content (only when signed in) -->
    <section
      v-else-if="isSignedIn"
      class="mx-auto max-w-4xl px-4 py-12 md:px-6"
    >
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Bienvenido {{ user?.fullName }}
        </h1>
      </div>

      <div class="space-y-6">
        <!-- Quick actions -->
        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h2 class="text-lg font-semibold text-gray-900">Acciones rápidas</h2>
          <div class="mt-4 flex flex-wrap gap-3">
            <router-link
              to="/"
              class="inline-flex items-center rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-600"
            >
              Acortar URL
            </router-link>
          </div>
        </div>

        <!-- User links -->
        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h2 class="text-lg font-semibold text-gray-900">Tus enlaces acortados</h2>
          <p class="mt-1 text-sm text-gray-500">
            Selecciona enlaces y elimínalos de forma permanente cuando quieras.
          </p>

          <div
            v-if="linksLoading"
            class="mt-6 flex items-center gap-3 text-sm text-gray-500"
            aria-live="polite"
          >
            <div
              class="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-primary border-t-transparent"
            />
            Cargando enlaces…
          </div>

          <p
            v-else-if="linksError"
            class="mt-6 text-sm text-red-600"
            role="alert"
          >
            {{ linksError }}
          </p>

          <p
            v-else-if="links.length === 0"
            class="mt-6 text-sm text-gray-500"
          >
            Aún no tienes enlaces. Acorta una URL desde el inicio para verla aquí.
          </p>

          <div v-else class="mt-6 space-y-4">
            <div
              class="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50/80 to-white p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <label
                class="group inline-flex cursor-pointer items-center gap-3 text-sm font-medium text-gray-800"
              >
                <span
                  class="relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition group-hover:border-primary/60"
                  :class="
                    allSelected
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 bg-white'
                  "
                >
                  <svg
                    v-if="allSelected"
                    class="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="3"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <input
                  type="checkbox"
                  class="sr-only"
                  :checked="allSelected"
                  @change="toggleSelectAll"
                />
                <span>Seleccionar todos</span>
              </label>

              <div class="flex flex-wrap items-center gap-2 sm:justify-end">
                <span
                  v-if="selectedShortUrls.length > 0"
                  class="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-800 ring-1 ring-inset ring-indigo-100"
                >
                  <span class="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  {{ selectedShortUrls.length }} marcado{{
                    selectedShortUrls.length === 1 ? "" : "s"
                  }}
                </span>
                <button
                  type="button"
                  class="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
                  :class="
                    selectedShortUrls.length > 0
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-200 text-gray-500'
                  "
                  :disabled="
                    selectedShortUrls.length === 0 || deleteSaving || linksLoading
                  "
                  @click="openDeleteModal"
                >
                  <svg
                    class="h-4 w-4 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Eliminar seleccionados
                </button>
              </div>
            </div>

            <p
              v-if="deleteError"
              class="text-sm text-red-600"
              role="alert"
            >
              {{ deleteError }}
            </p>

            <ul class="flex flex-col gap-2" role="list">
              <li
                v-for="link in links"
                :key="link.short_url"
                class="group relative rounded-xl border transition"
                :class="
                  isSelected(link.short_url)
                    ? 'border-indigo-200 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-100'
                    : 'border-transparent bg-gray-50/50 hover:border-gray-200 hover:bg-white'
                "
              >
                <div class="flex gap-3 p-3 sm:p-4">
                  <label
                    class="flex shrink-0 cursor-pointer items-start pt-0.5"
                    :title="'Marcar para eliminar'"
                  >
                    <span
                      class="flex h-5 w-5 items-center justify-center rounded-md border-2 transition"
                      :class="
                        isSelected(link.short_url)
                          ? 'border-primary bg-primary'
                          : 'border-gray-300 bg-white group-hover:border-primary/50'
                      "
                    >
                      <svg
                        v-if="isSelected(link.short_url)"
                        class="h-3 w-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    <input
                      type="checkbox"
                      class="sr-only"
                      :checked="isSelected(link.short_url)"
                      @change="toggleSelect(link.short_url)"
                    />
                  </label>
                  <div class="min-w-0 flex flex-1 flex-col gap-1.5">
                    <a
                      :href="fullShortUrl(link.short_url)"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="break-all text-sm font-semibold text-primary transition hover:text-indigo-700 hover:underline"
                      @click.stop
                    >
                      {{ fullShortUrl(link.short_url) }}
                    </a>
                    <span class="break-all text-xs leading-relaxed text-gray-500">
                      {{ link.orig_url }}
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal confirmar eliminación -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="deleteModalOpen"
          class="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          role="presentation"
        >
          <div
            class="absolute inset-0 bg-gray-900/50 backdrop-blur-[2px]"
            aria-hidden="true"
            @click="closeDeleteModal"
          />
          <div
            class="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            aria-describedby="delete-dialog-desc"
          >
            <div
              class="flex items-start gap-4 border-b border-red-50 bg-gradient-to-br from-red-50 to-orange-50/80 px-6 py-5"
            >
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-red-100"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="1.5"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <div class="min-w-0 pt-0.5">
                <h3
                  id="delete-dialog-title"
                  class="text-lg font-semibold leading-tight text-gray-900"
                >
                  ¿Eliminar
                  {{
                    selectedShortUrls.length === 1
                      ? "este enlace"
                      : `estos ${selectedShortUrls.length} enlaces`
                  }}?
                </h3>
                <p
                  id="delete-dialog-desc"
                  class="mt-1.5 text-sm leading-relaxed text-gray-600"
                >
                  Dejarán de funcionar las URLs cortas. No podrás recuperarlas.
                </p>
              </div>
            </div>

            <div class="max-h-[40vh] overflow-y-auto px-6 py-4">
              <p class="text-xs font-medium uppercase tracking-wide text-gray-400">
                Vista previa
              </p>
              <ul class="mt-2 space-y-2">
                <li
                  v-for="item in selectedPreview"
                  :key="item.short_url"
                  class="rounded-lg bg-gray-50 px-3 py-2 text-sm"
                >
                  <span class="block truncate font-mono text-xs text-indigo-700">
                    /{{ item.short_url }}
                  </span>
                  <span class="mt-0.5 block truncate text-xs text-gray-500">
                    {{ item.orig_url }}
                  </span>
                </li>
              </ul>
              <p
                v-if="selectedPreviewRest > 0"
                class="mt-3 text-center text-xs text-gray-500"
              >
                y {{ selectedPreviewRest }} más…
              </p>
            </div>

            <div
              class="flex flex-col-reverse gap-2 border-t border-gray-100 bg-gray-50/80 px-6 py-4 sm:flex-row sm:justify-end sm:gap-3"
            >
              <button
                type="button"
                class="inline-flex justify-center rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
                :disabled="deleteSaving"
                @click="closeDeleteModal"
              >
                Cancelar
              </button>
              <button
                type="button"
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-60"
                :disabled="deleteSaving"
                @click="executeDeleteConfirmed"
              >
                <span
                  v-if="deleteSaving"
                  class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                />
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>
