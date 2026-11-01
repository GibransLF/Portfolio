<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  ExternalLink,
  Lock,
  ChevronLeft,
  ChevronRight,
  X,
  Images,
} from '@lucide/vue'
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import rawProjects from '@/data/projects.json'

// Vite eager glob resolver for project image assets located in src/assets/projects/
const projectAssetModules = import.meta.glob(
  ['/src/assets/projects/**/*.{png,jpg,jpeg,webp,svg}', '@/assets/projects/**/*.{png,jpg,jpeg,webp,svg}'],
  { eager: true, import: 'default' }
)

const resolveImagePath = (path) => {
  if (!path || typeof path !== 'string') return ''
  const trimmed = path.trim()
  if (!trimmed) return ''
  if (/^(https?:|\/\/|data:)/.test(trimmed)) return trimmed

  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  if (projectAssetModules[normalized]) {
    return projectAssetModules[normalized]
  }

  // Fallback by filename match
  const fileName = trimmed.split('/').pop()
  for (const [key, val] of Object.entries(projectAssetModules)) {
    if (key.endsWith(`/${fileName}`)) {
      return val
    }
  }

  return trimmed
}

// Normalize projects: ensure images array (max 4), images[0] is main image
const validProjects = computed(() => {
  if (!Array.isArray(rawProjects)) return []
  return rawProjects
    .filter(
      (p) => p && typeof p === 'object' && typeof p.title === 'string' && p.title.trim().length > 0
    )
    .map((p, idx) => {
      let rawList = []
      if (Array.isArray(p.images)) {
        rawList = p.images
      } else if (p.image1 || p.image2 || p.image3 || p.image4) {
        rawList = [p.image1, p.image2, p.image3, p.image4]
      } else if (typeof p.image === 'string' && p.image.trim().length > 0) {
        rawList = [p.image]
      }

      const images = rawList
        .filter((img) => typeof img === 'string' && img.trim().length > 0)
        .map((img) => resolveImagePath(img))

      return {
        ...p,
        id: idx,
        images,
      }
    })
})

// --- Card Hover Slideshow Management ---
// Tracks active image index per project card
const cardActiveIndices = ref({})
// Stores interval IDs for cleanup
const cardIntervals = {}

const getCardImage = (project) => {
  if (!project.images || project.images.length === 0) return ''
  const activeIdx = cardActiveIndices.value[project.id] ?? 0
  return project.images[activeIdx] || project.images[0]
}

const handleMouseEnterCard = (project) => {
  if (!project.images || project.images.length <= 1) return

  // Immediately switch to image 2 (index 1) on hover
  cardActiveIndices.value[project.id] = 1

  // Clear existing interval if any
  if (cardIntervals[project.id]) {
    clearInterval(cardIntervals[project.id])
  }

  // Start auto-slideshow every 1.8 seconds
  cardIntervals[project.id] = setInterval(() => {
    const total = project.images.length
    const current = cardActiveIndices.value[project.id] ?? 0
    cardActiveIndices.value[project.id] = (current + 1) % total
  }, 1800)
}

const handleMouseLeaveCard = (project) => {
  if (cardIntervals[project.id]) {
    clearInterval(cardIntervals[project.id])
    delete cardIntervals[project.id]
  }
  // Reset back to main image (index 0)
  cardActiveIndices.value[project.id] = 0
}

// --- Modal Lightbox Preview Management ---
const selectedProject = ref(null)
const modalActiveImageIndex = ref(0)

const openModal = (project, initialIndex = 0) => {
  selectedProject.value = project
  const maxIdx = Math.max(0, project.images.length - 1)
  modalActiveImageIndex.value = Math.min(Math.max(0, initialIndex), maxIdx)
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProject.value = null
  modalActiveImageIndex.value = 0
  document.body.style.overflow = ''
}

const nextModalImage = () => {
  if (!selectedProject.value || selectedProject.value.images.length <= 1) return
  const total = selectedProject.value.images.length
  modalActiveImageIndex.value = (modalActiveImageIndex.value + 1) % total
}

const prevModalImage = () => {
  if (!selectedProject.value || selectedProject.value.images.length <= 1) return
  const total = selectedProject.value.images.length
  modalActiveImageIndex.value = (modalActiveImageIndex.value - 1 + total) % total
}

const setModalImage = (index) => {
  modalActiveImageIndex.value = index
}

