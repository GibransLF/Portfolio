<script setup>
import { ref } from 'vue'
import { Menu, X } from '@lucide/vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Intro', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Education', href: '#education' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLinkClick = (e, href) => {
  closeMobileMenu()
  const target = document.querySelector(href)
  if (target) {
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
    // update URL hash without jump
    history.pushState(null, '', href)
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
  >
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Brand Logo / Name -->
      <a
        href="#hero"
        class="text-base font-semibold tracking-tight text-foreground hover:text-foreground/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        @click="(e) => handleLinkClick(e, '#hero')"
      >
        <span>Portfolio</span>
      </a>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex items-center space-x-6 text-sm font-medium" aria-label="Main Navigation">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm py-1 px-1.5"
          @click="(e) => handleLinkClick(e, link.href)"
        >
          {{ link.name }}
        </a>
      </nav>

      <!-- Right controls: Theme toggle & mobile menu button -->
      <div class="flex items-center space-x-2">
        <ThemeToggle />

        <!-- Mobile Menu Toggle Button -->
        <button
          type="button"
          class="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
          @click="toggleMobileMenu"
        >
          <X v-if="isMobileMenuOpen" class="h-5 w-5" aria-hidden="true" />
          <Menu v-else class="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer / Dropdown -->
    <div
      v-show="isMobileMenuOpen"
      class="md:hidden border-b border-border bg-background px-4 pt-2 pb-4 space-y-1"
    >
      <a
        v-for="link in navLinks"
        :key="link.href"
        :href="link.href"
        class="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        @click="(e) => handleLinkClick(e, link.href)"
      >
        {{ link.name }}
      </a>
    </div>
  </header>
</template>
