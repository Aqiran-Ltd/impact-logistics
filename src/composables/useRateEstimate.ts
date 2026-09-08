import { computed, ref, type Ref } from 'vue'
import type { RateConfig } from '@/models/content'

export interface RateEstimate {
  base: number
  total: number
}

/**
 * Client-side mock pricing engine: trays/bins * base rate, scaled by service-speed
 * and distance multipliers, floored at a minimum charge. Swap this for a real
 * quote from the backend later — the calling component only reads `estimate`.
 */
export function useRateEstimate(config: Ref<RateConfig | null>) {
  const trays = ref(3)
  const bins = ref(1)
  const serviceTierId = ref('standard')
  const distanceTierId = ref('local')

  const serviceTier = computed(() =>
    config.value?.serviceTiers.find((tier) => tier.id === serviceTierId.value),
  )
  const distanceTier = computed(() =>
    config.value?.distanceTiers.find((tier) => tier.id === distanceTierId.value),
  )

  const estimate = computed<RateEstimate | null>(() => {
    const cfg = config.value
    const service = serviceTier.value
    const distance = distanceTier.value
    if (!cfg || !service || !distance) return null

    const base = trays.value * cfg.trayRate + bins.value * cfg.binRate
    const total = Math.max(base * service.multiplier * distance.multiplier, cfg.minimumCharge)

    return {
      base: Math.round(base * 100) / 100,
      total: Math.round(total * 100) / 100,
    }
  })

  return { trays, bins, serviceTierId, distanceTierId, serviceTier, distanceTier, estimate }
}
