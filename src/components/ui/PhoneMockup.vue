<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <div class="relative mx-auto w-full max-w-[280px]">
    <div
      class="rounded-[2.5rem] border-[10px] border-ink-900 bg-ink-900 shadow-2xl shadow-ink-900/30"
    >
      <div class="relative aspect-[9/19.5] overflow-hidden rounded-[1.75rem] bg-white">
        <div
          class="absolute top-0 left-1/2 z-10 h-5 w-28 -translate-x-1/2 rounded-b-2xl bg-ink-900"
        />
        <div class="h-full w-full overflow-y-auto pt-7">
          <slot />
        </div>
      </div>
    </div>
    <p v-if="label" class="mt-4 text-center text-xs font-medium text-ink-400">{{ label }}</p>
  </div>
</template>
