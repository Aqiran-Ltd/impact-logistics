<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import CornerMarks from '@/components/ui/CornerMarks.vue'
import type { StockImage } from '@/data/stockImages'

defineProps<{
  eyebrow: string
  title: string
  subtitle?: string
  image: StockImage
}>()
</script>

<template>
  <section class="relative overflow-hidden bg-ink-950">
    <img
      :src="image.src"
      :alt="image.alt"
      class="absolute inset-0 h-full w-full object-cover grayscale"
      loading="eager"
    />
    <div class="absolute inset-0 bg-ink-950/75" />

    <div class="relative mx-auto max-w-7xl px-6 pt-20 pb-16 lg:px-8">
      <CornerMarks tone="white" class="hidden sm:block" />
      <SectionHeading
        :eyebrow="eyebrow"
        :title="title"
        :subtitle="subtitle"
        align="center"
        tone="dark"
      />
    </div>
  </section>
</template>
