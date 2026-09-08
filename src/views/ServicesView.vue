<script setup lang="ts">
import { getServices } from '@/services/services.service'
import { useAsyncData } from '@/composables/useAsyncData'
import PageIntro from '@/components/sections/PageIntro.vue'
import ProcessSteps from '@/components/sections/ProcessSteps.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { servicesHeroImage } from '@/data/stockImages'

const { data: services } = useAsyncData(getServices)
</script>

<template>
  <div>
    <PageIntro
      eyebrow="Services"
      title="One courier standard, from a single OR to a multi-state network."
      subtitle="Every service below runs on the same chain-of-custody standard: logged, photographed, and timestamped at every handoff."
      :image="servicesHeroImage"
    />

    <section class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <BaseCard v-for="(service, index) in services" :key="service.id" hoverable>
          <div class="flex items-start justify-between">
            <IconBadge :icon="service.icon" size="lg" />
            <span class="font-mono text-xs text-ink-300">SVC-{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <h3 class="mt-5 font-display text-lg font-bold text-ink-900">{{ service.title }}</h3>
          <p class="mt-2 text-sm text-ink-500">{{ service.summary }}</p>
          <ul class="mt-4 space-y-2">
            <li
              v-for="feature in service.features"
              :key="feature"
              class="flex items-start gap-2 text-sm text-ink-600"
            >
              <AppIcon name="CheckCircle2" class="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </BaseCard>
      </div>
    </section>

    <div class="bg-ink-50/60">
      <ProcessSteps
        eyebrow="Every Route, Every Time"
        title="The same verified sequence, at any scale."
        subtitle="Whether it's a single tray or a full case cart, the process behind it doesn't change."
      />
    </div>

    <CtaBanner
      title="Don't see exactly what you need?"
      subtitle="Tell us about your facility's volume and route pattern — most service plans are custom-built around it."
    />
  </div>
</template>
