<script setup lang="ts">
import { computed } from 'vue'
import { getCompanyInfo } from '@/services/company.service'
import { useAsyncData } from '@/composables/useAsyncData'
import AppIcon from '@/components/ui/AppIcon.vue'

const { data: company } = useAsyncData(getCompanyInfo)

const year = new Date().getFullYear()

const columns = [
  {
    heading: 'Company',
    links: [
      { to: '/about', label: 'About' },
      { to: '/compliance', label: 'Compliance' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    heading: 'What We Do',
    links: [
      { to: '/services', label: 'Services' },
      { to: '/pricing', label: 'Pricing' },
      { to: '/platform', label: 'Platform' },
      { to: '/contact', label: 'Request a Quote' },
    ],
  },
]

const fullAddress = computed(() => {
  if (!company.value) return ''
  const { hqAddress } = company.value
  return `${hqAddress.line1}, ${hqAddress.city}, ${hqAddress.state} ${hqAddress.zip}`
})
</script>

<template>
  <footer class="border-t border-ink-100 bg-ink-950 text-ink-300">
    <div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1.4fr]">
        <div>
          <RouterLink to="/" class="flex items-center gap-2.5">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-md border-2 border-brand-500/30 bg-brand-500/10 font-mono text-sm font-semibold text-brand-400"
            >
              IM
            </span>
            <span class="font-display text-base font-extrabold tracking-tight text-white">
              Impact Medical Logistics
            </span>
          </RouterLink>
          <p class="mt-4 max-w-sm text-sm text-ink-400">
            Photo-verified, chain-of-custody courier services for hospitals and surgery centers
            across the United States.
          </p>
        </div>

        <div v-for="column in columns" :key="column.heading">
          <h3 class="font-mono text-xs font-semibold tracking-widest text-brand-400 uppercase">{{ column.heading }}</h3>
          <ul class="mt-4 space-y-3">
            <li v-for="link in column.links" :key="link.to">
              <RouterLink :to="link.to" class="text-sm text-ink-400 hover:text-brand-400">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div v-if="company">
          <h3 class="font-mono text-xs font-semibold tracking-widest text-brand-400 uppercase">Get in Touch</h3>
          <ul class="mt-4 space-y-3 text-sm text-ink-400">
            <li class="flex items-start gap-2.5">
              <AppIcon name="MapPin" class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>{{ fullAddress }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <AppIcon name="Phone" class="h-4 w-4 shrink-0 text-brand-400" />
              <a :href="`tel:${company.phone}`" class="hover:text-brand-400">{{ company.phone }}</a>
            </li>
            <li class="flex items-center gap-2.5">
              <AppIcon name="Mail" class="h-4 w-4 shrink-0 text-brand-400" />
              <a :href="`mailto:${company.email}`" class="hover:text-brand-400">{{
                company.email
              }}</a>
            </li>
            <li class="flex items-start gap-2.5">
              <AppIcon name="Clock" class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              <span>{{ company.supportHours }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>&copy; {{ year }} Impact Medical Logistics, Inc. All rights reserved.</p>
        <p>Made for hospitals, surgery centers, and the teams who keep them running.</p>
      </div>
    </div>
  </footer>
</template>
