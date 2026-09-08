import type { Stat } from '@/models/content'
import statsData from '@/data/stats.json'
import { mockDelay } from '@/utils/delay'

export function getStats(): Promise<Stat[]> {
  return mockDelay(statsData as Stat[])
}
