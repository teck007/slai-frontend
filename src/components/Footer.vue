<template>
  <footer class="border-t bg-gray-100 dark:border-gray-800 dark:bg-gray-950">
    <div class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:px-6">
      <div class="flex flex-1 flex-col gap-2">
        <div class="flex items-center gap-2">
         <span class="text-lg font-bold dark:text-white">Slai</span>
        </div>
        <p class="max-w-sm text-xs text-gray-600 dark:text-gray-400">
          Simplifica tus enlaces largos en URLs cortas y fáciles de compartir en segundos.
        </p>
      </div>
      <div class="grid flex-[2] grid-cols-2 gap-8 text-xs text-gray-600 sm:grid-cols-3 dark:text-gray-400">
        <div class="space-y-2">
          <h3 class="font-semibold text-gray-800 dark:text-gray-50">Producto</h3>
          <ul class="space-y-1">
            <li><a href="#" class="hover:underline">Características</a></li>
          </ul>
        </div>
        <div class="space-y-2">
          <h3 class="font-semibold text-gray-800 dark:text-gray-50">Compañía</h3>
          <ul class="space-y-1">
            <li><a href="https://devstudio.cl" target="_blank" rel="noopener noreferrer" class="hover:underline">Acerca de</a></li>
          </ul>
        </div>
        <div class="space-y-2">
          <h3 class="font-semibold text-gray-800 dark:text-gray-50">Legal</h3>
          <ul class="space-y-1">
            <li><router-link to="/terminos" class="hover:underline">Términos</router-link></li>
            <li><router-link to="/privacidad" class="hover:underline">Privacidad</router-link></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="border-t dark:border-gray-800">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-gray-500 md:flex-row md:px-6 dark:text-gray-400">
        <p>© 2026 Slai. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>
