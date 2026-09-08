import type { Service } from '@/models/content'
import servicesData from '@/data/services.json'
import { mockDelay } from '@/utils/delay'

export function getServices(): Promise<Service[]> {
  return mockDelay(servicesData as Service[])
}

export function getServiceById(id: string): Promise<Service | undefined> {
  return mockDelay((servicesData as Service[]).find((service) => service.id === id))
}
