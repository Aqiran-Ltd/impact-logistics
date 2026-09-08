<script setup lang="ts">
import { computed } from 'vue'
import type { Stat } from '@/models/content'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps<{ stat: Stat }>()

const { target: revealTarget, isVisible } = useScrollReveal(0.4)
const display = useCountUp(props.stat.value, isVisible)

const formatted = computed(() => {
  const value = display.value
  if (value >= 100000) {
    return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(
      value,
    )
  }
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value)
})
</script>

<template>
  <div ref="revealTarget" class="text-center sm:text-left">
    <p class="font-mono text-4xl font-semibold text-white sm:text-5xl">
      <span v-if="stat.prefix">{{ stat.prefix }}</span
      >{{ formatted }}<span class="text-brand-400">{{ stat.suffix }}</span>
    </p>
    <p class="mt-2 font-mono text-xs tracking-wide text-ink-300 uppercase">{{ stat.label }}</p>
  </div>
</template>
