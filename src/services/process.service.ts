import type { ProcessStep } from '@/models/content'
import processData from '@/data/process.json'
import { mockDelay } from '@/utils/delay'

export function getProcessSteps(): Promise<ProcessStep[]> {
  return mockDelay([...(processData as ProcessStep[])].sort((a, b) => a.order - b.order))
}
