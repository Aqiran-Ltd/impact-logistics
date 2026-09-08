<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import type { Faq } from '@/models/content'

defineProps<{ faq: Faq }>()

const isOpen = ref(false)
</script>

<template>
  <div class="border-b-2 border-dashed border-ink-200 py-5">
    <button
      type="button"
      class="flex w-full items-center justify-between gap-4 text-left"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <span class="font-bold text-ink-900">{{ faq.question }}</span>
      <AppIcon
        name="ChevronDown"
        class="h-5 w-5 shrink-0 text-ink-400 transition-transform duration-300"
        :class="isOpen && 'rotate-180 text-brand-600'"
      />
    </button>
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-200 ease-in"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-40 opacity-100"
      leave-from-class="max-h-40 opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <p v-if="isOpen" class="mt-3 overflow-hidden pr-8 text-ink-500">
        {{ faq.answer }}
      </p>
    </Transition>
  </div>
</template>
