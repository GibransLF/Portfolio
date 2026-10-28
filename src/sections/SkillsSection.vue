<script setup>
import { computed } from 'vue'
import rawSkills from '@/data/skills.json'

const skillsGroups = computed(() => {
  if (!Array.isArray(rawSkills)) return []
  return rawSkills.filter(
    (g) => g && typeof g.category === 'string' && Array.isArray(g.items) && g.items.length > 0
  )
})
</script>

<template>
  <section
    id="skills"
    class="py-14 md:py-20 border-b border-border/40"
    aria-labelledby="skills-heading"
  >
    <div class="space-y-8">
      <div class="space-y-2">
        <h2 id="skills-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Skills
        </h2>
        <div class="h-1 w-12 rounded bg-foreground/20"></div>
        <p class="text-sm sm:text-base text-muted-foreground">
          Technical proficiencies, frameworks, databases, and development tooling.
        </p>
      </div>

      <!-- Skills Grouped by Category -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        <div
          v-for="(group, idx) in skillsGroups"
          :key="idx"
          class="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3"
        >
          <h3 class="text-base font-semibold tracking-tight text-card-foreground">
            {{ group.category }}
          </h3>

          <!-- Text-only badges (no icons, no percentage bars) -->
          <div class="flex flex-wrap gap-2 pt-1">
            <span
              v-for="(item, itemIdx) in group.items"
              :key="itemIdx"
              class="inline-flex items-center rounded-md border border-border bg-secondary/80 px-3 py-1 text-xs sm:text-sm font-medium text-secondary-foreground transition-colors"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
