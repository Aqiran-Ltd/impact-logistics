<script setup lang="ts">
import { getPlatformSections } from '@/services/platform.service'
import { useAsyncData } from '@/composables/useAsyncData'
import PageIntro from '@/components/sections/PageIntro.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import PhoneMockup from '@/components/ui/PhoneMockup.vue'
import { platformHeroImage, heroDeliveryImage } from '@/data/stockImages'

const { data: sections } = useAsyncData(getPlatformSections)
</script>

<template>
  <div>
    <PageIntro
      eyebrow="Platform"
      title="Purpose-built software for tray and bin movement."
      subtitle="Not a repurposed delivery app — a driver app and rep portal designed around one job: verified custody, at every handoff."
      :image="platformHeroImage"
    />

    <section
      v-for="(section, index) in sections"
      :key="section.id"
      class="mx-auto max-w-7xl px-6 py-20 lg:px-8"
    >
      <div
        class="grid items-center gap-16 lg:grid-cols-2"
        :class="index % 2 === 1 && 'lg:[&>*:first-child]:order-2'"
      >
        <div>
          <SectionHeading :eyebrow="section.title" :title="section.tagline" />
          <ul class="mt-8 space-y-6">
            <li v-for="feature in section.features" :key="feature.title" class="flex gap-4">
              <IconBadge :icon="feature.icon" />
              <div>
                <p class="font-bold text-ink-900">{{ feature.title }}</p>
                <p class="mt-1 text-sm text-ink-500">{{ feature.description }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <PhoneMockup v-if="section.id === 'driver-app'" label="Driver App — Pickup">
            <div class="space-y-4 px-4 pb-6">
              <p class="pt-2 font-mono text-xs font-semibold tracking-wide text-ink-400 uppercase">
                New Pickup
              </p>
              <div class="space-y-1">
                <p class="text-[11px] text-ink-400">Facility</p>
                <p
                  class="rounded-md border-2 border-ink-100 px-3 py-2 text-sm font-bold text-ink-900"
                >
                  Riverside Surgical Center
                </p>
              </div>
              <div class="space-y-1">
                <p class="text-[11px] text-ink-400">Team</p>
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="team in ['Ortho', 'Cardio', 'GI', 'Lab']"
                    :key="team"
                    class="rounded-sm px-2.5 py-1 font-mono text-[11px] font-medium uppercase"
                    :class="team === 'Ortho' ? 'bg-brand-600 text-white' : 'bg-ink-50 text-ink-500'"
                  >
                    {{ team }}
                  </span>
                </div>
              </div>
              <div class="space-y-1">
                <p class="text-[11px] text-ink-400">Quantity</p>
                <div class="flex gap-2">
                  <span class="rounded-md bg-ink-50 px-3 py-2 font-mono text-xs font-medium text-ink-700"
                    >3 Trays</span
                  >
                  <span class="rounded-md bg-ink-50 px-3 py-2 font-mono text-xs font-medium text-ink-700"
                    >1 Bin</span
                  >
                </div>
              </div>
              <div
                class="flex items-center justify-center gap-2 rounded-md bg-ink-900 py-3 text-xs font-semibold tracking-wide text-white uppercase"
              >
                <AppIcon name="Camera" class="h-4 w-4" />
                Capture Pickup Photo
              </div>
            </div>
          </PhoneMockup>

          <PhoneMockup v-else label="Rep Portal — Item Detail">
            <div class="space-y-3 px-4 pb-6">
              <p class="pt-2 font-mono text-xs font-semibold tracking-wide text-ink-400 uppercase">
                ROUTE-12 · TRAY #482
              </p>
              <img
                :src="heroDeliveryImage.src"
                :alt="heroDeliveryImage.alt"
                class="aspect-video w-full rounded-md object-cover grayscale"
                loading="lazy"
              />
              <div class="flex items-center justify-between font-mono text-xs">
                <span class="font-bold text-ink-900 uppercase">Delivered</span>
                <span class="text-ink-400">06:58:00</span>
              </div>
              <div
                class="rounded-sm border border-brand-600 bg-brand-50 px-3 py-2.5 text-center font-mono text-xs font-semibold tracking-wide text-brand-700 uppercase"
              >
                Ready for Office Pickup
              </div>
            </div>
          </PhoneMockup>
        </div>
      </div>
    </section>

    <div class="bg-ink-50/60 py-16">
      <div class="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <SectionHeading
          eyebrow="Backed by the Compliance Standard"
          title="Every feature above feeds one chain-of-custody record."
          align="center"
        />
        <BaseButton to="/compliance" variant="secondary" size="lg" class="mt-8">
          See how compliance reporting works
          <AppIcon name="ArrowRight" class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>

    <CtaBanner
      title="See the platform on your own routes."
      subtitle="We'll walk your team through the driver app and rep portal before you commit to anything."
    />
  </div>
</template>
