import type { CoverageRegion } from '@/models/content'
import coverageData from '@/data/coverageRegions.json'
import { mockDelay } from '@/utils/delay'

export function getCoverageRegions(): Promise<CoverageRegion[]> {
  return mockDelay(coverageData as CoverageRegion[])
}
