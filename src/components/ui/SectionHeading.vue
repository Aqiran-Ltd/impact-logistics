<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
    tone?: 'light' | 'dark'
  }>(),
  {
    align: 'left',
    tone: 'light',
  },
)
</script>

<template>
  <div :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'">
    <p
      v-if="eyebrow"
      class="mb-3 font-mono text-xs font-semibold tracking-[0.2em] text-brand-600 uppercase"
      :class="tone === 'dark' && 'text-brand-400'"
    >
      // {{ eyebrow }}
    </p>
    <h2
      class="font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
      :class="tone === 'dark' ? 'text-white' : 'text-ink-900'"
    >
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-4 text-lg text-pretty"
      :class="tone === 'dark' ? 'text-ink-300' : 'text-ink-500'"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
