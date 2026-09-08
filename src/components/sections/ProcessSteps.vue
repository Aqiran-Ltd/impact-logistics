<script setup lang="ts">
import { getProcessSteps } from '@/services/process.service'
import { useAsyncData } from '@/composables/useAsyncData'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconBadge from '@/components/ui/IconBadge.vue'

withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    subtitle?: string
    tone?: 'light' | 'dark'
  }>(),
  {
    eyebrow: 'How It Works',
    title: 'Four steps. Zero ambiguity.',
    subtitle:
      'Every route follows the same verified sequence, whether it is a single tray or a full case cart.',
    tone: 'light',
  },
)

const { data: steps } = useAsyncData(getProcessSteps)
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-24 lg:px-8">
    <SectionHeading
      :eyebrow="eyebrow"
      :title="title"
      :subtitle="subtitle"
      :tone="tone"
      align="center"
    />

    <div class="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div
        class="absolute top-8 right-[12.5%] left-[12.5%] hidden h-0 border-t-2 border-dashed border-ink-200 lg:block"
        :class="tone === 'dark' && 'border-white/15'"
      />
      <div v-for="step in steps" :key="step.id" class="relative text-center">
        <div
          class="relative z-10 mx-auto w-fit"
          :class="tone === 'dark' ? 'bg-ink-950' : 'bg-white'"
        >
          <IconBadge :icon="step.icon" :tone="tone === 'dark' ? 'ink' : 'brand'" size="lg" />
        </div>
        <p
          class="mt-5 font-mono text-xs font-semibold tracking-[0.2em] uppercase"
          :class="tone === 'dark' ? 'text-brand-400' : 'text-brand-600'"
        >
          Step {{ String(step.order).padStart(2, '0') }}
        </p>
        <h3
          class="mt-2 font-display text-lg font-bold"
          :class="tone === 'dark' ? 'text-white' : 'text-ink-900'"
        >
          {{ step.title }}
        </h3>
        <p class="mt-2 text-sm" :class="tone === 'dark' ? 'text-ink-300' : 'text-ink-500'">
          {{ step.description }}
        </p>
      </div>
    </div>
  </section>
</template>
