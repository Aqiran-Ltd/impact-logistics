<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getCompanyInfo } from '@/services/company.service'
import { submitContactForm } from '@/services/contact.service'
import { useAsyncData } from '@/composables/useAsyncData'
import type { ContactFormPayload, ContactSubmissionResult } from '@/models/content'
import PageIntro from '@/components/sections/PageIntro.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { contactHeroImage } from '@/data/stockImages'

const { data: company } = useAsyncData(getCompanyInfo)

const form = reactive<ContactFormPayload>({
  name: '',
  organization: '',
  email: '',
  phone: '',
  serviceInterest: 'Surgical Tray & Bin Transport',
  message: '',
})

const serviceOptions = [
  'Surgical Tray & Bin Transport',
  'Chain-of-Custody Documentation',
  'STAT & Emergency Courier',
  'Facility Onboarding',
  'Something else',
]

const status = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const result = ref<ContactSubmissionResult | null>(null)
const errorMessage = ref('')

async function handleSubmit() {
  status.value = 'submitting'
  errorMessage.value = ''
  try {
    result.value = await submitContactForm({ ...form })
    status.value = 'success'
  } catch (err) {
    errorMessage.value =
      err instanceof Error ? err.message : 'Something went wrong. Please try again.'
    status.value = 'error'
  }
}
</script>

<template>
  <div>
    <PageIntro
      eyebrow="Contact"
      title="Tell us about your routes. We'll take it from there."
      subtitle="Whether you're evaluating a single facility or a multi-state rollout, dispatch and onboarding are ready when you are."
      :image="contactHeroImage"
    />

    <section class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div class="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
        <div class="rounded-lg border-2 border-ink-900 p-8">
          <div v-if="status === 'success' && result">
            <div class="flex items-center gap-3">
              <span
                class="flex h-11 w-11 items-center justify-center rounded-md border-2 border-brand-600 bg-brand-50 text-brand-700"
              >
                <AppIcon name="CheckCircle2" class="h-5 w-5" />
              </span>
              <div>
                <p class="font-bold text-ink-900">Request received.</p>
                <p class="font-mono text-sm text-ink-500">REF {{ result.referenceId }}</p>
              </div>
            </div>
            <p class="mt-4 text-sm text-ink-500">
              Someone from our onboarding team will follow up within one business day.
            </p>
          </div>

          <form v-else class="space-y-5" @submit.prevent="handleSubmit">
            <div class="grid gap-5 sm:grid-cols-2">
              <label class="block">
                <span class="text-sm font-medium text-ink-700">Full name</span>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="mt-1.5 w-full rounded-md border-2 border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500"
                />
              </label>
              <label class="block">
                <span class="text-sm font-medium text-ink-700">Facility / organization</span>
                <input
                  v-model="form.organization"
                  type="text"
                  class="mt-1.5 w-full rounded-md border-2 border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500"
                />
              </label>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <label class="block">
                <span class="text-sm font-medium text-ink-700">Email</span>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="mt-1.5 w-full rounded-md border-2 border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500"
                />
              </label>
              <label class="block">
                <span class="text-sm font-medium text-ink-700">Phone</span>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="mt-1.5 w-full rounded-md border-2 border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500"
                />
              </label>
            </div>

            <label class="block">
              <span class="text-sm font-medium text-ink-700">What do you need?</span>
              <select
                v-model="form.serviceInterest"
                class="mt-1.5 w-full rounded-md border-2 border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500"
              >
                <option v-for="option in serviceOptions" :key="option" :value="option">
                  {{ option }}
                </option>
              </select>
            </label>

            <label class="block">
              <span class="text-sm font-medium text-ink-700">Message</span>
              <textarea
                v-model="form.message"
                required
                rows="4"
                class="mt-1.5 w-full rounded-md border-2 border-ink-200 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500"
              />
            </label>

            <p v-if="status === 'error'" class="text-sm text-red-600">{{ errorMessage }}</p>

            <BaseButton type="submit" size="lg" class="w-full sm:w-auto">
              {{ status === 'submitting' ? 'Sending…' : 'Send Request' }}
            </BaseButton>
          </form>
        </div>

        <div v-if="company" class="space-y-8">
          <div>
            <h3 class="font-mono text-xs font-semibold tracking-widest text-ink-400 uppercase">Headquarters</h3>
            <p class="mt-3 text-ink-700">
              {{ company.hqAddress.line1 }}<br />
              {{ company.hqAddress.city }}, {{ company.hqAddress.state }}
              {{ company.hqAddress.zip }}
            </p>
          </div>
          <div>
            <h3 class="font-mono text-xs font-semibold tracking-widest text-ink-400 uppercase">Dispatch</h3>
            <p class="mt-3 text-ink-700">{{ company.phone }}</p>
            <p class="text-sm text-ink-500">{{ company.supportHours }}</p>
          </div>
          <div>
            <h3 class="font-mono text-xs font-semibold tracking-widest text-ink-400 uppercase">Email</h3>
            <a :href="`mailto:${company.email}`" class="mt-3 block text-brand-700 hover:underline">
              {{ company.email }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
