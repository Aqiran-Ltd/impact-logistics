<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'brand' | 'ink' | 'white' }>(), { tone: 'ink' })
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-sm border px-3 py-1 font-mono text-[11px] font-semibold tracking-wider uppercase"
    :class="[
      tone === 'ink' && 'border-ink-200 bg-white text-ink-600',
      tone === 'brand' && 'border-brand-600 bg-brand-50 text-brand-700',
      tone === 'white' && 'border-white/30 bg-white/5 text-white',
    ]"
  >
    <slot />
  </span>
</template>
