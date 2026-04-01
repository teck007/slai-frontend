import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { clerkPlugin } from "@clerk/vue"
import "./assets/main.css"

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error("Añade VITE_CLERK_PUBLISHABLE_KEY a tu archivo .env")
}

const app = createApp(App)
app.use(clerkPlugin, {
  publishableKey,
  signInForceRedirectUrl: "/panel",
  signUpForceRedirectUrl: "/panel",
})
app.use(router)
app.mount("#app")
