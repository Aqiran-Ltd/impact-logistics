<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
</script>

<template>
  <div class="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
    <p class="font-mono text-6xl font-bold text-ink-900">404</p>
    <h1 class="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink-900">
      Route not found.
    </h1>
    <p class="mt-3 text-ink-500">
      This page took a wrong turn somewhere between pickup and delivery.
    </p>
    <BaseButton to="/" size="lg" class="mt-8">
      Back to Home
      <AppIcon name="ArrowRight" class="h-4 w-4" />
    </BaseButton>
  </div>
</template>
