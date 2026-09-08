<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import CornerMarks from '@/components/ui/CornerMarks.vue'
import { heroDeliveryImage } from '@/data/stockImages'

const trustBadges = [
  'Level I Trauma Centers',
  'Ambulatory Surgery Centers',
  'Regional Hospital Networks',
  'Specialty Surgical Groups',
]
</script>

<template>
  <section class="relative overflow-hidden bg-white">
    <div class="relative mx-auto max-w-7xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:px-8">
      <CornerMarks class="hidden lg:block" />

      <div class="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <BaseBadge tone="brand">Nationwide Medical Courier Network</BaseBadge>

          <h1
            class="mt-6 font-display text-4xl leading-[1.05] font-black tracking-tight text-balance text-ink-900 sm:text-5xl lg:text-6xl"
          >
            Every tray. Every timestamp.
            <span class="text-brand-600">Every mile, verified.</span>
          </h1>

          <p class="mt-6 max-w-xl text-lg text-pretty text-ink-500">
            Impact Medical Logistics moves surgical trays and bins between hospitals and surgery
            centers across the country — photo-verified at pickup, photo-verified at delivery, with
            a chain-of-custody record your compliance team never has to chase.
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-4">
            <BaseButton to="/contact" size="lg">
              Request a Quote
              <AppIcon name="ArrowRight" class="h-4 w-4" />
            </BaseButton>
            <BaseButton to="/platform" variant="secondary" size="lg"
              >Explore the Platform</BaseButton
            >
          </div>

          <div class="mt-10">
            <p class="font-mono text-xs tracking-wide text-ink-400 uppercase">
              Trusted across the surgical supply chain
            </p>
            <div class="mt-3 flex flex-wrap gap-2">
              <BaseBadge v-for="badge in trustBadges" :key="badge">{{ badge }}</BaseBadge>
            </div>
          </div>
        </div>

        <div class="relative hidden lg:block">
          <svg
            class="pointer-events-none absolute -top-10 -left-10 h-[120%] w-[120%] text-ink-200"
            viewBox="0 0 400 400"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 340 L140 340 L180 220 L320 220 L340 60"
              stroke="currentColor"
              stroke-width="2"
              stroke-dasharray="2 8"
              stroke-linecap="round"
            />
            <circle cx="20" cy="340" r="4" fill="currentColor" />
            <circle cx="180" cy="220" r="4" fill="currentColor" />
            <circle cx="340" cy="60" r="4" class="fill-brand-500" />
          </svg>

          <div
            class="relative mx-auto w-full max-w-sm rotate-2 rounded-lg border-2 border-ink-900 bg-white p-5"
          >
            <div class="flex items-center justify-between">
              <p class="font-mono text-xs tracking-wide text-ink-400 uppercase">
                Delivery Record
              </p>
              <span
                class="inline-flex items-center gap-1 rounded-sm border border-brand-600 bg-brand-50 px-2 py-1 font-mono text-[11px] font-semibold tracking-wide text-brand-700 uppercase"
              >
                <AppIcon name="CheckCircle2" class="h-3.5 w-3.5" />
                Verified
              </span>
            </div>
            <div class="mt-4 border-t-2 border-dashed border-ink-200 pt-4">
              <img
                :src="heroDeliveryImage.src"
                :alt="heroDeliveryImage.alt"
                class="aspect-video w-full rounded-md object-cover grayscale"
                loading="lazy"
              />
            </div>
            <dl class="mt-4 space-y-2.5 border-t-2 border-dashed border-ink-200 pt-4 font-mono text-sm">
              <div class="flex justify-between">
                <dt class="text-ink-400">Facility</dt>
                <dd class="font-medium text-ink-900">Riverside Surgical Center</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-ink-400">Team</dt>
                <dd class="font-medium text-ink-900">Ortho</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-ink-400">Quantity</dt>
                <dd class="font-medium text-ink-900">3 Trays · 1 Bin</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-ink-400">Timestamp</dt>
                <dd class="font-medium text-ink-900">06:42:00</dd>
              </div>
            </dl>
          </div>

          <div
            class="absolute -bottom-6 -left-6 -rotate-3 rounded-md border-2 border-ink-900 bg-white px-4 py-3"
          >
            <p class="flex items-center gap-2 font-mono text-sm font-medium text-ink-900">
              <AppIcon name="Route" class="h-4 w-4 text-brand-600" />
              ROUTE-12 · ON TIME
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
