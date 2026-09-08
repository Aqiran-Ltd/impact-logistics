<script setup lang="ts">
withDefaults(defineProps<{ hoverable?: boolean }>(), { hoverable: false })
</script>

<template>
  <div
    class="rounded-lg border-2 border-ink-100 bg-white p-6 transition-colors duration-200"
    :class="hoverable && 'hover:border-brand-600'"
  >
    <slot />
  </div>
</template>
