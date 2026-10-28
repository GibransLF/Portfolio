<script setup>
import profileData from '@/data/profile.json'

const currentYear = new Date().getFullYear()
const name = profileData.name || 'Developer'
</script>

<template>
  <footer class="border-t border-border/40 py-8 text-center text-xs text-muted-foreground">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
      <p>&copy; {{ currentYear }} {{ name }}. Built with Vue 3, Vite, and Tailwind CSS.</p>
      <p class="text-[11px] opacity-75">
        Designed with shadcn-vue neutral preset. Static hosting via GitHub Pages.
      </p>
    </div>
  </footer>
</template>
