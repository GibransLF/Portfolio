<script setup>
import { computed } from 'vue'
import rawEntries from '@/data/education.json'

const validEntries = computed(() => {
  if (!Array.isArray(rawEntries)) return []
  return rawEntries.filter(
    (e) => e && typeof e === 'object' && typeof e.institution === 'string' && e.institution.trim().length > 0
  )
})
</script>

<template>
  <section
    id="education"
    class="py-14 md:py-20 border-b border-border/40"
    aria-labelledby="education-heading"
  >
    <div class="space-y-8">
      <div class="space-y-2">
        <h2 id="education-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Education
        </h2>
        <div class="h-1 w-12 rounded bg-foreground/20"></div>
        <p class="text-sm sm:text-base text-muted-foreground">
          Academic background, degrees, vocational training, and formal qualifications.
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
            <!-- Period & GPA Badges -->
            <div class="flex flex-wrap items-center gap-2">
              <span v-if="item.period" class="text-xs sm:text-sm font-medium text-muted-foreground">
                {{ item.period }}
              </span>
              <span
                v-if="item.gpa"
                class="inline-flex items-center rounded bg-secondary px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-secondary-foreground border border-border/60"
              >
                GPA / Nilai: {{ item.gpa }}
              </span>
            </div>

            <!-- Degree / Major Title -->
            <h3 class="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              {{ item.degree }}
            </h3>

            <!-- Institution Name -->
            <p class="text-sm sm:text-base font-semibold text-foreground/80">
              {{ item.institution }}
            </p>

            <!-- Optional Description / Focus -->
            <p v-if="item.description" class="text-sm sm:text-base text-muted-foreground leading-relaxed pt-0.5">
              {{ item.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
