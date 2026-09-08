<script setup lang="ts">
import { getTestimonials } from '@/services/testimonials.service'
import { useAsyncData } from '@/composables/useAsyncData'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const { data: testimonials } = useAsyncData(getTestimonials)
</script>

<template>
  <section class="bg-ink-50/60 py-24">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <SectionHeading
        eyebrow="From the Field"
        title="What surgical services teams tell us."
        align="center"
      />

      <div class="mt-14 grid gap-6 sm:grid-cols-2">
        <BaseCard v-for="t in testimonials" :key="t.id">
          <p class="font-display text-lg leading-snug text-pretty text-ink-800">“{{ t.quote }}”</p>
          <div class="mt-6 flex items-center gap-3">
            <span
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
            >
              {{ t.initials }}
            </span>
            <div>
              <p class="text-sm font-bold text-ink-900">{{ t.name }}</p>
              <p class="text-xs text-ink-500">{{ t.role }} · {{ t.facilityType }}</p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
