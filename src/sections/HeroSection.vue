<script setup>
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import profileData from '@/data/profile.json'
import heroPhoto from '@/assets/hero.jpg'

const profile = {
  ...profileData,
  photo: (profileData.photo && /^(https?:|\/\/|data:)/.test(profileData.photo))
    ? profileData.photo
    : heroPhoto
}

const scrollTo = (e, href) => {
  const target = document.querySelector(href)
  if (target) {
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth' })
    history.pushState(null, '', href)
  }
}
</script>

<template>
  <section
    id="hero"
    class="py-16 md:py-24 border-b border-border/40"
    aria-label="Introduction"
  >
    <div class="flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-8 md:gap-12">
      <!-- Profile Photo: On mobile it renders on top (order-1), on desktop on the right (order-2) -->
      <div class="order-1 md:order-2 w-48 sm:w-56 md:w-64 shrink-0">
        <ImageWithFallback
          :src="profile.photo"
          :alt="profile.name"
          aspectRatio="aspect-square"
          class="rounded-2xl shadow-sm border border-border overflow-hidden"
        />
      </div>

      <!-- Text Introduction: On mobile below photo (order-2), on desktop on the left (order-1) -->
      <div class="order-2 md:order-1 flex-1 space-y-4 max-w-2xl">
        <div class="space-y-1.5">
          <p class="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
            {{ profile.role }}
            <span v-if="profile.secondaryFocus" class="text-foreground/70 font-normal">
              &bull; Focus on {{ profile.secondaryFocus }}
            </span>
          </p>
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            {{ profile.name }}
          </h1>
        </div>

        <p class="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {{ profile.summary }}
        </p>

        <!-- Quick actions -->
        <div class="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
          <a
            href="#projects"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            @click="(e) => scrollTo(e, '#projects')"
          >
            Explore Projects
          </a>
          <a
            href="#contact"
            class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            @click="(e) => scrollTo(e, '#contact')"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
