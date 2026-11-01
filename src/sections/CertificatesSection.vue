<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { Calendar, Award, ZoomIn, X, ChevronLeft, ChevronRight } from '@lucide/vue'
import ImageWithFallback from '@/components/ImageWithFallback.vue'
import rawCertificates from '@/data/certificates.json'

const validCertificates = computed(() => {
  if (!Array.isArray(rawCertificates)) return []
  return rawCertificates.filter(
    (c) => c && typeof c === 'object' && typeof c.title === 'string' && c.title.trim().length > 0
  )
})

const ITEMS_PER_PAGE = 3
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.ceil(validCertificates.value.length / ITEMS_PER_PAGE) || 1
})

const paginatedCertificates = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  return validCertificates.value.slice(start, start + ITEMS_PER_PAGE)
})

const goToPage = (page) => {
  if (page < 1 || page > totalPages.value || page === currentPage.value) return
  currentPage.value = page
}

watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) {
    currentPage.value = Math.max(1, newTotal)
  }
})

const selectedCert = ref(null)

const openModal = (cert) => {
  selectedCert.value = cert
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedCert.value = null
  document.body.style.overflow = ''
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && selectedCert.value) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section
    id="certificates"
    class="py-14 md:py-20 border-b border-border/40"
    aria-labelledby="certificates-heading"
  >
    <div class="space-y-8">
      <div class="space-y-2">
        <h2 id="certificates-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Certifications &amp; Licenses
        </h2>
        <div class="h-1 w-12 rounded bg-foreground/20"></div>
        <p class="text-sm sm:text-base text-muted-foreground">
          Professional credentials, accredited training, and certified technical proficiencies.
        </p>
      </div>

      <!-- Certificate Grid with Page Transition -->
      <Transition
        mode="out-in"
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          :key="currentPage"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <article
            v-for="(item, idx) in paginatedCertificates"
            :key="item.title + idx"
            class="group flex flex-col rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-foreground/30 hover:shadow-md cursor-pointer select-none"
            tabindex="0"
            role="button"
            :aria-label="`View full certificate for ${item.title}`"
            @click="openModal(item)"
            @keydown.enter="openModal(item)"
            @keydown.space.prevent="openModal(item)"
          >
            <!-- Thumbnail Container with object-contain to support portrait, landscape, or square -->
            <div class="relative w-full aspect-[16/10] rounded-lg bg-muted/40 border border-border/50 overflow-hidden flex items-center justify-center p-2">
              <ImageWithFallback
                :src="item.image"
                :alt="item.title"
                aspect-ratio="aspect-auto h-full w-full"
                image-class="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
              />

              <!-- Hover overlay indicator to signal preview / zoom capability -->
              <div
                class="absolute inset-0 bg-background/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-foreground font-medium text-xs sm:text-sm"
                aria-hidden="true"
              >
                <ZoomIn class="w-4 h-4" />
                <span>Preview</span>
              </div>
            </div>

            <!-- Card Content -->
            <div class="flex-1 flex flex-col justify-between pt-4 space-y-3">
              <div class="space-y-2">
                <!-- Issuer & Date Meta -->
                <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span class="inline-flex items-center gap-1 font-semibold text-foreground/90">
                    <Award class="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    {{ item.issuer }}
                  </span>
                  <span v-if="item.date" class="inline-flex items-center gap-1">
                    <Calendar class="w-3.5 h-3.5" aria-hidden="true" />
                    {{ item.date }}
                  </span>
                </div>

                <!-- Certificate Title -->
                <h3 class="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {{ item.title }}
                </h3>
              </div>

              <!-- Skills Badges (Optional) -->
              <div
                v-if="item.skills && item.skills.length > 0"
                class="flex flex-wrap gap-1.5 pt-2 border-t border-border/40"
              >
                <span
                  v-for="(skill, sIdx) in item.skills"
                  :key="sIdx"
                  class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border border-border/40"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </article>
        </div>
      </Transition>

      <!-- Pagination Controls -->
      <div
        v-if="validCertificates.length > 0"
        class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40"
      >
        <!-- Showing entries info -->
        <p class="text-xs sm:text-sm text-muted-foreground order-2 sm:order-1 text-center sm:text-left">
          Showing
          <span class="font-medium text-foreground">
            {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }}
          </span>
          to
          <span class="font-medium text-foreground">
            {{ Math.min(currentPage * ITEMS_PER_PAGE, validCertificates.length) }}
          </span>
          of
          <span class="font-medium text-foreground">
            {{ validCertificates.length }}
          </span>
          certificates
        </p>

        <!-- Page Link Navigation Buttons -->
        <nav
          class="inline-flex items-center gap-1.5 order-1 sm:order-2"
          aria-label="Certificates pagination navigation"
        >
          <!-- Prev Button -->
          <button
            type="button"
            :disabled="currentPage === 1"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer disabled:pointer-events-none"
            aria-label="Previous page"
            @click="goToPage(currentPage - 1)"
          >
            <ChevronLeft class="h-4 w-4" />
          </button>

          <!-- Numbered Page Links -->
          <button
            v-for="page in totalPages"
            :key="page"
            type="button"
            :aria-current="currentPage === page ? 'page' : undefined"
            :class="[
              'inline-flex h-9 min-w-9 px-3 items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer',
              currentPage === page
                ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                : 'border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            ]"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>

          <!-- Next Button -->
          <button
            type="button"
            :disabled="currentPage === totalPages"
            class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer disabled:pointer-events-none"
            aria-label="Next page"
            @click="goToPage(currentPage + 1)"
          >
            <ChevronRight class="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>

    <!-- Modal Lightbox Preview for Certificate Image -->
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
          v-if="selectedCert"
          class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          :aria-label="selectedCert.title"
          @click.self="closeModal"
        >
          <div
            class="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200"
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between border-b border-border/60 px-4 py-3 sm:px-6 bg-card/90">
              <div class="pr-6 space-y-0.5 min-w-0">
                <h3 class="text-base sm:text-lg font-bold text-foreground truncate">
                  {{ selectedCert.title }}
                </h3>
                <p class="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                  <span class="font-medium text-foreground/80">{{ selectedCert.issuer }}</span>
                  <span v-if="selectedCert.date">&bull; {{ selectedCert.date }}</span>
                </p>
              </div>

              <!-- Close Button -->
              <button
                type="button"
                class="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer transition-colors shrink-0"
                aria-label="Close certificate preview"
                @click="closeModal"
              >
                <X class="h-4 w-4" />
              </button>
            </div>

            <!-- Modal Image Container -->
            <div class="flex-1 overflow-auto p-4 sm:p-6 bg-muted/20 flex items-center justify-center min-h-[240px]">
              <ImageWithFallback
                :src="selectedCert.image"
                :alt="selectedCert.title"
                aspect-ratio="aspect-auto max-h-[65vh] w-auto max-w-full"
                image-class="max-h-[65vh] w-auto max-w-full object-contain rounded-md shadow-sm"
              />
            </div>

            <!-- Modal Footer (Skills & Summary) -->
            <div
              v-if="selectedCert.skills && selectedCert.skills.length > 0"
              class="border-t border-border/60 px-4 py-3 sm:px-6 bg-card flex flex-wrap items-center gap-1.5"
            >
              <span class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">Skills:</span>
              <span
                v-for="(skill, sIdx) in selectedCert.skills"
                :key="sIdx"
                class="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground border border-border/40"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
