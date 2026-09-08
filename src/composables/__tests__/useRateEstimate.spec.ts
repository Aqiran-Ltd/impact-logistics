import { ref } from 'vue'
import { describe, it, expect } from 'vitest'
import { useRateEstimate } from '@/composables/useRateEstimate'
import type { RateConfig } from '@/models/content'

const testConfig: RateConfig = {
  trayRate: 10,
  binRate: 20,
  minimumCharge: 45,
  currency: 'USD',
  serviceTiers: [
    { id: 'standard', label: 'Standard', description: '', multiplier: 1 },
    { id: 'stat', label: 'STAT', description: '', multiplier: 2 },
  ],
  distanceTiers: [
    { id: 'local', label: 'Local', description: '', multiplier: 1 },
    { id: 'regional', label: 'Regional', description: '', multiplier: 1.5 },
  ],
}

describe('useRateEstimate', () => {
  it('computes base and total from trays, bins, and tier multipliers', () => {
    const config = ref<RateConfig | null>(testConfig)
    const { trays, bins, serviceTierId, distanceTierId, estimate } = useRateEstimate(config)

    trays.value = 3
    bins.value = 1
    serviceTierId.value = 'standard'
    distanceTierId.value = 'local'

    // base = 3 * 10 + 1 * 20 = 50; total = 50 * 1 * 1 = 50
    expect(estimate.value).toEqual({ base: 50, total: 50 })
  })

  it('applies service and distance multipliers', () => {
    const config = ref<RateConfig | null>(testConfig)
    const { trays, bins, serviceTierId, distanceTierId, estimate } = useRateEstimate(config)

    trays.value = 3
    bins.value = 1
    serviceTierId.value = 'stat'
    distanceTierId.value = 'regional'

    // base = 50; total = 50 * 2 * 1.5 = 150
    expect(estimate.value).toEqual({ base: 50, total: 150 })
  })

  it('floors the total at the configured minimum charge', () => {
    const config = ref<RateConfig | null>(testConfig)
    const { trays, bins, estimate } = useRateEstimate(config)

    trays.value = 0
    bins.value = 0

    expect(estimate.value?.total).toBe(testConfig.minimumCharge)
  })

  it('returns null before config has loaded', () => {
    const config = ref<RateConfig | null>(null)
    const { estimate } = useRateEstimate(config)

    expect(estimate.value).toBeNull()
  })
})
