import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Terms from '../pages/Terms.vue'
import Privacy from '../pages/Privacy.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: 'Slai - Acortador de URLs con IA'
      }
    },
    {
      path: '/terminos',
      name: 'Terms',
      component: Terms,
      meta: {
        title: 'Términos y Condiciones - Slai'
      }
    },
    {
      path: '/privacidad',
      name: 'Privacy',
      component: Privacy,
      meta: {
        title: 'Política de Privacidad - Slai'
      }
    }
  ]
})

// Actualizar título de la página según la ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string || 'Slai'
  next()
})

export default router
