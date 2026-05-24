import { ref } from "vue"

const isDark = ref(false)

export function useDarkMode() {
  function init() {
    const stored = localStorage.getItem("dark-mode")
    if (stored !== null) {
      isDark.value = stored === "true"
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches
    }
    document.documentElement.classList.toggle("dark", isDark.value)
  }

  function toggle() {
    isDark.value = !isDark.value
    localStorage.setItem("dark-mode", String(isDark.value))
    document.documentElement.classList.toggle("dark", isDark.value)
  }

  return { isDark, toggle, init }
}
