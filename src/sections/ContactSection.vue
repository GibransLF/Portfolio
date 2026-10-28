<script setup>
import { computed } from 'vue'
import { Mail, ExternalLink } from '@lucide/vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import profileData from '@/data/profile.json'

const contacts = computed(() => profileData.contacts || {})

const hasEmail = computed(() => {
  return typeof contacts.value.email === 'string' && contacts.value.email.trim().length > 0
})

const hasGithub = computed(() => {
  return typeof contacts.value.github === 'string' && contacts.value.github.trim().length > 0
})

const hasLinkedin = computed(() => {
  return typeof contacts.value.linkedin === 'string' && contacts.value.linkedin.trim().length > 0
})

const hasAnyContact = computed(() => {
  return hasEmail.value || hasGithub.value || hasLinkedin.value
})
</script>

<template>
  <section
    id="contact"
    class="py-14 md:py-20"
    aria-labelledby="contact-heading"
  >
    <div class="space-y-8 max-w-3xl">
      <div class="space-y-2">
        <h2 id="contact-heading" class="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Contact
        </h2>
        <div class="h-1 w-12 rounded bg-foreground/20"></div>
        <p class="text-sm sm:text-base text-muted-foreground">
          Feel free to reach out for engineering opportunities, collaborations, or inquiries.
        </p>
      </div>

      <!-- Direct Contact Links (Only displayed if values are present and valid) -->
      <div v-if="hasAnyContact" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        <!-- Email Link -->
        <a
          v-if="hasEmail"
          :href="`mailto:${contacts.email}`"
          class="flex items-center gap-3 p-4 rounded-xl border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Send an email"
        >
          <div class="p-2 rounded-lg bg-secondary text-secondary-foreground shrink-0">
            <Mail class="w-5 h-5" aria-hidden="true" />
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</p>
            <p class="text-sm font-medium truncate">{{ contacts.email }}</p>
          </div>
        </a>

        <!-- GitHub Link -->
        <a
          v-if="hasGithub"
          :href="contacts.github"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between p-4 rounded-xl border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Visit GitHub profile (opens in a new tab)"
        >
          <div class="flex items-center gap-3 overflow-hidden">
            <div class="p-2 rounded-lg bg-secondary text-secondary-foreground shrink-0">
              <GithubIcon class="w-5 h-5" />
            </div>
            <div class="overflow-hidden">
              <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">GitHub</p>
              <p class="text-sm font-medium truncate">View Code &amp; Repos</p>
            </div>
          </div>
          <ExternalLink class="w-4 h-4 opacity-60 shrink-0" aria-hidden="true" />
        </a>

        <!-- LinkedIn Link -->
        <a
          v-if="hasLinkedin"
          :href="contacts.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-between p-4 rounded-xl border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Connect on LinkedIn (opens in a new tab)"
        >
          <div class="flex items-center gap-3 overflow-hidden">
            <div class="p-2 rounded-lg bg-secondary text-secondary-foreground shrink-0">
              <LinkedinIcon class="w-5 h-5" />
            </div>
            <div class="overflow-hidden">
              <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground">LinkedIn</p>
              <p class="text-sm font-medium truncate">Professional Profile</p>
            </div>
          </div>
          <ExternalLink class="w-4 h-4 opacity-60 shrink-0" aria-hidden="true" />
        </a>
      </div>

      <!-- Footer note -->
      <p class="text-xs text-muted-foreground pt-4">
        Direct messages and communications are welcomed via email or LinkedIn.
      </p>
    </div>
  </section>
</template>
