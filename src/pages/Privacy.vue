<script setup lang="ts">
// El título se actualiza automáticamente desde el router
</script>

<template>
  <main class="flex-1">
    <div class="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-16">
      <div class="mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl mb-4 dark:text-gray-50">Política de Privacidad</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">Última actualización: {{ new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
      </div>

      <div class="prose prose-sm max-w-none space-y-6 text-gray-700 dark:text-gray-300">
        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">1. Introducción</h2>
          <p>
            En Slai, nos comprometemos a proteger su privacidad. Esta Política de Privacidad explica cómo 
            recopilamos, utilizamos, divulgamos y protegemos su información cuando utiliza nuestro servicio 
            de acortamiento de URLs.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">2. Información que Recopilamos</h2>
          <p>Recopilamos los siguientes tipos de información:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Información de uso:</strong> Las URLs que acorta y las URLs acortadas generadas</li>
            <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, sistema operativo, y datos de uso del servicio</li>
            <li><strong>Información de dispositivo:</strong> Información sobre su dispositivo cuando accede al servicio</li>
            <li><strong>Cookies y tecnologías similares:</strong> Utilizamos cookies para mejorar su experiencia y analizar el uso del servicio</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">3. Cómo Utilizamos su Información</h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Proporcionar, mantener y mejorar nuestro servicio de acortamiento de URLs</li>
            <li>Procesar sus solicitudes de acortamiento de URLs</li>
            <li>Analizar el uso del servicio y realizar mejoras</li>
            <li>Detectar y prevenir fraudes, abusos y actividades ilegales</li>
            <li>Cumplir con obligaciones legales y proteger nuestros derechos</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">4. Compartir Información</h2>
          <p>
            No vendemos su información personal. Podemos compartir su información en las siguientes circunstancias:
          </p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li><strong>Proveedores de servicios:</strong> Con terceros que nos ayudan a operar nuestro servicio</li>
            <li><strong>Cumplimiento legal:</strong> Cuando sea requerido por ley o para proteger nuestros derechos</li>
            <li><strong>Transferencias comerciales:</strong> En caso de fusión, adquisición o venta de activos</li>
            <li><strong>Con su consentimiento:</strong> En cualquier otra situación con su consentimiento explícito</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">5. Seguridad de la Información</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger su información 
            contra acceso no autorizado, alteración, divulgación o destrucción. Sin embargo, ningún método de 
            transmisión por Internet o almacenamiento electrónico es 100% seguro.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">6. Retención de Datos</h2>
          <p>
            Conservamos su información durante el tiempo necesario para cumplir con los propósitos descritos 
            en esta política, a menos que la ley requiera o permita un período de retención más largo.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">7. Sus Derechos</h2>
          <p>Usted tiene derecho a:</p>
          <ul class="list-disc pl-6 space-y-2 mt-2">
            <li>Acceder a su información personal</li>
            <li>Rectificar información inexacta o incompleta</li>
            <li>Solicitar la eliminación de su información</li>
            <li>Oponerse al procesamiento de su información</li>
            <li>Solicitar la limitación del procesamiento</li>
            <li>Retirar su consentimiento en cualquier momento</li>
          </ul>
          <p class="mt-2">
            Para ejercer estos derechos, puede contactarnos a través de los medios indicados en la sección de contacto.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">8. Cookies</h2>
          <p>
            Utilizamos cookies y tecnologías similares para mejorar su experiencia, analizar el uso del servicio 
            y personalizar el contenido. Puede configurar su navegador para rechazar cookies, pero esto puede 
            afectar la funcionalidad del servicio.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">9. Enlaces a Terceros</h2>
          <p>
            Nuestro servicio puede contener enlaces a sitios web de terceros. No somos responsables de las 
            prácticas de privacidad de estos sitios. Le recomendamos revisar las políticas de privacidad 
            de cualquier sitio que visite.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">10. Privacidad de Menores</h2>
          <p>
            Nuestro servicio no está dirigido a menores de 18 años. No recopilamos intencionalmente información 
            personal de menores. Si descubrimos que hemos recopilado información de un menor, tomaremos medidas 
            para eliminarla.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">11. Cambios a esta Política</h2>
          <p>
            Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos cualquier cambio 
            publicando la nueva política en esta página y actualizando la fecha de "Última actualización". 
            Le recomendamos revisar esta política periódicamente.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3 dark:text-gray-50">12. Contacto</h2>
          <p>
            Si tiene preguntas o inquietudes sobre esta Política de Privacidad o sobre cómo manejamos su 
            información, puede contactarnos visitando <a href="https://devstudio.cl" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">devstudio.cl</a>.
          </p>
        </section>
      </div>
    </div>
  </main>
</template>
