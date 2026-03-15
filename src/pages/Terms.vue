<script setup lang="ts">
// El título se actualiza automáticamente desde el router
</script>

<template>
  <main class="flex-1">
    <div class="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight md:text-4xl mb-4">Términos y Condiciones</h1>
        <p class="text-sm text-gray-500">Última actualización: {{ new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
      </div>

      <div class="prose prose-sm max-w-none space-y-6 text-gray-700">
        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar el servicio de acortamiento de URLs de Slai (en adelante, "el Servicio"), 
            usted acepta cumplir con estos Términos y Condiciones. Si no está de acuerdo con alguna parte 
            de estos términos, no debe utilizar el Servicio.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">2. Descripción del Servicio</h2>
          <p>
            Slai es un servicio de acortamiento de URLs que permite a los usuarios convertir enlaces largos 
            en URLs más cortas y fáciles de compartir. El Servicio utiliza tecnología de inteligencia artificial 
            para optimizar el proceso de acortamiento.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">3. Uso Aceptable</h2>
          <p>Usted se compromete a utilizar el Servicio únicamente para fines legales y de manera que no:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Viole ninguna ley, regulación o derecho de terceros</li>
            <li>Infrinja derechos de propiedad intelectual</li>
            <li>Distribuya contenido malicioso, spam o phishing</li>
            <li>Interfiera con el funcionamiento del Servicio</li>
            <li>Intente acceder no autorizado a sistemas o datos</li>
            <li>Utilice el Servicio para actividades fraudulentas o engañosas</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">4. Contenido del Usuario</h2>
          <p>
            Usted es responsable de todas las URLs que acorta utilizando el Servicio. Slai no se hace responsable 
            del contenido al que redirigen las URLs acortadas. Nos reservamos el derecho de eliminar o bloquear 
            cualquier enlace que viole estos términos o que consideremos inapropiado.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">5. Disponibilidad del Servicio</h2>
          <p>
            Nos esforzamos por mantener el Servicio disponible de manera continua, pero no garantizamos que el 
            Servicio esté disponible en todo momento. Podemos realizar mantenimiento, actualizaciones o interrupciones 
            del servicio sin previo aviso.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">6. Limitación de Responsabilidad</h2>
          <p>
            Slai se proporciona "tal cual" sin garantías de ningún tipo. No seremos responsables de ningún daño 
            directo, indirecto, incidental, especial o consecuente que resulte del uso o la imposibilidad de usar 
            el Servicio.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">7. Propiedad Intelectual</h2>
          <p>
            Todos los derechos de propiedad intelectual relacionados con el Servicio, incluyendo pero no limitado 
            a software, diseño, logotipos y marcas, son propiedad de Slai o sus licenciantes.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">8. Modificaciones de los Términos</h2>
          <p>
            Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las 
            modificaciones entrarán en vigor inmediatamente después de su publicación. El uso continuado del 
            Servicio después de cualquier modificación constituye su aceptación de los nuevos términos.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">9. Terminación</h2>
          <p>
            Podemos suspender o terminar su acceso al Servicio en cualquier momento, con o sin causa, con o sin 
            previo aviso, por cualquier motivo, incluyendo pero no limitado a la violación de estos términos.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">10. Ley Aplicable</h2>
          <p>
            Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes aplicables, sin 
            tener en cuenta sus disposiciones sobre conflictos de leyes.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">11. Contacto</h2>
          <p>
            Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos a través de nuestro sitio web 
            o visitando <a href="https://devstudio.cl" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">devstudio.cl</a>.
          </p>
        </section>
      </div>
    </div>
  </main>
</template>
