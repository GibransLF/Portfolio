<script setup>
import { ref, computed, watch } from 'vue'
import { ImageOff } from '@lucide/vue'

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: '',
  },
  aspectRatio: {
    type: String,
    default: 'aspect-square',
  },
  imageClass: {
    type: String,
    default: 'object-cover',
  },
})

const hasError = ref(false)

watch(
  () => props.src,
  () => {
    hasError.value = false
  }
)

const isUnavailable = computed(() => {
  return !props.src || !props.src.trim() || hasError.value
})

const handleError = () => {
  hasError.value = true
}
</script>

<template>
  <div
    :class="[
      aspectRatio,
      'relative w-full overflow-hidden bg-muted rounded-lg flex items-center justify-center border border-border transition-colors'
    ]"
  >
    <div
      v-if="isUnavailable"
      class="flex flex-col items-center justify-center p-4 text-center text-muted-foreground select-none"
      role="img"
      :aria-label="alt ? `${alt} (Image unavailable)` : 'Image unavailable'"
    >
      <ImageOff class="h-8 w-8 mb-1.5 opacity-60" aria-hidden="true" />
      <span class="text-xs font-medium tracking-tight opacity-80">Image unavailable</span>
    </div>

    <img
      v-else
      :src="src"
      :alt="alt"
      :class="['w-full h-full', imageClass]"
      loading="lazy"
      @error="handleError"
    />
  </div>
</template>
