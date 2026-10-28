<script setup>
import profileData from '@/data/profile.json'

const profile = profileData
</script>

<template>
  <section
    id="about"
    class="py-14 md:py-20 border-b border-border/40"
    aria-labelledby="about-heading"
  >
    <div class="space-y-6 max-w-3xl">
      <div class="space-y-2">
        <h2 id="about-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          About Me
        </h2>
        <div class="h-1 w-12 rounded bg-foreground/20"></div>
      </div>

      <div class="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
        <p v-if="profile.about">
          {{ profile.about }}
        </p>

        <!-- Professional Interests -->
        <div v-if="profile.interests && profile.interests.length > 0" class="pt-4 space-y-3">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-foreground">
            Primary Interests & Specializations
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(interest, idx) in profile.interests"
              :key="idx"
              class="inline-flex items-center rounded-md border border-border bg-muted/60 px-3 py-1 text-sm font-medium text-foreground transition-colors"
            >
              {{ interest }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
