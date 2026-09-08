<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'ink' | 'brand' | 'white' }>(), { tone: 'ink' })
</script>

<template>
  <div class="pointer-events-none absolute inset-0" aria-hidden="true">
    <span
      class="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 sm:h-5 sm:w-5"
      :class="[
        tone === 'ink' && 'border-ink-300',
        tone === 'brand' && 'border-brand-500',
        tone === 'white' && 'border-white/30',
      ]"
    />
    <span
      class="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 sm:h-5 sm:w-5"
      :class="[
        tone === 'ink' && 'border-ink-300',
        tone === 'brand' && 'border-brand-500',
        tone === 'white' && 'border-white/30',
      ]"
    />
    <span
      class="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 sm:h-5 sm:w-5"
      :class="[
        tone === 'ink' && 'border-ink-300',
        tone === 'brand' && 'border-brand-500',
        tone === 'white' && 'border-white/30',
      ]"
    />
    <span
      class="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 sm:h-5 sm:w-5"
      :class="[
        tone === 'ink' && 'border-ink-300',
        tone === 'brand' && 'border-brand-500',
        tone === 'white' && 'border-white/30',
      ]"
    />
  </div>
</template>
