<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon.vue'

withDefaults(
  defineProps<{
    icon: string
    tone?: 'brand' | 'ink' | 'white'
    size?: 'md' | 'lg'
  }>(),
  {
    tone: 'brand',
    size: 'md',
  },
)
</script>

<template>
  <div
    class="inline-flex shrink-0 items-center justify-center rounded-md"
    :class="[
      size === 'lg' ? 'h-14 w-14' : 'h-11 w-11',
      tone === 'brand' && 'bg-brand-600 text-white',
      tone === 'ink' && 'border-2 border-white/10 bg-ink-900 text-brand-400',
      tone === 'white' && 'border-2 border-white/20 bg-white/5 text-white',
    ]"
  >
    <AppIcon :name="icon" :stroke-width="2" :class="size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'" />
  </div>
</template>
