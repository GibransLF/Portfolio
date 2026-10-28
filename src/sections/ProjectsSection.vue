<script setup>
import { computed } from 'vue'
import { ExternalLink } from '@lucide/vue'
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import rawProjects from '@/data/projects.json'

// Validate entries: skip items that lack title or description
const validProjects = computed(() => {
  if (!Array.isArray(rawProjects)) return []
  return rawProjects.filter(
    (p) => p && typeof p === 'object' && typeof p.title === 'string' && p.title.trim().length > 0
  )
})
</script>

<template>
  <section
    id="projects"
    class="py-14 md:py-20 border-b border-border/40"
    aria-labelledby="projects-heading"
  >
    <div class="space-y-8">
      <div class="space-y-2">
        <h2 id="projects-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Projects
        </h2>
        <div class="h-1 w-12 rounded bg-foreground/20"></div>
        <p class="text-sm sm:text-base text-muted-foreground">
          Selected software projects and architectural implementations.
        </p>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(project, index) in validProjects"
          :key="index"
          class="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-border/80"
        >
          <div class="space-y-4">
            <!-- Thumbnail Image (consistent aspect ratio with fallback, hidden if empty as per PRD 3.3 & 6.5) -->
            <div v-if="project.image && project.image.trim().length > 0" class="w-full overflow-hidden rounded-lg">
              <ImageWithFallback
                :src="project.image"
                :alt="project.title"
                aspectRatio="aspect-video"
                imageClass="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div class="space-y-2">
              <h3 class="text-lg font-semibold tracking-tight text-card-foreground">
                {{ project.title }}
              </h3>
              <p
                v-if="project.description"
                class="text-sm text-muted-foreground leading-relaxed line-clamp-4"
              >
                {{ project.description }}
              </p>
            </div>
          </div>

          <div class="pt-5 space-y-4 mt-auto">
            <!-- Technologies Badges -->
            <div
              v-if="project.technologies && project.technologies.length > 0"
              class="flex flex-wrap gap-1.5"
            >
              <span
                v-for="(tech, tIdx) in project.technologies"
                :key="tIdx"
                class="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground border border-border/50"
              >
                {{ tech }}
              </span>
            </div>

            <!-- GitHub Action Link -->
            <div v-if="project.githubUrl" class="pt-2 border-t border-border/50 flex items-center justify-between">
              <a
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-foreground/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm py-1"
                :aria-label="`View source code for ${project.title} on GitHub (opens in a new tab)`"
              >
                <GithubIcon class="w-4 h-4" />
                <span>Source Code</span>
                <ExternalLink class="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
