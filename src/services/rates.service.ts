import type { RateConfig } from '@/models/content'
import ratesData from '@/data/rates.json'
import { mockDelay } from '@/utils/delay'

export function getRateConfig(): Promise<RateConfig> {
  return mockDelay(ratesData as RateConfig)
}
