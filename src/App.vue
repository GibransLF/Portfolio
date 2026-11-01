<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import HeroSection from '@/sections/HeroSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
import ExperienceSection from '@/sections/ExperienceSection.vue'
import EducationSection from '@/sections/EducationSection.vue'
import CertificatesSection from '@/sections/CertificatesSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased selection:bg-primary selection:text-primary-foreground">
    <!-- Top Navigation Header -->
    <Navbar />

    <!-- Main Content Container with all 6 PRD sections in exact order -->
    <main class="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 1. Hero / Introduction -->
      <HeroSection />

      <!-- 2. About Me -->
      <AboutSection />

      <!-- 3. Projects -->
      <ProjectsSection />

      <!-- 4. Skills -->
      <SkillsSection />

      <!-- 5. Experience -->
      <ExperienceSection />

      <!-- 6. Education -->
      <EducationSection />

      <!-- 7. Certificates -->
      <CertificatesSection />

      <!-- 8. Contact -->
      <ContactSection />
    </main>

    <!-- Site Footer -->
    <Footer />
  </div>
</template>
