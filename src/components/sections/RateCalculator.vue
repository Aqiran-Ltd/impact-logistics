<script setup lang="ts">
import { computed } from 'vue'
import { getRateConfig } from '@/services/rates.service'
import { useAsyncData } from '@/composables/useAsyncData'
import { useRateEstimate } from '@/composables/useRateEstimate'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })

const { data: config } = useAsyncData(getRateConfig)
const { trays, bins, serviceTierId, distanceTierId, serviceTier, distanceTier, estimate } =
  useRateEstimate(config)

const formattedTotal = computed(() => {
  if (!estimate.value || !config.value) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: config.value.currency,
    maximumFractionDigits: 0,
  }).format(estimate.value.total)
})

function step(target: 'trays' | 'bins', delta: number) {
  const ref = target === 'trays' ? trays : bins
  ref.value = Math.max(0, ref.value + delta)
}
</script>

<template>
  <section class="mx-auto max-w-7xl px-6 py-24 lg:px-8">
    <SectionHeading
      eyebrow="Rate Estimator"
      title="See what your route would cost, right now."
      subtitle="A live estimate based on quantity, service speed, and distance — the same inputs dispatch uses to build a quote."
      :align="compact ? 'center' : 'left'"
    />

    <div
      class="mt-12 grid gap-8"
      :class="compact ? '' : 'lg:grid-cols-[1.3fr_1fr] lg:items-start'"
    >
      <div class="rounded-lg border-2 border-ink-900 p-6 sm:p-8">
        <div class="grid gap-6 sm:grid-cols-2">
          <div>
            <p class="font-mono text-xs font-semibold tracking-wide text-ink-400 uppercase">
              Trays
            </p>
            <div class="mt-2 flex items-center gap-3">
              <button
                type="button"
                aria-label="Decrease trays"
                class="flex h-9 w-9 items-center justify-center rounded-md border-2 border-ink-200 text-ink-700 transition-colors hover:border-ink-900"
                @click="step('trays', -1)"
              >
                −
              </button>
              <span class="w-10 text-center font-mono text-lg font-semibold text-ink-900">
                {{ trays }}
              </span>
              <button
                type="button"
                aria-label="Increase trays"
                class="flex h-9 w-9 items-center justify-center rounded-md border-2 border-ink-200 text-ink-700 transition-colors hover:border-ink-900"
                @click="step('trays', 1)"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <p class="font-mono text-xs font-semibold tracking-wide text-ink-400 uppercase">
              Bins
            </p>
            <div class="mt-2 flex items-center gap-3">
              <button
                type="button"
                aria-label="Decrease bins"
                class="flex h-9 w-9 items-center justify-center rounded-md border-2 border-ink-200 text-ink-700 transition-colors hover:border-ink-900"
                @click="step('bins', -1)"
              >
                −
              </button>
              <span class="w-10 text-center font-mono text-lg font-semibold text-ink-900">
                {{ bins }}
              </span>
              <button
                type="button"
                aria-label="Increase bins"
                class="flex h-9 w-9 items-center justify-center rounded-md border-2 border-ink-200 text-ink-700 transition-colors hover:border-ink-900"
                @click="step('bins', 1)"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6">
          <p class="font-mono text-xs font-semibold tracking-wide text-ink-400 uppercase">
            Service Speed
          </p>
          <div class="mt-2 grid grid-cols-3 gap-2">
            <button
              v-for="tier in config?.serviceTiers"
              :key="tier.id"
              type="button"
              class="rounded-md border-2 px-2 py-2 text-center text-xs font-semibold transition-colors sm:text-sm"
              :class="
                serviceTierId === tier.id
                  ? 'border-ink-900 bg-ink-900 text-white'
                  : 'border-ink-200 text-ink-600 hover:border-ink-400'
              "
              @click="serviceTierId = tier.id"
            >
              {{ tier.label }}
            </button>
          </div>
        </div>

        <div class="mt-6">
          <p class="font-mono text-xs font-semibold tracking-wide text-ink-400 uppercase">
            Distance
          </p>
          <div class="mt-2 grid grid-cols-3 gap-2">
            <button
              v-for="tier in config?.distanceTiers"
              :key="tier.id"
              type="button"
              class="rounded-md border-2 px-2 py-2 text-center text-xs font-semibold transition-colors sm:text-sm"
              :class="
                distanceTierId === tier.id
                  ? 'border-ink-900 bg-ink-900 text-white'
                  : 'border-ink-200 text-ink-600 hover:border-ink-400'
              "
              @click="distanceTierId = tier.id"
            >
              {{ tier.label }}
            </button>
          </div>
        </div>

        <div v-if="!compact" class="mt-6 border-t-2 border-dashed border-ink-200 pt-6">
          <dl class="space-y-2 font-mono text-sm">
            <div class="flex justify-between">
              <dt class="text-ink-400">Base ({{ trays }} trays · {{ bins }} bins)</dt>
              <dd class="text-ink-700">
                {{
                  estimate
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                        estimate.base,
                      )
                    : '—'
                }}
              </dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-ink-400">Service speed</dt>
              <dd class="text-ink-700">{{ serviceTier?.label }} · ×{{ serviceTier?.multiplier }}</dd>
            </div>
            <div class="flex justify-between">
              <dt class="text-ink-400">Distance</dt>
              <dd class="text-ink-700">{{ distanceTier?.label }} · ×{{ distanceTier?.multiplier }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        class="flex flex-col justify-between rounded-lg border-2 border-ink-900 bg-ink-950 p-6 sm:p-8"
      >
        <div>
          <p class="font-mono text-xs font-semibold tracking-wide text-brand-400 uppercase">
            Estimated Rate
          </p>
          <p class="mt-3 font-mono text-4xl font-bold text-white sm:text-5xl">
            {{ formattedTotal }}
          </p>
          <p class="mt-2 text-sm text-ink-300">
            Per route · {{ serviceTier?.label }} · {{ distanceTier?.label }}
          </p>
          <p class="mt-4 text-xs text-ink-400">
            Estimate only. Final pricing is confirmed during onboarding and may vary with
            facility-specific route design.
          </p>
        </div>

        <BaseButton
          v-if="!compact"
          to="/contact"
          size="lg"
          class="mt-8 bg-brand-500! hover:bg-brand-400!"
        >
          Request This Rate
          <AppIcon name="ArrowRight" class="h-4 w-4" />
        </BaseButton>
        <BaseButton
          v-else
          to="/pricing"
          variant="secondary"
          class="mt-8 border-white/30! text-white! hover:border-white! hover:bg-white! hover:text-ink-900!"
        >
          See Full Pricing Breakdown
          <AppIcon name="ArrowRight" class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>
  </section>
</template>
