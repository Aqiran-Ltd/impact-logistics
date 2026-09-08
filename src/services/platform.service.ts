import type { PlatformSection } from '@/models/content'
import platformData from '@/data/platformFeatures.json'
import { mockDelay } from '@/utils/delay'

export function getPlatformSections(): Promise<PlatformSection[]> {
  return mockDelay(platformData as PlatformSection[])
}
