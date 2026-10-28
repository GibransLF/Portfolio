<script setup>
import { onMounted } from 'vue'
import { Sun, Moon } from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, initTheme, toggleTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>

<template>
  <button
    type="button"
    class="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <Sun
      v-if="isDark"
      class="h-4 w-4 transition-transform duration-200 rotate-0 scale-100"
      aria-hidden="true"
    />
    <Moon
      v-else
      class="h-4 w-4 transition-transform duration-200 rotate-0 scale-100"
      aria-hidden="true"
    />
    <span class="sr-only">Toggle theme</span>
  </button>
</template>
