import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Terms from '../pages/Terms.vue'
import Privacy from '../pages/Privacy.vue'
import SignIn from '../pages/SignIn.vue'
import SignUp from '../pages/SignUp.vue'
import UserPanel from '../pages/UserPanel.vue'

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
      path: '/iniciar-sesion',
      name: 'SignIn',
      component: SignIn,
      meta: {
        title: 'Iniciar sesión - Slai',
        requiresAuth: false
      }
    },
    {
      path: '/registro',
      name: 'SignUp',
      component: SignUp,
      meta: {
        title: 'Crear cuenta - Slai',
        requiresAuth: false
      }
    },
    {
      path: '/panel',
      name: 'UserPanel',
      component: UserPanel,
      meta: {
        title: 'Panel de usuario - Slai',
        requiresAuth: true
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
