<script setup lang="ts">
import { computed } from 'vue'
import { getServices } from '@/services/services.service'
import { useAsyncData } from '@/composables/useAsyncData'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const { data: services } = useAsyncData(getServices)
const preview = computed(() => services.value?.slice(0, 6) ?? [])
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-24 lg:px-8">
    <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <SectionHeading
        eyebrow="What We Do"
        title="Precision courier services built around the OR schedule."
        subtitle="From single-facility routes to multi-state networks, every service is built on the same chain-of-custody standard."
      />
      <BaseButton to="/services" variant="ghost" class="shrink-0">
        View all services
        <AppIcon name="ArrowRight" class="h-4 w-4" />
      </BaseButton>
    </div>

    <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <BaseCard v-for="(service, index) in preview" :key="service.id" hoverable>
        <div class="flex items-start justify-between">
          <IconBadge :icon="service.icon" />
          <span class="font-mono text-xs text-ink-300">SVC-{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
        <h3 class="mt-5 font-display text-lg font-bold text-ink-900">{{ service.title }}</h3>
        <p class="mt-2 text-sm text-ink-500">{{ service.summary }}</p>
      </BaseCard>
    </div>
  </section>
</template>
