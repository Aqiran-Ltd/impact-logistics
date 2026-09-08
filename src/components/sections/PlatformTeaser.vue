<script setup lang="ts">
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import PhoneMockup from '@/components/ui/PhoneMockup.vue'

const highlights = [
  {
    icon: 'Activity',
    title: 'Live status board',
    description: 'Pickup and delivery status for every route, updated the moment a driver acts.',
  },
  {
    icon: 'ImagePlus',
    title: 'Photo-verified proof',
    description:
      'Every handoff carries a timestamped photo — no more taking a driver’s word for it.',
  },
  {
    icon: 'Hand',
    title: 'One-tap office pickup',
    description:
      'Reps request pickup the moment items are ready. Dispatch and drivers get it instantly.',
  },
]

const statusRows = [
  { facility: 'Northside Surgical', status: 'Delivered' },
  { facility: 'Metro General', status: 'In Transit' },
  { facility: 'Cedar Point ASC', status: 'Picked Up' },
]
</script>

<template>
  <section class="bg-ink-950">
    <div class="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Our Platform"
            title="The driver app and rep portal behind every route."
            subtitle="What makes our chain-of-custody standard possible: software built specifically for tray and bin movement, not a repurposed delivery app."
            tone="dark"
          />

          <ul class="mt-10 space-y-6">
            <li v-for="item in highlights" :key="item.title" class="flex gap-4">
              <span
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-white/10 bg-white/5 text-brand-400"
              >
                <AppIcon :name="item.icon" class="h-5 w-5" />
              </span>
              <div>
                <p class="font-bold text-white">{{ item.title }}</p>
                <p class="mt-1 text-sm text-ink-300">{{ item.description }}</p>
              </div>
            </li>
          </ul>

          <BaseButton
            to="/platform"
            variant="secondary"
            size="lg"
            class="mt-10 border-white/30! text-white! hover:border-white! hover:bg-white! hover:text-ink-900!"
          >
            See the full platform
            <AppIcon name="ArrowRight" class="h-4 w-4" />
          </BaseButton>
        </div>

        <div class="hidden lg:block">
          <PhoneMockup label="Rep Portal — Live Status Board">
            <div class="space-y-3 px-4 pb-6">
              <p class="pt-2 text-xs font-semibold tracking-wide text-ink-400 uppercase">Today</p>
              <div
                v-for="row in statusRows"
                :key="row.facility"
                class="rounded-md border-2 border-ink-100 p-3"
              >
                <div class="flex items-center justify-between">
                  <p class="text-sm font-bold text-ink-900">{{ row.facility }}</p>
                  <span
                    class="rounded-sm px-2 py-0.5 font-mono text-[11px] font-medium uppercase"
                    :class="
                      row.status === 'Delivered'
                        ? 'bg-brand-50 text-brand-700'
                        : 'bg-ink-100 text-ink-600'
                    "
                  >
                    {{ row.status }}
                  </span>
                </div>
                <div class="mt-2 aspect-[4/1.4] rounded-md bg-dot-grid bg-ink-50" />
              </div>
            </div>
          </PhoneMockup>
        </div>
      </div>
    </div>
  </section>
</template>
