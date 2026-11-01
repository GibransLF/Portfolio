<script setup>
import { computed } from 'vue'
import rawEntries from '@/data/experience.json'

const validEntries = computed(() => {
  if (!Array.isArray(rawEntries)) return []
  return rawEntries.filter(
    (e) => e && typeof e === 'object' && typeof e.title === 'string' && e.title.trim().length > 0
  )
})
</script>

<template>
  <section
    id="experience"
    class="py-14 md:py-20 border-b border-border/40"
    aria-labelledby="experience-heading"
  >
    <div class="space-y-8">
      <div class="space-y-2">
        <h2 id="experience-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Experience
        </h2>
        <div class="h-1 w-12 rounded bg-foreground/20"></div>
        <p class="text-sm sm:text-base text-muted-foreground">
          Professional roles, internships, and work history.
        </p>
      </div>

      <!-- Vertical Timeline -->
      <div class="relative border-l-2 border-border ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
        <div
          v-for="(item, idx) in validEntries"
          :key="idx"
          class="relative group"
        >
          <!-- Timeline Indicator Node -->
          <div
            class="absolute -left-[31px] sm:-left-[39px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary transition-transform group-hover:scale-125"
            aria-hidden="true"
          ></div>

          <div class="space-y-2.5">
            <!-- Type badge & Period -->
            <div class="flex flex-wrap items-center gap-2">
              <span
                v-if="item.type"
                class="inline-flex items-center rounded bg-secondary px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-secondary-foreground border border-border/60"
              >
                {{ item.type }}
              </span>
              <span v-if="item.period" class="text-xs sm:text-sm font-medium text-muted-foreground">
                {{ item.period }}
              </span>
            </div>

            <!-- Position Title -->
            <h3 class="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {{ item.title }}
            </h3>

            <!-- Company or Studio -->
            <p v-if="item.company" class="text-sm sm:text-base font-semibold text-foreground/80">
              {{ item.company }}
            </p>

            <!-- Short Summary -->
            <p v-if="item.summary" class="text-sm sm:text-base text-muted-foreground leading-relaxed pt-0.5">
              {{ item.summary }}
            </p>

            <!-- Responsibilities -->
            <div
              v-if="item.responsibilities && item.responsibilities.length > 0"
              class="pt-2 space-y-1"
            >
              <h4 class="text-xs font-semibold uppercase tracking-wider text-foreground/80">
                Key Responsibilities:
              </h4>
              <ul class="list-disc list-outside ml-4 space-y-1 text-xs sm:text-sm text-muted-foreground">
                <li v-for="(resp, rIdx) in item.responsibilities" :key="rIdx">
                  {{ resp }}
                </li>
              </ul>
            </div>

            <!-- Achievements -->
            <div
              v-if="item.achievements && item.achievements.length > 0"
              class="pt-2 space-y-1"
            >
              <h4 class="text-xs font-semibold uppercase tracking-wider text-foreground/80">
                Notable Achievements:
              </h4>
              <ul class="list-disc list-outside ml-4 space-y-1 text-xs sm:text-sm text-muted-foreground">
                <li v-for="(ach, aIdx) in item.achievements" :key="aIdx">
                  {{ ach }}
                </li>
              </ul>
            </div>

            <!-- Relevant Technologies -->
            <div
              v-if="item.technologies && item.technologies.length > 0"
              class="flex flex-wrap gap-1.5 pt-2"
            >
              <span
                v-for="(tech, tIdx) in item.technologies"
                :key="tIdx"
                class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border border-border/40"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
