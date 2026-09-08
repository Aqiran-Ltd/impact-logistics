<script setup lang="ts">
import { getComplianceItems, getComplianceReportTypes } from '@/services/compliance.service'
import { useAsyncData } from '@/composables/useAsyncData'
import PageIntro from '@/components/sections/PageIntro.vue'
import CtaBanner from '@/components/sections/CtaBanner.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import IconBadge from '@/components/ui/IconBadge.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { complianceHeroImage } from '@/data/stockImages'

const { data: items } = useAsyncData(getComplianceItems)
const { data: reportTypes } = useAsyncData(getComplianceReportTypes)

const auditTrail = [
  {
    time: '6:42 AM',
    event: 'Pickup',
    facility: 'Riverside Surgical Center',
    driver: 'D. Okafor',
    photo: true,
  },
  { time: '7:15 AM', event: 'In Transit', facility: 'Route 12', driver: 'D. Okafor', photo: false },
  {
    time: '7:58 AM',
    event: 'Delivery',
    facility: 'Northside Surgical',
    driver: 'D. Okafor',
    photo: true,
  },
  {
    time: '2:30 PM',
    event: 'Office Pickup Requested',
    facility: 'Northside Surgical',
    driver: '—',
    photo: false,
  },
  {
    time: '3:12 PM',
    event: 'Office Return',
    facility: 'Impact HQ',
    driver: 'J. Ramirez',
    photo: true,
  },
]
</script>

<template>
  <div>
    <PageIntro
      eyebrow="Compliance"
      title="An audit trail your compliance team doesn't have to build themselves."
      subtitle="Chain-of-custody, photo proof, and incident tracking are logged automatically — not reconstructed after the fact."
      :image="complianceHeroImage"
    />

    <section class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in items" :key="item.id">
          <IconBadge :icon="item.icon" />
          <h3 class="mt-4 font-display text-base font-bold text-ink-900">{{ item.title }}</h3>
          <p class="mt-2 text-sm text-ink-500">{{ item.description }}</p>
        </div>
      </div>
    </section>

    <section class="bg-ink-50/60 py-20">
      <div class="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sample Record"
          title="One tray, fully traced."
          subtitle="A simplified look at the audit trail generated automatically for a single tray, from pickup to office return."
        />

        <div class="mt-10 overflow-x-auto rounded-lg border-2 border-ink-900 bg-white">
          <table class="w-full min-w-140 text-left text-sm">
            <thead>
              <tr class="border-b-2 border-ink-900 font-mono text-xs tracking-wide text-ink-400 uppercase">
                <th class="px-5 py-3 font-medium">Time</th>
                <th class="px-5 py-3 font-medium">Event</th>
                <th class="px-5 py-3 font-medium">Facility</th>
                <th class="px-5 py-3 font-medium">Driver</th>
                <th class="px-5 py-3 font-medium">Photo</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in auditTrail"
                :key="row.time"
                class="border-b border-dashed border-ink-200 last:border-0"
              >
                <td class="px-5 py-3.5 font-mono text-ink-500">{{ row.time }}</td>
                <td class="px-5 py-3.5 font-bold text-ink-900">{{ row.event }}</td>
                <td class="px-5 py-3.5 text-ink-600">{{ row.facility }}</td>
                <td class="px-5 py-3.5 font-mono text-ink-600">{{ row.driver }}</td>
                <td class="px-5 py-3.5">
                  <AppIcon v-if="row.photo" name="Camera" class="h-4 w-4 text-brand-600" />
                  <span v-else class="text-ink-300">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <SectionHeading
        eyebrow="On-Demand Reporting"
        title="Reports built for your next audit, not just your next meeting."
        align="center"
      />
      <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <BaseCard v-for="report in reportTypes" :key="report.id">
          <h3 class="font-bold text-ink-900">{{ report.title }}</h3>
          <p class="mt-2 text-sm text-ink-500">{{ report.description }}</p>
        </BaseCard>
      </div>
    </section>

    <CtaBanner
      title="Ready to hand your auditors a straight answer?"
      subtitle="Ask us for a sample compliance report for your facility type before you commit to anything."
    />
  </div>
</template>