// Keyboard controls (Escape, ArrowLeft, ArrowRight)
const handleKeydown = (e) => {
  if (!selectedProject.value) return

  if (e.key === 'Escape') {
    closeModal()
  } else if (e.key === 'ArrowRight') {
    nextModalImage()
  } else if (e.key === 'ArrowLeft') {
    prevModalImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
  // Clean all card slideshow intervals
  Object.values(cardIntervals).forEach((intervalId) => clearInterval(intervalId))
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
          Selected software projects. Click a card to view the image gallery and full details.
        </p>
      </div>

      <!-- Project Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="project in validProjects"
          :key="project.id"
          class="group flex flex-col justify-between rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-foreground/30 cursor-pointer select-none"
          tabindex="0"
          role="button"
          :aria-label="`View details and gallery for ${project.title}`"
          @click="openModal(project, cardActiveIndices[project.id] || 0)"
          @keydown.enter="openModal(project, cardActiveIndices[project.id] || 0)"
          @keydown.space.prevent="openModal(project, cardActiveIndices[project.id] || 0)"
          @mouseenter="handleMouseEnterCard(project)"
          @mouseleave="handleMouseLeaveCard(project)"
        >
          <div class="space-y-4">
            <!-- Thumbnail Image with Hover Slideshow & Fallback -->
            <div
              v-if="project.images && project.images.length > 0"
              class="relative w-full aspect-video overflow-hidden rounded-lg bg-muted/40 border border-border/50"
            >
              <ImageWithFallback
                :src="getCardImage(project)"
                :alt="project.title"
                aspect-ratio="aspect-video w-full h-full"
                image-class="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />

              <!-- Multi-image badge indicator -->
              <div
                v-if="project.images.length > 1"
                class="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-background/80 backdrop-blur-sm text-[11px] font-semibold text-foreground flex items-center gap-1 shadow-sm border border-border/50"
                aria-label="Project images count"
              >
                <Images class="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>{{ project.images.length }}</span>
              </div>

              <!-- Dot indicators for slideshow progress -->
              <div
                v-if="project.images.length > 1"
                class="absolute bottom-2.5 inset-x-0 flex items-center justify-center gap-1.5 z-10 pointer-events-none"
                aria-hidden="true"
              >
                <span
                  v-for="(_, dotIdx) in project.images"
                  :key="dotIdx"
                  :class="[
                    'h-1.5 rounded-full transition-all duration-300',
                    (cardActiveIndices[project.id] ?? 0) === dotIdx
                      ? 'w-4 bg-primary shadow-sm'
                      : 'w-1.5 bg-background/70 backdrop-blur-sm border border-border/40'
                  ]"
                />
              </div>
            </div>

            <div class="space-y-2">
              <h3 class="text-lg font-semibold tracking-tight text-card-foreground group-hover:text-primary transition-colors">
                {{ project.title }}
              </h3>
              <!-- Description truncated on card (opens modal for complete text) -->
              <p
                v-if="project.description"
                class="text-sm text-muted-foreground leading-relaxed line-clamp-3"
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

            <!-- GitHub Action Link or Private Indicator -->
            <div class="pt-2 border-t border-border/50 flex items-center justify-between">
              <a
                v-if="project.githubUrl && project.githubUrl.trim().length > 0"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-foreground/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm py-1"
                :aria-label="`View source code for ${project.title} on GitHub (opens in a new tab)`"
                @click.stop
              >
                <GithubIcon class="w-4 h-4" />
                <span>Source Code</span>
                <ExternalLink class="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
              </a>
              <div
                v-else
                class="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground select-none py-1"
              >
                <Lock class="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                <span>Private Repository</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Modal Lightbox Preview for Full Project Details & Gallery -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedProject"
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedProject.title"
          @click.self="closeModal"
        >
          <div
            class="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-6 bg-card/90">
              <div class="pr-6 space-y-0.5 min-w-0">
                <h3 class="text-base sm:text-lg font-bold text-foreground truncate">
                  {{ selectedProject.title }}
                </h3>
                <p class="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                  <span>Project Details &amp; Gallery Preview</span>
                  <span v-if="selectedProject.images && selectedProject.images.length > 1">
                    &bull; Image {{ modalActiveImageIndex + 1 }} of {{ selectedProject.images.length }}
                  </span>
                </p>
              </div>

              <!-- Close Button -->
              <button
                type="button"
                class="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer transition-colors shrink-0"
                aria-label="Close project preview"
                @click="closeModal"
              >
                <X class="h-4 w-4" />
              </button>
            </div>

            <!-- Modal Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-card">
              <!-- Gallery Container (if images exist) -->
              <div
                v-if="selectedProject.images && selectedProject.images.length > 0"
                class="space-y-3"
              >
                <div
                  class="relative aspect-video max-h-[46vh] sm:max-h-[52vh] w-full rounded-xl overflow-hidden bg-muted/30 border border-border/60 flex items-center justify-center"
                >
                  <ImageWithFallback
                    :src="selectedProject.images[modalActiveImageIndex]"
                    :alt="`${selectedProject.title} - Image ${modalActiveImageIndex + 1}`"
                    aspect-ratio="aspect-auto h-full w-full"
                    image-class="max-h-[46vh] sm:max-h-[52vh] w-auto max-w-full object-contain mx-auto"
                  />

                  <!-- Prev Button -->
                  <button
                    v-if="selectedProject.images.length > 1"
                    type="button"
                    class="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 hover:bg-background border border-border text-foreground flex items-center justify-center shadow-md backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                    aria-label="Previous image"
                    @click.stop="prevModalImage"
                  >
                    <ChevronLeft class="h-5 w-5" />
                  </button>

                  <!-- Next Button -->
                  <button
                    v-if="selectedProject.images.length > 1"
                    type="button"
                    class="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 hover:bg-background border border-border text-foreground flex items-center justify-center shadow-md backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                    aria-label="Next image"
                    @click.stop="nextModalImage"
                  >
                    <ChevronRight class="h-5 w-5" />
                  </button>

                  <!-- Image Index Counter Badge -->
                  <div
                    v-if="selectedProject.images.length > 1"
                    class="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-sm border border-border/60 text-xs font-semibold text-foreground shadow-sm"
                  >
                    {{ modalActiveImageIndex + 1 }} / {{ selectedProject.images.length }}
                  </div>
                </div>

                <!-- Thumbnail Navigation Strip -->
                <div
                  v-if="selectedProject.images.length > 1"
                  class="flex items-center justify-center gap-2.5 pt-1 overflow-x-auto pb-1"
                >
                  <button
                    v-for="(thumbImg, idx) in selectedProject.images"
                    :key="idx"
                    type="button"
                    :class="[
                      'relative w-16 h-11 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      modalActiveImageIndex === idx
                        ? 'border-primary ring-2 ring-primary/30 opacity-100 shadow-sm'
                        : 'border-border/60 opacity-60 hover:opacity-100 hover:border-foreground/40'
                    ]"
                    :aria-label="`Select image ${idx + 1}`"
                    @click="setModalImage(idx)"
                  >
                    <img
                      :src="thumbImg"
                      :alt="`Thumbnail ${idx + 1}`"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                </div>
              </div>

              <!-- Full Description (no line-clamp: solves truncated text problem) -->
              <div class="space-y-2 pt-2">
                <h4 class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  About Project
                </h4>
                <p
                  v-if="selectedProject.description"
                  class="text-sm sm:text-base text-foreground/90 leading-relaxed whitespace-pre-line"
                >
                  {{ selectedProject.description }}
                </p>
              </div>

              <!-- Full Technologies Badges -->
              <div
                v-if="selectedProject.technologies && selectedProject.technologies.length > 0"
                class="space-y-2 pt-2"
              >
                <h4 class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Technologies &amp; Tools
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(tech, sIdx) in selectedProject.technologies"
                    :key="sIdx"
                    class="inline-flex items-center rounded-md bg-secondary px-2.5 py-1 text-xs sm:text-sm font-medium text-secondary-foreground border border-border/50"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Modal Footer (Repository Link & Close Action) -->
            <div class="border-t border-border/60 px-4 py-3 sm:px-6 bg-card flex items-center justify-between">
              <div>
                <a
                  v-if="selectedProject.githubUrl && selectedProject.githubUrl.trim().length > 0"
                  :href="selectedProject.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-xs sm:text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <GithubIcon class="w-4 h-4" />
                  <span>Visit Repository</span>
                  <ExternalLink class="w-3.5 h-3.5 opacity-80" aria-hidden="true" />
                </a>
                <div
                  v-else
                  class="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground select-none"
                >
                  <Lock class="w-4 h-4 opacity-80" aria-hidden="true" />
                  <span>Private Repository</span>
                </div>
              </div>

              <button
                type="button"
                class="inline-flex items-center rounded-lg border border-border px-3.5 py-2 text-xs sm:text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                @click="closeModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>