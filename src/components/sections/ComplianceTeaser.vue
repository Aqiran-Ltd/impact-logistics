<script setup lang="ts">
import { computed } from 'vue'
import { getComplianceItems } from '@/services/compliance.service'
import { useAsyncData } from '@/composables/useAsyncData'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const { data: items } = useAsyncData(getComplianceItems)
const preview = computed(() => items.value?.slice(0, 3) ?? [])
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-24 lg:px-8">
    <div class="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
      <SectionHeading
        eyebrow="Compliance & Trust"
        title="Built for the team that has to answer for every tray."
        subtitle="Chain-of-custody isn't a feature we bolted on — it's the reason the platform exists. Every log is exportable and audit-ready, on demand."
      />

      <div class="grid gap-5 sm:grid-cols-3">
        <div v-for="item in preview" :key="item.id">
          <IconBadge :icon="item.icon" />
          <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ item.title }}</h3>
          <p class="mt-2 text-sm text-ink-500">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <BaseButton to="/compliance" variant="ghost" class="mt-10">
      Read our compliance standard
      <AppIcon name="ArrowRight" class="h-4 w-4" />
    </BaseButton>
  </section>
</template>
