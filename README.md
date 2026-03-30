# Slai — Frontend (Vue)

Frontend web de **Slai**, un acortador de URLs con IA. Aplicación [Vue 3](https://vuejs.org/) con TypeScript, enrutamiento y autenticación mediante [Clerk](https://clerk.com/).

## Stack

| Tecnología | Uso |
|------------|-----|
| Vue 3 | Interfaz y composición |
| TypeScript | Tipado estático |
| Vite | Build y servidor de desarrollo |
| Vue Router | Rutas y títulos de página |
| Tailwind CSS | Estilos |
| Clerk (`@clerk/vue`) | Inicio de sesión, registro y sesión de usuario |

## Requisitos

- **Node.js** 18+ (recomendado LTS)
- Cuenta en [Clerk](https://dashboard.clerk.com/) y una **Publishable Key** para el frontend

## Configuración

1. Clona el repositorio e instala dependencias:

   ```bash
   npm install
   ```

2. Crea un archivo `.env` en la raíz del proyecto (puedes partir de `.env.example`):

   ```bash
   cp .env.example .env
   ```

3. Rellena las variables:

   | Variable | Descripción |
   |----------|-------------|
   | `VITE_CLERK_PUBLISHABLE_KEY` | **Obligatoria.** Clave pública de Clerk (Dashboard → API Keys). |
   | `VITE_BACKEND_URL` | Opcional. URL base del backend si la integras más adelante. |

Sin `VITE_CLERK_PUBLISHABLE_KEY`, la aplicación no arranca (se valida en `main.ts`).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (por defecto [http://localhost:5173](http://localhost:5173)) |
| `npm run build` | Compilación para producción (`dist/`) |
| `npm run preview` | Vista previa del build de producción |
| `npm run type-check` | Comprobación de tipos con `vue-tsc` |

## Rutas principales

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/iniciar-sesion` | Inicio de sesión (Clerk) |
| `/registro` | Registro (Clerk) |
| `/panel` | Panel de usuario (requiere autenticación; redirección tras login/registro) |
| `/terminos` | Términos y condiciones |
| `/privacidad` | Política de privacidad |

Tras iniciar sesión o registrarse, Clerk redirige a `/panel` según la configuración en `main.ts`.

## Estructura del código (resumen)

```
src/
  assets/       # Estilos globales (Tailwind, etc.)
  components/   # Cabecera, pie, etc.
  pages/        # Vistas por ruta
  router/       # Definición de rutas
  App.vue
  main.ts
```

## Licencia

Indica aquí la licencia del proyecto si aplica (por ejemplo MIT, propietaria, etc.).
