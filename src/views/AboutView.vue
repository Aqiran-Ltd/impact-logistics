<script setup lang="ts">
import { getTeamMembers, getMilestones } from '@/services/team.service'
import { getCoverageRegions } from '@/services/coverage.service'
import { useAsyncData } from '@/composables/useAsyncData'
import PageIntro from '@/components/sections/PageIntro.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { aboutHeroImage } from '@/data/stockImages'

const { data: team } = useAsyncData(getTeamMembers)
const { data: milestones } = useAsyncData(getMilestones)
const { data: regions } = useAsyncData(getCoverageRegions)

const values = [
  {
    icon: 'BadgeCheck',
    title: 'Precision',
    description:
      'Every quantity, timestamp, and photo logged exactly as it happened — nothing reconstructed later.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Accountability',
    description:
      'Every action in the system is tied to a named driver. No anonymous handoffs, ever.',
  },
  {
    icon: 'Route',
    title: 'Speed',
    description:
      'Routes are built and adjusted in real time, so a rush request never waits on a phone tree.',
  },
  {
    icon: 'Lock',
    title: 'Trust',
    description:
      'Facilities and compliance teams get the same record — no gap between what a rep sees and what happened.',
  },
]
</script>

<template>
  <div>
    <PageIntro
      eyebrow="About"
      title="Built by people who got tired of chasing paper trails."
      subtitle="Impact Medical Logistics started as a two-van courier service and grew into a nationwide network — without ever loosening the standard for what counts as proof."
      :image="aboutHeroImage"
    />

    <section class="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
      <p class="font-display text-2xl leading-relaxed text-pretty text-ink-800">
        We move surgical trays and bins for a living, which means we deal in the one thing hospitals
        can't compromise on: knowing exactly where an instrument set is, who touched it, and when.
      </p>
    </section>

    <section class="bg-ink-50/60 py-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Value"
          title="The standard behind every route."
          align="center"
        />
        <div class="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="value in values" :key="value.title" class="text-center">
            <IconBadge :icon="value.icon" class="mx-auto" />
            <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ value.title }}</h3>
            <p class="mt-2 text-sm text-ink-500">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="Our Story"
        title="From two vans to a nationwide network."
        align="center"
      />
      <div class="mt-14 space-y-10">
        <div v-for="(milestone, index) in milestones" :key="milestone.id" class="flex gap-6">
          <div class="flex flex-col items-center">
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-ink-900 font-mono text-sm font-semibold text-brand-400"
            >
              {{ milestone.year }}
            </span>
            <span
              v-if="index < milestones!.length - 1"
              class="mt-2 w-0 flex-1 border-l-2 border-dashed border-ink-200"
            />
          </div>
          <div class="pb-2">
            <h3 class="font-bold text-ink-900">{{ milestone.title }}</h3>
            <p class="mt-1 text-sm text-ink-500">{{ milestone.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-ink-50/60 py-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Leadership"
          title="The team keeping every route accountable."
          align="center"
        />
        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <BaseCard v-for="member in team" :key="member.id">
            <span
              class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
            >
              {{ member.initials }}
            </span>
            <h3 class="mt-4 font-bold text-ink-900">{{ member.name }}</h3>
            <p class="text-xs font-medium text-brand-600">{{ member.role }}</p>
            <p class="mt-2 text-sm text-ink-500">{{ member.bio }}</p>
          </BaseCard>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="Coverage"
        title="Regional hubs, one national standard."
        subtitle="Coverage across 36 states, coordinated through five regional dispatch hubs."
        align="center"
      />
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="region in regions" :key="region.id" class="rounded-lg border-2 border-ink-100 p-6">
          <div class="flex items-center justify-between">
            <h3 class="font-display text-lg font-bold text-ink-900">{{ region.region }}</h3>
            <AppIcon name="MapPin" class="h-4 w-4 text-brand-600" />
          </div>
          <p class="mt-1 font-mono text-xs font-medium text-ink-400 uppercase">
            Hub // {{ region.dispatchHub }}
          </p>
          <p class="mt-3 text-sm text-ink-500">{{ region.description }}</p>
          <div class="mt-4 flex flex-wrap gap-1.5">
            <span
              v-for="state in region.states"
              :key="state"
              class="rounded-sm border border-ink-200 px-2 py-1 font-mono text-[11px] font-medium text-ink-500"
            >
              {{ state }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <CtaBanner />
  </div>
</template>
