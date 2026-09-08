<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

const points = [
  { icon: 'Camera', label: 'Photo-verified handoffs' },
  { icon: 'ShieldCheck', label: 'Licensed & insured, nationwide' },
  { icon: 'Route', label: '24/7 dispatch coverage' },
  { icon: 'FileCheck2', label: 'Audit-ready reporting' },
]
</script>

<template>
  <section class="border-y border-ink-100 bg-ink-50/60">
    <div class="mx-auto max-w-7xl px-6 py-6 lg:px-8">
      <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <div
          v-for="point in points"
          :key="point.label"
          class="flex items-center gap-3 text-sm font-medium text-ink-600"
        >
          <AppIcon :name="point.icon" class="h-4.5 w-4.5 shrink-0 text-brand-600" />
          <span>{{ point.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
