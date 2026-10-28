import { ref, watch, onMounted } from 'vue'

const THEME_KEY = 'portfolio-theme'
const isDark = ref(true)

export function useTheme() {
  const initTheme = () => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY)
      if (savedTheme) {
        isDark.value = savedTheme === 'dark'
      } else {
        // PRD mandates default to dark mode
        isDark.value = true
      }
    } catch {
      isDark.value = true
    }
    applyTheme()
  }

  const applyTheme = () => {
    if (typeof document !== 'undefined') {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    try {
      localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light')
    } catch {
      // localStorage may fail in restricted sandboxes or private browsing
    }
    applyTheme()
  }

  return {
    isDark,
    initTheme,
    toggleTheme,
  }
}
