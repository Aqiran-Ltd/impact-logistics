<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
  }>(),
  {
    title: 'Ready to simplify your chain of custody?',
    subtitle:
      'Tell us about your facility and route needs — most new accounts are onboarded within two to three weeks.',
  },
)
</script>

<template>
  <section class="relative overflow-hidden bg-ink-900">
    <div class="bg-plus-grid absolute inset-0 opacity-[0.08]" />
    <div class="relative mx-auto max-w-4xl px-6 py-20 text-center lg:px-8">
      <h2 class="font-display text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
        {{ title }}
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-pretty text-ink-300">{{ subtitle }}</p>
      <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
        <BaseButton
          to="/contact"
          size="lg"
          variant="primary"
          class="bg-brand-500! hover:bg-brand-400!"
        >
          Request a Quote
          <AppIcon name="ArrowRight" class="h-4 w-4" />
        </BaseButton>
        <BaseButton
          to="/about"
          variant="secondary"
          size="lg"
          class="border-white/30! bg-transparent! text-white! hover:border-white! hover:bg-white! hover:text-ink-900!"
        >
          Learn About Us
        </BaseButton>
      </div>
    </div>
  </section>
</template>
